package external

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strings"
	"sync"
	"time"
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
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	args := []string{"analyze", "--repo", repoPath, "--query", query}
	if jsonOutput {
		args = append(args, "--format", "json")
	} else {
		args = append(args, "--format", "text")
	}

	cmd := exec.CommandContext(ctx, fc.BinaryPath, args...)

	stdoutPipe, err := cmd.StdoutPipe()
	if err != nil {
		return "", fmt.Errorf("fastcode query setup failed: %w", err)
	}
	stderrPipe, err := cmd.StderrPipe()
	if err != nil {
		return "", fmt.Errorf("fastcode query setup failed: %w", err)
	}

	var stdoutBuf bytes.Buffer
	var stderrBuf bytes.Buffer

	if err := cmd.Start(); err != nil {
		return "", fmt.Errorf("fastcode query failed to start: %w", err)
	}

	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()
		_, _ = io.Copy(&stdoutBuf, stdoutPipe)
	}()

	go func() {
		defer wg.Done()
		writer := io.Writer(&stderrBuf)
		if !jsonOutput {
			writer = io.MultiWriter(&stderrBuf, os.Stderr)
		}
		_, _ = io.Copy(writer, stderrPipe)
	}()

	waitErr := cmd.Wait()
	wg.Wait()

	stdout := sanitizeFastCodeOutput(stdoutBuf.String(), jsonOutput)
	stderr := strings.TrimSpace(stderrBuf.String())
	output := strings.TrimSpace(strings.Join([]string{stdout, stderr}, "\n"))

	if waitErr != nil {
		if ctx.Err() == context.DeadlineExceeded {
			return "", fmt.Errorf("fastcode query timed out after 10s: %s", output)
		}
		return "", fmt.Errorf("fastcode query failed: %w, %s", waitErr, output)
	}

	return stdout, nil
}

func sanitizeFastCodeOutput(output string, jsonOutput bool) string {
	trimmed := strings.TrimSpace(output)
	if trimmed == "" {
		return ""
	}

	lines := strings.Split(trimmed, "\n")
	for i, line := range lines {
		candidate := strings.TrimSpace(strings.Join(lines[i:], "\n"))
		if candidate == "" {
			continue
		}
		if jsonOutput {
			if strings.HasPrefix(candidate, "{") || strings.HasPrefix(candidate, "[") {
				return candidate
			}
			continue
		}
		if strings.HasPrefix(line, "[init]") {
			continue
		}
		return candidate
	}

	return trimmed
}
