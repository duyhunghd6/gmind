package graph

import (
	"fmt"
	"sort"
	"strings"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/external"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
)

const emptyDescriptionPlaceholder = "(empty)"

// Assembler dynamically builds the graph matrix.
type Assembler struct {
	Sqlite   *storage.SQLiteDB
	Zvec     *storage.ZvecDB
	FastCode *external.FastCode
	GitHub   *external.GitHub
	Parser   *Parser
}

type ContextData struct {
	BeadsID          string             `json:"beads_id"`
	Depth            int                `json:"depth"`
	Issue            *storage.Issue     `json:"issue,omitempty"`
	RelatedKnowledge []ContextKnowledge `json:"related_knowledge,omitempty"`
	CodeContext      string             `json:"code_context,omitempty"`
}

type ContextKnowledge struct {
	SourceType string `json:"source_type"`
	SourceRef  string `json:"source_ref"`
	Content    string `json:"content"`
}

type contextIssueLoader interface {
	GetIssueDetails(beadsID string) (*storage.Issue, error)
}

type contextKnowledgeLoader interface {
	SearchByBeadsID(id string) ([]storage.ZvecSearchResult, error)
}

type contextCodeLoader interface {
	Query(query string, repoPath string, jsonOutput bool) (string, error)
}

func NewAssembler(sql *storage.SQLiteDB, zv *storage.ZvecDB, fc *external.FastCode, gh *external.GitHub) *Assembler {
	return &Assembler{
		Sqlite:   sql,
		Zvec:     zv,
		FastCode: fc,
		GitHub:   gh,
		Parser:   NewParser("docs"),
	}
}

func (a *Assembler) GetContextData(beadsID string, depth int, progress func(string)) (*ContextData, error) {
	return buildContextData(a.Sqlite, a.Zvec, a.FastCode, beadsID, depth, true, progress)
}

func buildContextData(issueLoader contextIssueLoader, knowledgeLoader contextKnowledgeLoader, codeLoader contextCodeLoader, beadsID string, depth int, fastCodeJSON bool, progress func(string)) (*ContextData, error) {
	data := &ContextData{BeadsID: beadsID, Depth: depth}

	if issueLoader != nil {
		if progress != nil {
			progress("Fetching issue details from storage...")
		}
		issue, err := issueLoader.GetIssueDetails(beadsID)
		if err == nil && issue != nil {
			data.Issue = issue
		}
		// We deliberately ignore the error if issue is not found,
		// as BeadsID might be a PRD section or non-issue entity.
	}

	if knowledgeLoader != nil {
		if progress != nil {
			progress("Searching related knowledge in Zvec...")
		}
		results, err := knowledgeLoader.SearchByBeadsID(beadsID)
		if err != nil {
			return nil, fmt.Errorf("zvec unavailable: %w", err)
		}
		data.RelatedKnowledge = make([]ContextKnowledge, 0, len(results))
		for _, res := range results {
			data.RelatedKnowledge = append(data.RelatedKnowledge, ContextKnowledge{
				SourceType: res.SourceType,
				SourceRef:  res.SourceRef,
				Content:    res.Content,
			})
		}
		sort.Slice(data.RelatedKnowledge, func(i, j int) bool {
			if data.RelatedKnowledge[i].SourceType != data.RelatedKnowledge[j].SourceType {
				return data.RelatedKnowledge[i].SourceType < data.RelatedKnowledge[j].SourceType
			}
			if data.RelatedKnowledge[i].SourceRef != data.RelatedKnowledge[j].SourceRef {
				return data.RelatedKnowledge[i].SourceRef < data.RelatedKnowledge[j].SourceRef
			}
			return data.RelatedKnowledge[i].Content < data.RelatedKnowledge[j].Content
		})
	}

	if codeLoader != nil && shouldIncludeCodeContext(depth) {
		if progress != nil {
			progress("Analyzing code context with FastCode...")
		}
		codeCtx, err := codeLoader.Query(beadsID, ".", fastCodeJSON)
		if err != nil {
			return nil, fmt.Errorf("fastcode unavailable: %w", err)
		}
		data.CodeContext = sanitizeCodeContext(strings.TrimSpace(codeCtx), fastCodeJSON)
	}

	return data, nil
}

// GetContext aggregates full context for a Beads ID.
func (a *Assembler) GetContext(beadsID string, depth int, progress func(string)) (string, error) {
	data, err := buildContextData(a.Sqlite, a.Zvec, a.FastCode, beadsID, depth, false, progress)
	if err != nil {
		return "", err
	}
	return RenderContextText(data), nil
}

func shouldIncludeCodeContext(depth int) bool {
	return depth == 0 || depth >= 1
}

func sanitizeCodeContext(codeCtx string, expectJSON bool) string {
	if !expectJSON {
		return codeCtx
	}

	start := strings.Index(codeCtx, "{")
	if start == -1 {
		return codeCtx
	}
	return strings.TrimSpace(codeCtx[start:])
}

func RenderContextText(data *ContextData) string {
	if data == nil {
		return ""
	}

	var sections []string

	if data.Issue != nil {
		sections = append(sections, renderIssueSection(data.Issue))
	}
	if len(data.RelatedKnowledge) > 0 {
		sections = append(sections, renderKnowledgeSection(data.RelatedKnowledge))
	}
	if data.CodeContext != "" {
		sections = append(sections, fmt.Sprintf("## Code Context (FastCode)\n%s", data.CodeContext))
	}

	return strings.Join(sections, "\n\n")
}

func renderIssueSection(issue *storage.Issue) string {
	description := strings.TrimSpace(issue.Description)
	if description == "" {
		description = emptyDescriptionPlaceholder
	}

	lines := []string{
		"## Issue",
		fmt.Sprintf("- ID: %s", issue.ID),
		fmt.Sprintf("- Title: %s", issue.Title),
		fmt.Sprintf("- Status: %s", issue.Status),
		fmt.Sprintf("- Priority: %d", issue.Priority),
	}

	if issue.Type != "" {
		lines = append(lines, fmt.Sprintf("- Type: %s", issue.Type))
	}
	if issue.Assignee != "" {
		lines = append(lines, fmt.Sprintf("- Assignee: %s", issue.Assignee))
	}
	lines = append(lines, fmt.Sprintf("- Description: %s", description))

	if issue.RTEStatus == "" {
		return strings.Join(lines, "\n")
	}

	sectionTitle := "## RTE Metadata"
	detailLabel := "Resolution"
	if issue.RTEStatus == "approved" {
		sectionTitle = "## RTE Approval"
	}
	if issue.RTEStatus == "rejected" {
		sectionTitle = "## RTE Rejection"
		detailLabel = "Reason"
	}

	lines = append(lines, "", sectionTitle, fmt.Sprintf("- Status: %s", issue.RTEStatus))
	if issue.RTEStatus == "rejected" {
		lines = append(lines, "- Guidance: A new approach is required before execution resumes")
	}
	if issue.RTERisk != "" {
		lines = append(lines, fmt.Sprintf("- Risk: %s", issue.RTERisk))
	}
	if issue.RTEResolution != "" {
		lines = append(lines, fmt.Sprintf("- %s: %s", detailLabel, issue.RTEResolution))
	}
	if issue.RTEApprovedBy != "" {
		lines = append(lines, fmt.Sprintf("- Approved by: %s", issue.RTEApprovedBy))
	}
	if issue.RTEApprovedAt != "" {
		lines = append(lines, fmt.Sprintf("- Approved at: %s", issue.RTEApprovedAt))
	}

	return strings.Join(lines, "\n")
}

func renderKnowledgeSection(items []ContextKnowledge) string {
	lines := []string{"## Related Knowledge (Zvec)"}
	for _, item := range items {
		lines = append(lines, fmt.Sprintf("- [%s] %s: %s", item.SourceType, item.SourceRef, item.Content))
	}
	return strings.Join(lines, "\n")
}
