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

// Trace 3-tier linkage
func (a *Assembler) Trace(beadsID string, reverse bool, includeGitHub bool) (string, error) {
	// 5-source dynamic graph assembly stub
	return fmt.Sprintf("Graph trace generated for: %s", beadsID), nil
}
