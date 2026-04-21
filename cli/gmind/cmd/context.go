package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var contextCmd = &cobra.Command{
	Use:   "context [beads-id]",
	Short: "Load full context for a Beads ID",
	Long:  "Retrieves description from FrankenSQLite, code context via FastCode, and discussion history via Zvec.",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]
		depth, _ := cmd.Flags().GetInt("depth")

		fmt.Printf("Retrieving Context for: %s (depth: %d)\n", id, depth)
		// TODO: Call internal/graph/assembler
	},
}

func init() {
	contextCmd.Flags().Int("depth", 0, "Depth of context to fetch (0 = all)")
	rootCmd.AddCommand(contextCmd)
}
