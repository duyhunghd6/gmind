package cmd

import (
	"fmt"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/rtm"
	"github.com/spf13/cobra"
	"os"
)

var coverageCmd = &cobra.Command{
	Use:       "coverage [prd|plan|full]",
	Short:     "Generate Requirements Traceability Matrix coverage report",
	ValidArgs: []string{"prd", "plan", "full"},
	Args:      cobra.MatchAll(cobra.ExactArgs(1), cobra.OnlyValidArgs),
	Run: func(cmd *cobra.Command, args []string) {
		mode := args[0]
		sm := &rtm.SyncManager{}
		out, err := sm.CalculateCoverage(mode)
		if err != nil {
			fmt.Println("Error:", err)
			os.Exit(1)
		}
		fmt.Println(out)
	},
}

func init() {
	rootCmd.AddCommand(coverageCmd)
}
