package cmd

import (
	"fmt"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/fastcode"
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
		debug, _ := cmd.Flags().GetBool("debug")

		err := fastcode.RunFastCodeSearch(query, forceReindex, jsonOutput, debug)
		if err != nil {
			fmt.Fprintf(cmd.ErrOrStderr(), "Error: %v\n", err)
		}
	},
}

func init() {
	searchCodebaseCmd.Flags().Bool("force-reindex", false, "Force rebuild FastCode index")
	searchCodebaseCmd.Flags().Bool("json", false, "Output results in JSON format")
	searchCodebaseCmd.Flags().Bool("debug", false, "Enable debug logs")

	rootCmd.AddCommand(searchCodebaseCmd)
}
