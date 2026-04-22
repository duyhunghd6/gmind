package graph

import (
	"fmt"
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

func NewAssembler(sql *storage.SQLiteDB, zv *storage.ZvecDB, fc *external.FastCode, gh *external.GitHub) *Assembler {
	return &Assembler{
		Sqlite:   sql,
		Zvec:     zv,
		FastCode: fc,
		GitHub:   gh,
		Parser:   NewParser("docs"),
	}
}

func (a *Assembler) GetContextData(beadsID string, depth int) (*ContextData, error) {
	data := &ContextData{BeadsID: beadsID, Depth: depth}

	if a.Sqlite != nil {
		issue, err := a.Sqlite.GetIssueDetails(beadsID)
		if err == nil && issue != nil {
			data.Issue = issue
		}
	}

	if a.Zvec != nil {
		results, err := a.Zvec.SearchByBeadsID(beadsID)
		if err == nil {
			data.RelatedKnowledge = make([]ContextKnowledge, 0, len(results))
			for _, res := range results {
				data.RelatedKnowledge = append(data.RelatedKnowledge, ContextKnowledge{
					SourceType: res.SourceType,
					SourceRef:  res.SourceRef,
					Content:    res.Content,
				})
			}
		}
	}

	if a.FastCode != nil && shouldIncludeCodeContext(depth) {
		codeCtx, err := a.FastCode.Query(beadsID, ".", true)
		if err == nil {
			data.CodeContext = strings.TrimSpace(codeCtx)
		}
	}

	return data, nil
}

// GetContext aggregates full context for a Beads ID.
func (a *Assembler) GetContext(beadsID string, depth int) (string, error) {
	data, err := a.GetContextData(beadsID, depth)
	if err != nil {
		return "", err
	}
	return renderContextText(data), nil
}

func shouldIncludeCodeContext(depth int) bool {
	return depth == 0 || depth >= 1
}

func renderContextText(data *ContextData) string {
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
	if issue.RTEStatus == "approved" {
		sectionTitle = "## RTE Approval"
	}

	lines = append(lines, "", sectionTitle, fmt.Sprintf("- Status: %s", issue.RTEStatus))
	if issue.RTERisk != "" {
		lines = append(lines, fmt.Sprintf("- Risk: %s", issue.RTERisk))
	}
	if issue.RTEResolution != "" {
		lines = append(lines, fmt.Sprintf("- Resolution: %s", issue.RTEResolution))
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
