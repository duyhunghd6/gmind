package cmd

import (
	"fmt"
	"os"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/external"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/graph"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"github.com/spf13/cobra"
)

var traceCmd = &cobra.Command{
	Use:   "trace [beads-id]",
	Short: "Trace the 3-tier linkage: PRD Section <-> Plan Element <-> Task <-> Commit",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]
		reverse, _ := cmd.Flags().GetBool("reverse")
		useGithub, _ := cmd.Flags().GetBool("include-github")
		// jsonOutput, _ := cmd.Flags().GetBool("json")

		// Initialize dependencies
		sqlite, err := storage.NewSQLiteDB("", true)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing SQLite: %v\n", err)
			os.Exit(1)
		}
		defer sqlite.Close()

		github, _ := external.NewGitHub()

		// Create assembler
		assembler := graph.NewAssembler(sqlite, nil, nil, github)

		// Trace
		result, err := assembler.Trace(id, reverse, useGithub)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error tracing: %v\n", err)
			os.Exit(1)
		}

		jsonOutput, _ := cmd.Flags().GetBool("json")
		if jsonOutput {
			// Basic JSON output of the result string for now
			// In a real implementation, we might want to return the actual Node structure
			fmt.Printf("{\"beads_id\": \"%s\", \"trace\": %q}\n", id, result)
		} else {
			fmt.Println(result)
		}
	},
}

func init() {
	traceCmd.Flags().Bool("reverse", false, "Trace upward from Task to Plan and PRD")
	traceCmd.Flags().Bool("include-github", false, "Query PRs/CI via gh cli")
	traceCmd.Flags().Bool("no-cache", false, "Skip LRU memory cache")
	traceCmd.Flags().Bool("json", false, "Output JSON result")

	rootCmd.AddCommand(traceCmd)
}
