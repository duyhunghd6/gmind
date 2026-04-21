package external

import (
	"bytes"
	"fmt"
	"os/exec"
)

// FastCode encapsulates interaction with the 'fastcode' local binary.
type FastCode struct {
	BinaryPath string
}

func NewFastCode() (*FastCode, error) {
	// Ensure the binary is available in the current machine's PATH.
	path, err := exec.LookPath("fastcode")
	if err != nil {
		return nil, fmt.Errorf("fastcode binary not found in PATH: %w", err)
	}
	return &FastCode{BinaryPath: path}, nil
}

func (fc *FastCode) Index(repoPath string, force bool) error {
	args := []string{"index", "--no-embeddings", repoPath}
	if force {
		args = append(args, "--force")
	}
	cmd := exec.Command(fc.BinaryPath, args...)
	
	// Delegate output
	var stderr bytes.Buffer
	cmd.Stderr = &stderr
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("fastcode indexing failed: %v, %s", err, stderr.String())
	}
	return nil
}

func (fc *FastCode) Query(query string, repoPath string, jsonOutput bool) (string, error) {
	args := []string{"query", "--repo", repoPath}
	if jsonOutput {
		args = append(args, "--json")
	}
	args = append(args, query)

	cmd := exec.Command(fc.BinaryPath, args...)
	out, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("fastcode query failed: %w, %s", err, string(out))
	}
	return string(out), nil
}
