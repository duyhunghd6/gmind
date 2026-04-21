package cmd

import (
	"fmt"
	"os"
	"os/exec"
	"strings"

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
		beadsID := args[0]
		fmt.Printf("--- Info for %s ---\n\n", beadsID)

		fmt.Println(">> Commits (git log):")
		githubCommitsCmd.Run(cmd, args)

		fmt.Println("\n>> PRs (gh pr list):")
		githubPRsCmd.Run(cmd, args)

		fmt.Println("\n>> CI Runs (gh run list):")
		githubCICmd.Run(cmd, args)
	},
}

var githubCommitsCmd = &cobra.Command{
	Use:  "commits [beads-id]",
	Args: cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		beadsID := args[0]
		c := exec.Command("git", "log", "--all", fmt.Sprintf("--grep=Beads-ID: %s", beadsID))
		c.Stdout = os.Stdout
		c.Stderr = os.Stderr
		_ = c.Run()
	},
}

var githubPRsCmd = &cobra.Command{
	Use:  "prs [beads-id]",
	Args: cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		beadsID := args[0]
		c := exec.Command("gh", "pr", "list", "--search", beadsID, "--state", "all")
		c.Stdout = os.Stdout
		c.Stderr = os.Stderr
		_ = c.Run()
	},
}

var githubCICmd = &cobra.Command{
	Use:  "ci [beads-id]",
	Args: cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		beadsID := args[0]
		c := exec.Command("gh", "run", "list")
		out, err := c.Output()
		if err != nil {
			fmt.Printf("Error fetching CI runs: %v\n", err)
			return
		}

		lines := strings.Split(string(out), "\n")
		for i, line := range lines {
			if i == 0 || strings.Contains(line, beadsID) {
				fmt.Println(line)
			}
		}
	},
}

func init() {
	githubCmd.AddCommand(githubInfoCmd, githubCommitsCmd, githubPRsCmd, githubCICmd)
	rootCmd.AddCommand(githubCmd)
}
