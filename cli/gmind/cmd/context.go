package cmd

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/external"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/graph"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"github.com/spf13/cobra"
)

var (
	newContextDB       = func() (*storage.SQLiteDB, error) { return storage.NewSQLiteDB("", true) }
	newContextZvec     = storage.NewZvecDB
	newContextFastCode = external.NewFastCode
	exitContextCommand = os.Exit
)

var contextCmd = &cobra.Command{
	Use:   "context [beads-id]",
	Short: "Load full context for a Beads ID",
	Long:  "Retrieves description from FrankenSQLite, code context via FastCode, and discussion history via Zvec.",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		id := args[0]
		depth, _ := cmd.Flags().GetInt("depth")
		jsonOutput, _ := cmd.Flags().GetBool("json")

		if jsonOutput {
			contextData, err := loadContextData(id, depth)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error getting context: %v\n", err)
				exitContextCommand(1)
				return
			}

			payload, err := json.MarshalIndent(contextData, "", "  ")
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error encoding context JSON: %v\n", err)
				exitContextCommand(1)
				return
			}
			fmt.Println(string(payload))
			return
		}

		context, err := loadContextText(id, depth)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error getting context: %v\n", err)
			exitContextCommand(1)
			return
		}
		if context != "" {
			fmt.Println(context)
		}
	},
}

func loadContextData(id string, depth int) (*graph.ContextData, error) {
	assembler, cleanup, err := buildContextAssembler()
	if err != nil {
		return nil, err
	}
	defer cleanup()

	contextData, err := assembler.GetContextData(id, depth, nil)
	if err != nil {
		return nil, normalizeContextError(id, err)
	}
	return contextData, nil
}

func loadContextText(id string, depth int) (string, error) {
	assembler, cleanup, err := buildContextAssembler()
	if err != nil {
		return "", err
	}
	defer cleanup()

	progress := func(msg string) {
		fmt.Fprintln(os.Stderr, msg)
	}

	context, err := assembler.GetContext(id, depth, progress)
	if err != nil {
		return "", normalizeContextError(id, err)
	}
	return strings.TrimSpace(context), nil
}

func buildContextAssembler() (*graph.Assembler, func(), error) {
	sqlite, err := newContextDB()
	if err != nil {
		return nil, nil, fmt.Errorf("storage unavailable: %w", err)
	}

	cleanup := func() { sqlite.Close() }

	zvec, err := newContextZvec(sqlite.GmindDB)
	if err != nil {
		cleanup()
		return nil, nil, fmt.Errorf("zvec unavailable: %w", err)
	}

	fastcode, err := newContextFastCode()
	if err != nil {
		cleanup()
		return nil, nil, fmt.Errorf("fastcode unavailable: %w", err)
	}

	return graph.NewAssembler(sqlite, zvec, fastcode, nil), cleanup, nil
}

func normalizeContextError(id string, err error) error {
	if strings.Contains(err.Error(), "not found") {
		return fmt.Errorf("issue %s not found", id)
	}
	if errors.Is(err, os.ErrNotExist) {
		return fmt.Errorf("storage unavailable: %w", err)
	}
	return err
}

func init() {
	contextCmd.Flags().Int("depth", 0, "Depth of context to fetch (0 = all)")
	contextCmd.Flags().Bool("json", false, "Output results in JSON format")
	rootCmd.AddCommand(contextCmd)
}
