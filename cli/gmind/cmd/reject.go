package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var rejectCmd = &cobra.Command{
	Use:   "reject [id]",
	Short: "Reject an Agent's proposal and require a new approach",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]
		reason, _ := cmd.Flags().GetString("reason")
		fmt.Printf("Rejected %s. Reason: %s\n", id, reason)
	},
}

func init() {
	rejectCmd.Flags().String("reason", "", "Reason for rejection")
	rejectCmd.MarkFlagRequired("reason")
	rootCmd.AddCommand(rejectCmd)
}
