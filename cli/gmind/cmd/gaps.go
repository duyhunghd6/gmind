package cmd

import (
	"fmt"
	"os"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/graph"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"github.com/spf13/cobra"
)

var gapsCmd = &cobra.Command{
	Use:       "gaps [prd-to-plan|plan-to-tasks]",
	Short:     "Detect coverage gaps in traceability matrix",
	ValidArgs: []string{"prd-to-plan", "plan-to-tasks"},
	Args:      cobra.MatchAll(cobra.ExactArgs(1), cobra.OnlyValidArgs),
	Run: func(cmd *cobra.Command, args []string) {
		mode := args[0]

		sqlite, err := storage.NewSQLiteDB("", true)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing SQLite: %v\n", err)
			os.Exit(1)
		}
		defer sqlite.Close()

		assembler := graph.NewAssembler(sqlite, nil, nil, nil)
		result, err := assembler.Gaps(mode)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error detecting gaps: %v\n", err)
			os.Exit(1)
		}

		fmt.Println(result)
	},
}

func init() {
	rootCmd.AddCommand(gapsCmd)
}
