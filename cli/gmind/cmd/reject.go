package cmd

import (
	"fmt"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"os"
	"os/exec"

	"github.com/spf13/cobra"
)

var rejectCmd = &cobra.Command{
	Use:   "reject [beads-id]",
	Short: "Reject an Agent's proposal and require a new approach",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]
		reason, _ := cmd.Flags().GetString("reason")

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
		fmt.Printf("Updating issue %s status to open and updating labels...\n", id)
		out, err := exec.Command("br", "update", id, "--status", "open", "--remove-label", "rte:escalated", "--remove-label", "rte:approved", "--add-label", "rte:rejected", "--json").CombinedOutput()
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error updating via 'br' CLI: %v\nOutput: %s\n", err, string(out))
			os.Exit(1)
		}

		// 4. Update FrankenSQLite RTE metadata
		fmt.Printf("Recording rejection metadata for %s...\n", id)
		err = sqlite.UpdateIssueRTE(id, "rejected", issue.RTERisk, reason, "", "")
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error updating RTE metadata: %v\n", err)
			os.Exit(1)
		}

		fmt.Printf("Rejected %s. Reason: %s\n", id, reason)
	},
}

func init() {
	rejectCmd.Flags().String("reason", "", "Reason for rejection")
	rejectCmd.MarkFlagRequired("reason")
	rootCmd.AddCommand(rejectCmd)
}
