package graph

import (
	"fmt"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/external"
)

// Assembler dynamically builds the graph matrix.
type Assembler struct {
	Sqlite   *storage.SQLiteDB
	Zvec     *storage.ZvecDB
	FastCode *external.FastCode
	GitHub   *external.GitHub
}

func NewAssembler(sql *storage.SQLiteDB, zv *storage.ZvecDB, fc *external.FastCode, gh *external.GitHub) *Assembler {
	return &Assembler{
		Sqlite:   sql,
		Zvec:     zv,
		FastCode: fc,
		GitHub:   gh,
	}
}

// GetContext aggregates full context for a Beads ID.
func (a *Assembler) GetContext(beadsID string, depth int) (string, error) {
	var out string

	// 1. Description from SQLite
	if a.Sqlite != nil {
		issue, err := a.Sqlite.GetIssueDetails(beadsID)
		if err == nil && issue != nil {
			out += fmt.Sprintf("## Issue: %s\nTitle: %s\nStatus: %s\nPriority: %d\nDescription: %s\n\n",
				issue.ID, issue.Title, issue.Status, issue.Priority, issue.Description)
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

// Trace 3-tier linkage
func (a *Assembler) Trace(beadsID string, reverse bool, includeGitHub bool) (string, error) {
	// 5-source dynamic graph assembly stub
	return fmt.Sprintf("Graph trace generated for: %s", beadsID), nil
}
