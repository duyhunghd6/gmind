package rtm

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/fs"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strings"
	"text/tabwriter"
)

// SyncManager bidirectional sync
type SyncManager struct {
	RootDir string
}

func FindRootDir() (string, error) {
	curr, err := os.Getwd()
	if err != nil {
		return "", err
	}

	for {
		path := filepath.Join(curr, ".beads")
		if _, err := os.Stat(path); err == nil {
			return curr, nil
		}

		parent := filepath.Dir(curr)
		if parent == curr {
			break
		}
		curr = parent
	}
	return os.Getwd() // Fallback
}

func (s *SyncManager) SyncAll() error {
	fmt.Println("Syncing all plans in docs/plans/")
	return nil
}

type bdIssue struct {
	ID     string   `json:"id"`
	Status string   `json:"status"`
	Labels []string `json:"labels"`
}

func fetchIssues() ([]bdIssue, error) {
	cmd := exec.Command("bd", "list", "--all", "--json")
	out, err := cmd.Output()
	if err != nil {
		return nil, fmt.Errorf("bd list error: %w", err)
	}
	var issues []bdIssue
	if err := json.Unmarshal(out, &issues); err != nil {
		return nil, fmt.Errorf("unmarshal error: %w", err)
	}
	return issues, nil
}

func extractTargetIDs(dir string) ([]string, error) {
	var results []string
	idMap := make(map[string]bool)
	rx := regexp.MustCompile(`(?i)beads-id:\s*(br-[\w-]+|bd-[\w-]+)`)

	err := filepath.WalkDir(dir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return nil
		}
		if d.IsDir() || !strings.HasSuffix(d.Name(), ".md") {
			return nil
		}
		data, err := os.ReadFile(path)
		if err != nil {
			return nil
		}
		matches := rx.FindAllStringSubmatch(string(data), -1)
		for _, m := range matches {
			if len(m) > 1 {
				id := m[1]
				if !idMap[id] {
					idMap[id] = true
					results = append(results, id)
				}
			}
		}
		return nil
	})
	return results, err
}

type CoverageResult struct {
	ID             string   `json:"id"`
	Status         string   `json:"status"`
	CoveringIssues []string `json:"covering_issues"`
}

type CoverageReport struct {
	Mode           string           `json:"mode"`
	TotalElements  int              `json:"total_elements"`
	CoveredCount   int              `json:"covered_count"`
	Percentage     float64          `json:"percentage"`
	Results        []CoverageResult `json:"results"`
}

func (s *SyncManager) GetCoverageData(mode string) (*CoverageReport, error) {
	if s.RootDir == "" {
		s.RootDir, _ = FindRootDir()
	}
	var dirs []string
	switch mode {
	case "prd":
		dirs = append(dirs, "docs/PRDs")
	case "plan":
		dirs = append(dirs, "docs/plans")
	case "full":
		dirs = append(dirs, "docs/PRDs", "docs/plans")
	default:
		return nil, fmt.Errorf("unknown mode: %s", mode)
	}

	var allTargets []string
	for _, d := range dirs {
		ids, err := extractTargetIDs(filepath.Join(s.RootDir, d))
		if err == nil {
			allTargets = append(allTargets, ids...)
		}
	}

	issues, err := fetchIssues()
	if err != nil {
		return nil, fmt.Errorf("failed to fetch issues: %w", err)
	}

	report := &CoverageReport{
		Mode:    strings.ToUpper(mode),
		Results: []CoverageResult{},
	}

	coveredCount := 0

	for _, target := range allTargets {
		status := "NOT COVERED"
		var covering []string

		satisfyLabel := "satisfies:" + target

		for _, iss := range issues {
			hasLabel := false
			for _, lbl := range iss.Labels {
				if lbl == satisfyLabel {
					hasLabel = true
					break
				}
			}
			if hasLabel || iss.ID == target {
				covering = append(covering, iss.ID+"("+iss.Status+")")
				if status == "NOT COVERED" {
					status = iss.Status
				} else if iss.Status == "in_progress" {
					status = "in_progress"
				}
			}
		}

		if len(covering) > 0 {
			coveredCount++
		}

		report.Results = append(report.Results, CoverageResult{
			ID:             target,
			Status:         status,
			CoveringIssues: covering,
		})
	}

	report.TotalElements = len(allTargets)
	report.CoveredCount = coveredCount
	if len(allTargets) > 0 {
		report.Percentage = float64(coveredCount) / float64(len(allTargets)) * 100.0
	}

	return report, nil
}

func (s *SyncManager) CalculateCoverage(mode string) (string, error) {
	if s.RootDir == "" {
		s.RootDir, _ = FindRootDir()
	}
	var dirs []string
	switch mode {
	case "prd":
		dirs = append(dirs, "docs/PRDs")
	case "plan":
		dirs = append(dirs, "docs/plans")
	case "full":
		dirs = append(dirs, "docs/PRDs", "docs/plans")
	default:
		return "", fmt.Errorf("unknown mode: %s", mode)
	}

	var allTargets []string
	for _, d := range dirs {
		ids, err := extractTargetIDs(filepath.Join(s.RootDir, d))
		if err == nil {
			allTargets = append(allTargets, ids...)
		}
	}

	issues, err := fetchIssues()
	if err != nil {
		return "", fmt.Errorf("failed to fetch issues: %w", err)
	}

	var buf bytes.Buffer
	buf.WriteString(fmt.Sprintf("Coverage Report: %s\n", strings.ToUpper(mode)))
	buf.WriteString("=====================================\n")

	w := tabwriter.NewWriter(&buf, 0, 0, 3, ' ', 0)
	fmt.Fprintln(w, "ID/Section\tStatus\tCovering Issues")
	fmt.Fprintln(w, "----------\t------\t---------------")

	coveredCount := 0

	for _, target := range allTargets {
		status := "NOT COVERED"
		var covering []string

		satisfyLabel := "satisfies:" + target

		for _, iss := range issues {
			hasLabel := false
			for _, lbl := range iss.Labels {
				if lbl == satisfyLabel {
					hasLabel = true
					break
				}
			}
			if hasLabel || iss.ID == target {
				covering = append(covering, iss.ID+"("+iss.Status+")")
				if status == "NOT COVERED" {
					status = iss.Status
				} else if iss.Status == "in_progress" {
					status = "in_progress"
				}
			}
		}

		if len(covering) > 0 {
			coveredCount++
		}

		fmt.Fprintf(w, "%s\t%s\t%s\n", target, status, strings.Join(covering, ", "))
	}
	w.Flush()

	percentage := 0.0
	if len(allTargets) > 0 {
		percentage = float64(coveredCount) / float64(len(allTargets)) * 100.0
	}
	buf.WriteString("\nSummary:\n")
	buf.WriteString(fmt.Sprintf("Total Elements: %d\n", len(allTargets)))
	buf.WriteString(fmt.Sprintf("Covered:      %d\n", coveredCount))
	buf.WriteString(fmt.Sprintf("Coverage %%:   %.2f%%\n", percentage))

	return buf.String(), nil
}

func (s *SyncManager) AnalyzeImpact(prdSectionID string) (string, error) {
	return fmt.Sprintf("Impact analysis for %s...", prdSectionID), nil
}
