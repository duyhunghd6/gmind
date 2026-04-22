package cmd

import (
	"fmt"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"os"
	"os/exec"
	"time"

	"github.com/spf13/cobra"
)

var approveCmd = &cobra.Command{
	Use:   "approve [beads-id]",
	Short: "Record RTE approval with resolution context",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]
		resolution, _ := cmd.Flags().GetString("resolution")

		// 1. Initialize FrankenSQLite in RW mode
		sqlite, err := storage.NewSQLiteDB("", false)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing FrankenSQLite: %v\n", err)
			os.Exit(1)
		}
		defer sqlite.Close()

		// 2. Verify issue exists
		issue, err := sqlite.GetIssueDetails(id)
		if err != nil || issue == nil {
			fmt.Fprintf(os.Stderr, "Issue %s not found: %v\n", id, err)
			os.Exit(1)
		}

		// 3. Update via 'br' CLI (status and labels)
		fmt.Printf("Updating issue %s status to in_progress and updating labels...\n", id)
		out, err := exec.Command("br", "update", id, "--status", "in_progress", "--remove-label", "rte:escalated", "--remove-label", "rte:rejected", "--add-label", "rte:approved", "--json").CombinedOutput()
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error updating via 'br' CLI: %v\nOutput: %s\n", err, string(out))
			os.Exit(1)
		}

		// 4. Update FrankenSQLite RTE metadata
		fmt.Printf("Recording approval metadata for %s...\n", id)
		now := time.Now().Format(time.RFC3339)
		actor := os.Getenv("USER") // Simple actor detection
		if actor == "" {
			actor = "RTE"
		}
		err = sqlite.UpdateIssueRTE(id, "approved", issue.RTERisk, resolution, actor, now)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error updating RTE metadata: %v\n", err)
			os.Exit(1)
		}

		fmt.Printf("Approved %s. Resolution recorded as Execution Context.\n", id)
	},
}

func init() {
	approveCmd.Flags().String("resolution", "", "Resolution text / execution context")
	approveCmd.MarkFlagRequired("resolution")
	rootCmd.AddCommand(approveCmd)
}
