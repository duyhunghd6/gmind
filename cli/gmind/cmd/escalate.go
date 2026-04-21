package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var escalateCmd = &cobra.Command{
	Use:   "escalate [id]",
	Short: "Trigger RTE discussion when an Agent detects a risk",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]
		risk, _ := cmd.Flags().GetString("risk")
		fmt.Printf("Escalating %s. Risk: %s\n", id, risk)
	},
}

func init() {
	escalateCmd.Flags().String("risk", "", "Description of the risk")
	escalateCmd.MarkFlagRequired("risk")
	rootCmd.AddCommand(escalateCmd)
}
