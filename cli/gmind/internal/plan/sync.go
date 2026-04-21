package plan

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"

	"gopkg.in/yaml.v3"
)

type PlanFrontMatter struct {
	BeadsID   string   `yaml:"beads-id"`
	Title     string   `yaml:"title"`
	Satisfies []string `yaml:"satisfies"`
	Status    string   `yaml:"status"`
}

type PlanSyncResult struct {
	Created []string
	Updated []string
}

type Issue struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Status      string   `json:"status"`
	Labels      []string `json:"labels"`
	ExternalRef string   `json:"external_ref"`
}

// SyncPlan bidirectional sync between Markdown and Beads
func SyncPlan(filePath string) (*PlanSyncResult, error) {
	content, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	result := &PlanSyncResult{}

	// 1. Parse Front Matter
	reYAML := regexp.MustCompile(`(?s)^---\n(.*?)\n---`)
	match := reYAML.FindStringSubmatch(string(content))
	if len(match) < 2 {
		return nil, fmt.Errorf("no YAML front matter found in %s", filePath)
	}

	var fm PlanFrontMatter
	if err := yaml.Unmarshal([]byte(match[1]), &fm); err != nil {
		return nil, fmt.Errorf("failed to parse YAML in %s: %w", filePath, err)
	}

	if fm.BeadsID == "" {
		return nil, fmt.Errorf("beads-id missing in front matter of %s", filePath)
	}

	// 2. Ensure Plan Issue exists in Beads
	planIssue := findIssueByExternalRef(fm.BeadsID)
	if planIssue == nil {
		id, err := createBeadsIssue(fm.Title, fm.BeadsID, "plan", "", fm.Satisfies)
		if err != nil {
			return nil, fmt.Errorf("failed to create beads issue for plan %s: %w", fm.BeadsID, err)
		}
		result.Created = append(result.Created, id)
		planIssue = findIssueByExternalRef(fm.BeadsID)
	}

	// 3. Sync Plan Status from Beads to Markdown
	if planIssue != nil && planIssue.Status != fm.Status {
		newFM := fm
		newFM.Status = planIssue.Status
		newYAML, _ := yaml.Marshal(newFM)
		content = []byte(reYAML.ReplaceAllString(string(content), "---\n"+string(newYAML)+"---"))
		result.Updated = append(result.Updated, fm.BeadsID)
	}

	// 4. Parse Elements (Sections)
	reElement := regexp.MustCompile(`(?m)^##\s+(.*)\n\n<!--\s*beads-id:\s*([\w-]+)(?:\s*\|\s*satisfies:\s*([\w-,\s]+))?\s*-->`)
	matches := reElement.FindAllStringSubmatch(string(content), -1)

	for _, m := range matches {
		title := strings.TrimSpace(m[1])
		hardcodedID := m[2]
		var satisfies []string
		if m[3] != "" {
			for _, s := range strings.Split(m[3], ",") {
				satisfies = append(satisfies, strings.TrimSpace(s))
			}
		}

		elementIssue := findIssueByExternalRef(hardcodedID)
		if elementIssue == nil {
			id, err := createBeadsIssue(title, hardcodedID, "task", fm.BeadsID, satisfies)
			if err != nil {
				return nil, fmt.Errorf("failed to create beads issue for element %s: %w", hardcodedID, err)
			}
			result.Created = append(result.Created, id)
		} else {
			// Sync status back to MD if we had status labels in MD elements
			// For now, the spike doesn't show status labels in MD elements besides the Front Matter
		}
	}

	// Write back if updated
	if len(result.Updated) > 0 || len(result.Created) > 0 {
		err = os.WriteFile(filePath, content, 0644)
		if err != nil {
			return nil, err
		}
	}

	return result, nil
}

func findIssueByExternalRef(ref string) *Issue {
	// Search by external-ref
	cmd := exec.Command("bd", "list", "--all", "--json")
	var out bytes.Buffer
	cmd.Stdout = &out
	if err := cmd.Run(); err != nil {
		return nil
	}

	var issues []Issue
	if err := json.Unmarshal(out.Bytes(), &issues); err != nil {
		return nil
	}

	// Regex to match exactly beads-id: <ref> with boundary
	re := regexp.MustCompile(`beads-id:\s*` + regexp.QuoteMeta(ref) + `(\s+|\||-->|$)`)

	for _, i := range issues {
		if i.ExternalRef == ref {
			return &i
		}
		
		// Check labels (e.g., "beads-id:br-plan-01" or "implements:br-plan-01")
		for _, l := range i.Labels {
			if l == "beads-id:"+ref || l == "implements:"+ref || l == "satisfies:"+ref {
				return &i
			}
		}

		// Fallback: check if it's in the description with exact boundary
		if re.MatchString(i.Description) {
			return &i
		}
	}
	return nil
}

func createBeadsIssue(title, externalRef, issueType, parentRef string, satisfies []string) (string, error) {
	args := []string{"create", title, "--type", issueType, "--external-ref", externalRef, "--silent"}

	// Add labels for satisfies
	var labels []string
	for _, s := range satisfies {
		labels = append(labels, "satisfies:"+s)
	}
	if len(labels) > 0 {
		args = append(args, "--labels", strings.Join(labels, ","))
	}

	// Add parent if exists
	if parentRef != "" {
		parentIssue := findIssueByExternalRef(parentRef)
		if parentIssue != nil {
			args = append(args, "--parent", parentIssue.ID)
		}
	}

	cmd := exec.Command("bd", args...)
	var out bytes.Buffer
	cmd.Stdout = &out
	if err := cmd.Run(); err != nil {
		return "", err
	}

	return strings.TrimSpace(out.String()), nil
}

// GetPlanStatus shows progress summary for a plan
func GetPlanStatus(planID string) (string, error) {
	planIssue := findIssueByExternalRef(planID)
	if planIssue == nil {
		return "", fmt.Errorf("plan %s not found in Beads", planID)
	}

	// Find children
	cmd := exec.Command("bd", "list", "--all", "--json")
	var out bytes.Buffer
	cmd.Stdout = &out
	if err := cmd.Run(); err != nil {
		return "", err
	}

	var issues []Issue
	if err := json.Unmarshal(out.Bytes(), &issues); err != nil {
		return "", err
	}

	var total, closed int
	var details strings.Builder
	details.WriteString(fmt.Sprintf("Plan: %s (%s)\n", planIssue.Title, planIssue.Status))
	details.WriteString("------------------------------------------\n")

	for _, i := range issues {
		// This is a bit weak since parent info is not in the list usually,
		// but we can check description or external-ref prefix
		if strings.HasPrefix(i.ExternalRef, planID+"-") {
			total++
			statusChar := " "
			if i.Status == "closed" {
				closed++
				statusChar = "x"
			}
			details.WriteString(fmt.Sprintf("[%s] %s: %s (%s)\n", statusChar, i.ID, i.Title, i.Status))
		}
	}

	if total > 0 {
		percent := (closed * 100) / total
		details.WriteString(fmt.Sprintf("\nProgress: %d%% (%d/%d elements closed)\n", percent, closed, total))
	} else {
		details.WriteString("\nNo elements found for this plan.\n")
	}

	return details.String(), nil
}

// BootstrapPlan creates a new plan file from a PRD section
func BootstrapPlan(prdSectionID string, targetFile string) (string, error) {
	// 1. Scan PRDs to find the section
	docsDir := "docs/PRDs"
	var sectionTitle string
	err := filepath.Walk(docsDir, func(path string, info os.FileInfo, err error) error {
		if err != nil || info.IsDir() || !strings.HasSuffix(path, ".md") {
			return nil
		}
		content, _ := os.ReadFile(path)
		// Look for ## Title followed by <!-- beads-id: prdSectionID -->
		re := regexp.MustCompile(`(?m)^##\s+(.*)\n\n<!--\s*beads-id:\s*` + regexp.QuoteMeta(prdSectionID) + `\s*-->`)
		match := re.FindStringSubmatch(string(content))
		if len(match) > 1 {
			sectionTitle = strings.TrimSpace(match[1])
			return filepath.SkipDir // Found it
		}
		return nil
	})

	if sectionTitle == "" {
		return "", fmt.Errorf("PRD section %s not found", prdSectionID)
	}

	// 2. Generate Plan ID
	planID := strings.Replace(prdSectionID, "br-prd", "br-plan", 1)

	// 3. Create content
	var buf bytes.Buffer
	buf.WriteString("---\n")
	buf.WriteString(fmt.Sprintf("beads-id: %s\n", planID))
	buf.WriteString(fmt.Sprintf("title: \"Plan: %s\"\n", sectionTitle))
	buf.WriteString("satisfies:\n")
	buf.WriteString(fmt.Sprintf("  - %s\n", prdSectionID))
	buf.WriteString("status: not-started\n")
	buf.WriteString("---\n\n")
	buf.WriteString(fmt.Sprintf("# Plan: %s\n\n", sectionTitle))
	buf.WriteString(fmt.Sprintf("<!-- beads-id: %s -->\n\n", planID))
	buf.WriteString("## 1. Initial Research\n\n")
	buf.WriteString(fmt.Sprintf("<!-- beads-id: %s-e1 | satisfies: %s -->\n\n", planID, prdSectionID))
	buf.WriteString("Description of the first step...\n")

	if targetFile == "" {
		targetFile = fmt.Sprintf("docs/plans/plan-%s.md", strings.ToLower(strings.ReplaceAll(sectionTitle, " ", "-")))
	}

	err = os.WriteFile(targetFile, buf.Bytes(), 0644)
	if err != nil {
		return "", err
	}

	return targetFile, nil
}
