package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var githubCmd = &cobra.Command{
	Use:   "github",
	Short: "Wrapper for local git and gh commands",
	Long:  "Executes git and gh shell commands natively without CGO.",
}

var githubInfoCmd = &cobra.Command{
	Use:   "info [beads-id]",
	Short: "Synthesize commits, PRs, and CI status",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Fetching GitHub Info for %s\n", args[0])
	},
}

var githubCommitsCmd = &cobra.Command{
	Use:   "commits [beads-id]",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Fetching local Git Commits for %s\n", args[0])
	},
}

var githubPRsCmd = &cobra.Command{
	Use:   "prs [beads-id]",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Fetching GitHub PRs for %s\n", args[0])
	},
}

var githubCICmd = &cobra.Command{
	Use:   "ci [beads-id]",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Printf("Fetching GitHub CI runs for %s\n", args[0])
	},
}

func init() {
	githubCmd.AddCommand(githubInfoCmd, githubCommitsCmd, githubPRsCmd, githubCICmd)
	rootCmd.AddCommand(githubCmd)
}
