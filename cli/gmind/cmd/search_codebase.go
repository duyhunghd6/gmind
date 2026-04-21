package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var searchCodebaseCmd = &cobra.Command{
	Use:   "search-codebase [query]",
	Short: "Search codebase using fastcode",
	Long:  "Delegates to local fastcode binary for structural codebase intelligence.",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		query := args[0]
		forceReindex, _ := cmd.Flags().GetBool("force-reindex")
		jsonOutput, _ := cmd.Flags().GetBool("json")

		fmt.Printf("Searching codebase for: %s (forceReindex: %v, json: %v)\n", query, forceReindex, jsonOutput)
		// TODO: Call internal/fastcode wrapper
	},
}

func init() {
	searchCodebaseCmd.Flags().Bool("force-reindex", false, "Force rebuild FastCode index")
	searchCodebaseCmd.Flags().Bool("json", false, "Output results in JSON format")
	searchCodebaseCmd.Flags().Bool("debug", false, "Enable debug logs")

	rootCmd.AddCommand(searchCodebaseCmd)
}
