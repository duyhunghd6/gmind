package cmd

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/external"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/graph"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"github.com/spf13/cobra"
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

		// Initialize dependencies
		sqlite, err := storage.NewSQLiteDB("", true)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing SQLite: %v\n", err)
			os.Exit(1)
		}
		defer sqlite.Close()

		zvec, _ := storage.NewZvecDB()
		fastcode, _ := external.NewFastCode()

		// Create assembler
		assembler := graph.NewAssembler(sqlite, zvec, fastcode, nil)

		contextData, err := assembler.GetContextData(id, depth)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error getting context: %v\n", err)
			os.Exit(1)
		}

		if jsonOutput {
			payload, err := json.MarshalIndent(contextData, "", "  ")
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error encoding context JSON: %v\n", err)
				os.Exit(1)
			}
			fmt.Println(string(payload))
			return
		}

		context, err := assembler.GetContext(id, depth)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error getting context: %v\n", err)
			os.Exit(1)
		}
		fmt.Println(context)
	},
}

func init() {
	contextCmd.Flags().Int("depth", 0, "Depth of context to fetch (0 = all)")
	contextCmd.Flags().Bool("json", false, "Output results in JSON format")
	rootCmd.AddCommand(contextCmd)
}
