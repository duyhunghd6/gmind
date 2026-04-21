package external

import (
	"bytes"
	"fmt"
	"os/exec"
)

// GitHub wraps git and gh shell commands natively.
type GitHub struct {
	GHPath  string
	GitPath string
}

func NewGitHub() (*GitHub, error) {
	gh, err := exec.LookPath("gh")
	if err != nil {
		return nil, fmt.Errorf("gh cli not found in PATH: %w", err)
	}
	git, err := exec.LookPath("git")
	if err != nil {
		return nil, fmt.Errorf("git not found in PATH: %w", err)
	}

	return &GitHub{
		GHPath:  gh,
		GitPath: git,
	}, nil
}

func (g *GitHub) GetCommitsByBeadsID(repo string, beadsID string) (string, error) {
	cmd := exec.Command(g.GitPath, "log", "--all", fmt.Sprintf("--grep=Beads-ID: %s", beadsID))
	cmd.Dir = repo
	var out, stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	if err := cmd.Run(); err != nil {
		return "", fmt.Errorf("git log failed: %v, %s", err, stderr.String())
	}
	return out.String(), nil
}

func (g *GitHub) GetPRsByBeadsID(repo string, beadsID string) (string, error) {
	cmd := exec.Command(g.GHPath, "pr", "list", "--search", beadsID, "--state", "all", "--json", "number,state,title")
	cmd.Dir = repo
	var out, stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	if err := cmd.Run(); err != nil {
		return "", fmt.Errorf("gh pr list failed: %v, %s", err, stderr.String())
	}
	return out.String(), nil
}
