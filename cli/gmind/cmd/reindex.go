package cmd

import (
	"fmt"
	"os"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"github.com/spf13/cobra"
)

var reindexCmd = &cobra.Command{
	Use:   "reindex",
	Short: "Orchestrator for Zvec incremental indexing",
	Run: func(cmd *cobra.Command, args []string) {
		source, _ := cmd.Flags().GetString("source")
		force, _ := cmd.Flags().GetBool("force")

		// Initialize dependencies
		sqlite, err := storage.NewSQLiteDB("", false) // Read-write for metadata
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing SQLite: %v\n", err)
			os.Exit(1)
		}
		defer sqlite.Close()

		if err := sqlite.InitSchema(); err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing schema: %v\n", err)
			os.Exit(1)
		}

		zvec, err := storage.NewZvecDB(sqlite.GmindDB)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing Zvec: %v\n", err)
			os.Exit(1)
		}

		fmt.Printf("Orchestrating Zvec indexing (Source: %s, Force: %v)\n", source, force)

		var indexErrors []error

		// Orchestration logic
		if source == "" || source == "markdown-doc" {
			if err := sqlite.IndexMarkdownDocs(zvec, force); err != nil {
				indexErrors = append(indexErrors, fmt.Errorf("markdown-doc error: %w", err))
			}
		}

		if source == "" || source == "git-commit" {
			if err := sqlite.IndexGitCommits(zvec, force); err != nil {
				indexErrors = append(indexErrors, fmt.Errorf("git-commit error: %w", err))
			}
		}

		if source == "" || source == "git-pr" {
			if err := sqlite.IndexGitHubPRs(zvec, force); err != nil {
				indexErrors = append(indexErrors, fmt.Errorf("git-pr error: %w", err))
			}
		}

		if source == "" || source == "ci-log" {
			if err := sqlite.IndexCILogs(zvec, force); err != nil {
				indexErrors = append(indexErrors, fmt.Errorf("ci-log error: %w", err))
			}
		}

		if source == "" || source == "agent-trace" {
			if err := sqlite.IndexAgentTraces(zvec, force); err != nil {
				indexErrors = append(indexErrors, fmt.Errorf("agent-trace error: %w", err))
			}
		}

		if source == "" || source == "pipeline-log" {
			if err := sqlite.IndexPipelineLogs(zvec, force); err != nil {
				indexErrors = append(indexErrors, fmt.Errorf("pipeline-log error: %w", err))
			}
		}

		if source == "" || source == "rte-approval" {
			if err := sqlite.IndexRTEApprovals(zvec, force); err != nil {
				indexErrors = append(indexErrors, fmt.Errorf("rte-approval error: %w", err))
			}
		}

		if len(indexErrors) > 0 {
			fmt.Fprintf(os.Stderr, "Some indexing tasks failed:\n")
			for _, e := range indexErrors {
				fmt.Fprintf(os.Stderr, " - %v\n", e)
			}
			os.Exit(1)
		}

		fmt.Println("Indexing completed successfully.")
	},
}

func init() {
	reindexCmd.Flags().String("source", "", "Specific source to reindex (git-commit, markdown-doc, git-pr, ci-log, agent-trace, pipeline-log, rte-approval)")
	reindexCmd.Flags().Bool("force", false, "Force full reindex ignoring watermarks")
	rootCmd.AddCommand(reindexCmd)
}
