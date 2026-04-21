package graph

import (
	"fmt"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/external"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
)

// Assembler dynamically builds the graph matrix.
type Assembler struct {
	Sqlite   *storage.SQLiteDB
	Zvec     *storage.ZvecDB
	FastCode *external.FastCode
	GitHub   *external.GitHub
	Parser   *Parser
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

// GetContext aggregates full context for a Beads ID.
func (a *Assembler) GetContext(beadsID string, depth int) (string, error) {
	var out string

	// 1. Description from SQLite
	if a.Sqlite != nil {
		issue, err := a.Sqlite.GetIssueDetails(beadsID)
		if err == nil && issue != nil {
			out += fmt.Sprintf("## Issue: %s\nTitle: %s\nStatus: %s\nPriority: %d\nDescription: %s\n",
				issue.ID, issue.Title, issue.Status, issue.Priority, issue.Description)

			if issue.RTEStatus != "" {
				out += fmt.Sprintf("RTE Status: %s\n", issue.RTEStatus)
				if issue.RTERisk != "" {
					out += fmt.Sprintf("RTE Risk: %s\n", issue.RTERisk)
				}
				if issue.RTEResolution != "" {
					out += fmt.Sprintf("RTE Resolution: %s\n", issue.RTEResolution)
				}
				if issue.RTEApprovedBy != "" {
					out += fmt.Sprintf("RTE Approved By: %s at %s\n", issue.RTEApprovedBy, issue.RTEApprovedAt)
				}
			}
			out += "\n"
		}
	}

	// 2. Related docs/chats from Zvec
	if a.Zvec != nil {
		results, err := a.Zvec.SearchByBeadsID(beadsID)
		if err == nil && len(results) > 0 {
			out += "## Related Knowledge (Zvec)\n"
			for _, res := range results {
				out += fmt.Sprintf("- [%s] %s: %s\n", res.SourceType, res.SourceRef, res.Content)
			}
			out += "\n"
		}
	}

	// 3. Code context from FastCode
	if a.FastCode != nil && (depth == 0 || depth >= 1) {
		codeCtx, err := a.FastCode.Query(beadsID, ".", true)
		if err == nil && codeCtx != "" {
			out += "## Code Context (FastCode)\n"
			out += codeCtx
			out += "\n"
		}
	}

	return out, nil
}
