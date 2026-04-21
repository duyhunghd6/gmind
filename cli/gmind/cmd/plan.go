package cmd

import (
	"fmt"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/plan"
	"github.com/spf13/cobra"
	"path/filepath"
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
			files, err := filepath.Glob("docs/plans/*.md")
			if err != nil {
				fmt.Printf("Error finding plans: %v\n", err)
				return
			}
			for _, f := range files {
				fmt.Printf("Syncing %s...\n", f)
				res, err := plan.SyncPlan(f)
				if err != nil {
					fmt.Printf("  Error: %v\n", err)
					continue
				}
				fmt.Printf("  Created: %v, Updated: %v\n", len(res.Created), len(res.Updated))
			}
		} else if len(args) > 0 {
			res, err := plan.SyncPlan(args[0])
			if err != nil {
				fmt.Printf("Error: %v\n", err)
				return
			}
			fmt.Printf("Sync complete for %s. Created: %v, Updated: %v\n", args[0], len(res.Created), len(res.Updated))
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
		summary, err := plan.GetPlanStatus(args[0])
		if err != nil {
			fmt.Printf("Error: %v\n", err)
			return
		}
		fmt.Println(summary)
	},
}

var planCreateCmd = &cobra.Command{
	Use:   "create",
	Short: "Bootstrap plan document from a PRD section",
	Run: func(cmd *cobra.Command, args []string) {
		fromPRD, _ := cmd.Flags().GetString("from-prd")
		if fromPRD == "" {
			fmt.Println("Error: --from-prd flag is required")
			return
		}
		target, err := plan.BootstrapPlan(fromPRD, "")
		if err != nil {
			fmt.Printf("Error: %v\n", err)
			return
		}
		fmt.Printf("Created plan document: %s\n", target)
	},
}

func init() {
	planSyncCmd.Flags().Bool("all", false, "Sync all docs/plans/*.md files")
	planCreateCmd.Flags().String("from-prd", "", "PRD Section ID to bootstrap from")

	planCmd.AddCommand(planSyncCmd, planStatusCmd, planCreateCmd)
	rootCmd.AddCommand(planCmd)
}
