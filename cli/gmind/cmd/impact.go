package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var impactCmd = &cobra.Command{
	Use:   "impact [prd-section-id]",
	Short: "Analyze cascading impact when a PRD section changes",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]
		fmt.Printf("Analyzing impact for PRD Section: %s\n", id)
		// TODO: Call internal/rtm/impact module
	},
}

func init() {
	rootCmd.AddCommand(impactCmd)
}
