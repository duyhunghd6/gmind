package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var approveCmd = &cobra.Command{
	Use:   "approve [id]",
	Short: "Record RTE approval with resolution context",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]
		resolution, _ := cmd.Flags().GetString("resolution")
		fmt.Printf("Approved %s. Resolution: %s\n", id, resolution)
	},
}

func init() {
	approveCmd.Flags().String("resolution", "", "Resolution text / execution context")
	approveCmd.MarkFlagRequired("resolution")
	rootCmd.AddCommand(approveCmd)
}
