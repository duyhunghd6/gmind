package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var coverageCmd = &cobra.Command{
	Use:   "coverage [prd|plan|full]",
	Short: "Generate Requirements Traceability Matrix coverage report",
	ValidArgs: []string{"prd", "plan", "full"},
	Args:  cobra.MatchAll(cobra.ExactArgs(1), cobra.OnlyValidArgs),
	Run: func(cmd *cobra.Command, args []string) {
		mode := args[0]
		fmt.Printf("Generating %s coverage report\n", mode)
		// TODO: Call internal/rtm/coverage
	},
}

func init() {
	rootCmd.AddCommand(coverageCmd)
}
