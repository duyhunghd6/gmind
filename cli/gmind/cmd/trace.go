package cmd

import (
	"fmt"
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
		
		fmt.Printf("Tracing connections for: %s (Reverse: %v, GitHub: %v)\n", id, reverse, useGithub)
		// TODO: Delegate to internal/graph
	},
}

func init() {
	traceCmd.Flags().Bool("reverse", false, "Trace upward from Task to Plan and PRD")
	traceCmd.Flags().Bool("include-github", false, "Query PRs/CI via gh cli")
	traceCmd.Flags().Bool("no-cache", false, "Skip LRU memory cache")
	traceCmd.Flags().Bool("json", false, "Output JSON result")

	rootCmd.AddCommand(traceCmd)
}
