package cmd

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"github.com/spf13/cobra"
)

var searchCmd = &cobra.Command{
	Use:   "search [query]",
	Short: "Route query into Zvec to fetch Docs and Chat History",
	Long:  "Performs semantic search across project documentation and chat history. Does not return AST code snippets.",
	Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		query := args[0]
		jsonOutput, _ := cmd.Flags().GetBool("json")
		limit, _ := cmd.Flags().GetInt("limit")

		zvec, err := storage.NewZvecDB()
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error initializing Zvec: %v\n", err)
			os.Exit(1)
		}

		results, err := zvec.SemanticSearch(query, limit)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Search failed: %v\n", err)
			os.Exit(1)
		}

		if jsonOutput {
			data, err := json.MarshalIndent(results, "", "  ")
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error encoding JSON: %v\n", err)
				os.Exit(1)
			}
			fmt.Println(string(data))
		} else {
			fmt.Printf("Search results for: %s\n", query)
			fmt.Println("--------------------------------------------------")
			for _, res := range results {
				fmt.Printf("[%s] %s (Score: %.2f)\n", res.SourceType, res.SourceRef, res.Score)
				fmt.Printf("IDs: %v\n", res.BeadsIDs)
				fmt.Printf("Content: %s\n", res.Content)
				fmt.Println("--------------------------------------------------")
			}
		}
	},
}

func init() {
	searchCmd.Flags().Bool("json", false, "Output results in JSON format")
	searchCmd.Flags().Int("limit", 5, "Maximum number of results to return")
	rootCmd.AddCommand(searchCmd)
}
