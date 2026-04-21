package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var planCmd = &cobra.Command{
	Use:   "plan",
	Short: "Manage Plan documents and bidirectional syncing",
}

var planSyncCmd = &cobra.Command{
	Use:   "sync [file]",
	Short: "Bidirectional sync between Plan.md and Beads Issues",
	Run: func(cmd *cobra.Command, args []string) {
		syncAll, _ := cmd.Flags().GetBool("all")
		if syncAll {
			fmt.Println("Syncing all plans in docs/plans/")
		} else if len(args) > 0 {
			fmt.Printf("Syncing plan file: %s\n", args[0])
		} else {
			fmt.Println("Please provide a file or use --all")
		}
	},
}

var planStatusCmd = &cobra.Command{
	Use:   "status [plan-id]",
	Short: "Show progress summary for a plan",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Fetching status for plan: %s\n", args[0])
	},
}

var planCreateCmd = &cobra.Command{
	Use:   "create",
	Short: "Bootstrap plan document from a PRD section",
	Run: func(cmd *cobra.Command, args []string) {
		fromPRD, _ := cmd.Flags().GetString("from-prd")
		fmt.Printf("Creating plan from PRD section: %s\n", fromPRD)
	},
}

func init() {
	planSyncCmd.Flags().Bool("all", false, "Sync all docs/plans/*.md files")
	planCreateCmd.Flags().String("from-prd", "", "PRD Section ID to bootstrap from")
	
	planCmd.AddCommand(planSyncCmd, planStatusCmd, planCreateCmd)
	rootCmd.AddCommand(planCmd)
}
