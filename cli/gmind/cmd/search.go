package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var searchCmd = &cobra.Command{
	Use:   "search [query]",
	Short: "Route query into Zvec to fetch Docs and Chat History",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		query := args[0]
		fmt.Printf("Searching semantic data for: %s\n", query)
		// TODO: Delegate to Zvec db/indexer
	},
}

func init() {
	rootCmd.AddCommand(searchCmd)
}
