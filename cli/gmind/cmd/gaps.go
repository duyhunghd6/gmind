package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var gapsCmd = &cobra.Command{
	Use:   "gaps [prd-to-plan|plan-to-tasks]",
	Short: "Detect coverage gaps in traceability matrix",
	ValidArgs: []string{"prd-to-plan", "plan-to-tasks"},
	Args:  cobra.MatchAll(cobra.ExactArgs(1), cobra.OnlyValidArgs),
	Run: func(cmd *cobra.Command, args []string) {
		mode := args[0]
		fmt.Printf("Detecting gaps for %s\n", mode)
		// TODO: Call internal/rtm/gaps module
	},
}

func init() {
	rootCmd.AddCommand(gapsCmd)
}
