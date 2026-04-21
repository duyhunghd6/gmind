package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var reindexCmd = &cobra.Command{
	Use:   "reindex",
	Short: "Orchestrator for Zvec incremental indexing",
	Run: func(cmd *cobra.Command, args []string) {
		source, _ := cmd.Flags().GetString("source")
		force, _ := cmd.Flags().GetBool("force")
		fmt.Printf("Reindexing semantic data (Source: %s, Force: %v)\n", source, force)
		// TODO: Call internal/storage/zvec reindexer
	},
}

func init() {
	reindexCmd.Flags().String("source", "", "Specific source to reindex (e.g., git-commit, markdown-doc)")
	reindexCmd.Flags().Bool("force", false, "Force full reindex ignoring watermarks")
	rootCmd.AddCommand(reindexCmd)
}
