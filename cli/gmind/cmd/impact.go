package cmd

import (
	"fmt"
	"os"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/graph"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"github.com/spf13/cobra"
)

var impactCmd = &cobra.Command{
	Use:   "impact [prd-section-id]",
	Short: "Analyze cascading impact when a PRD section changes",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]

		sqlite, err := storage.NewSQLiteDB(".beads/beads.db")
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing SQLite: %v\n", err)
			os.Exit(1)
		}
		defer sqlite.Close()

		assembler := graph.NewAssembler(sqlite, nil, nil, nil)
		result, err := assembler.Impact(id)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error analyzing impact: %v\n", err)
			os.Exit(1)
		}

		fmt.Println(result)
	},
}

func init() {
	rootCmd.AddCommand(impactCmd)
}
