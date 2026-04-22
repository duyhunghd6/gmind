package cmd

import (
	"fmt"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"os"
	"os/exec"

	"github.com/spf13/cobra"
)

var (
	newEscalateDB = func() (*storage.SQLiteDB, error) {
		return storage.NewSQLiteDB("", false)
	}
	runEscalateCommand = func(name string, args ...string) ([]byte, error) {
		return exec.Command(name, args...).CombinedOutput()
	}
)

var escalateCmd = &cobra.Command{
	Use:   "escalate [beads-id]",
	Short: "Trigger RTE discussion when an Agent detects a risk",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]
		risk, _ := cmd.Flags().GetString("risk")

		// 1. Initialize FrankenSQLite in RW mode
		sqlite, err := newEscalateDB()
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing FrankenSQLite: %v\n", err)
			os.Exit(1)
		}
		defer sqlite.Close()

		// 2. Ensure schema has RTE columns
		if err := sqlite.InitSchema(); err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing schema: %v\n", err)
			os.Exit(1)
		}

		// 3. Verify issue exists
		issue, err := sqlite.GetIssueDetails(id)
		if err != nil || issue == nil {
			fmt.Fprintf(os.Stderr, "Issue %s not found: %v\n", id, err)
			os.Exit(1)
		}

		transition := newEscalationTransition(risk)

		// 4. Update via 'br' CLI (status and label)
		fmt.Printf("Updating issue %s status to %s and adding %s label...\n", id, transition.issueStatus, transition.label)
		out, err := runEscalateCommand("br", transition.brUpdateArgs(id)...)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error updating via 'br' CLI: %v\nOutput: %s\n", err, string(out))
			os.Exit(1)
		}

		// 5. Update FrankenSQLite RTE metadata
		fmt.Printf("Recording escalation metadata for %s...\n", id)
		err = sqlite.UpdateIssueRTE(id, "escalated", risk, transition.resolution, transition.approvedBy, transition.approvedAt)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error updating RTE metadata: %v\n", err)
			os.Exit(1)
		}

		// 6. Gather evidence via gmind trace
		fmt.Printf("Gathering evidence for %s...\n", id)
		traceOut, errTrace := runEscalateCommand(os.Args[0], "trace", id)
		if errTrace != nil {
			fmt.Fprintf(os.Stderr, "Warning: Failed to gather trace evidence: %v\n", errTrace)
		}

		// 7. Notify via MCP Agent Mail (Simulation)
		fmt.Printf("NOTIFY: Sending escalation alert to RTE Team for %s via MCP Agent Mail...\n", id)
		fmt.Printf("RISK: %s\n", risk)
		if len(traceOut) > 0 {
			fmt.Printf("EVIDENCE:\n%s\n", string(traceOut))
		}

		fmt.Printf("Escalated %s to RTE Team. Status: awaiting review.\n", id)
	},
}

func init() {
	escalateCmd.Flags().String("risk", "", "Description of the risk")
	escalateCmd.MarkFlagRequired("risk")
	rootCmd.AddCommand(escalateCmd)
}
