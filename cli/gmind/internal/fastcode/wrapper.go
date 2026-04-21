package fastcode

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

// RunFastCodeSearch orchestrates the fastcode execution for the given query.
func RunFastCodeSearch(query string, forceReindex bool, jsonOutput bool, debug bool) error {
	// 1. Check if fastcode binary exists
	_, err := exec.LookPath("fastcode")
	if err != nil {
		return fmt.Errorf("fastcode not found. Please ensure 'fastcode' is installed and available in your PATH")
	}

	// 2. Check if cache exists or if forced reindex is requested
	// Naive cache check based on spike: ~/.fastcode/cache/
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return fmt.Errorf("failed to get user home directory: %w", err)
	}
	cacheDir := filepath.Join(homeDir, ".fastcode", "cache")
	cacheExists := false
	if _, err := os.Stat(cacheDir); err == nil {
		cacheExists = true
	}

	if !cacheExists || forceReindex {
		if debug && !jsonOutput {
			fmt.Println("Running: fastcode index --no-embeddings .")
		}
		indexCmd := exec.Command("fastcode", "index", "--no-embeddings", ".")
		if debug && !jsonOutput {
			indexCmd.Stdout = os.Stdout
			indexCmd.Stderr = os.Stderr
		}
		err := indexCmd.Run()
		if err != nil {
			return fmt.Errorf("failed to build fastcode index: %w", err)
		}
	}

	// 3. Execute fastcode query
	args := []string{"query", "--repo", "."}
	if jsonOutput {
		args = append(args, "--json")
	}
	if debug {
		args = append(args, "--debug")
	}
	args = append(args, query)

	if debug && !jsonOutput {
		fmt.Printf("Running: fastcode %v\n", args)
	}

	queryCmd := exec.Command("fastcode", args...)
	queryCmd.Stdout = os.Stdout
	queryCmd.Stderr = os.Stderr
	
	err = queryCmd.Run()
	if err != nil {
		return fmt.Errorf("fastcode query failed: %w", err)
	}

	return nil
}
