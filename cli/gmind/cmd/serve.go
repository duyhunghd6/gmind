package cmd

import (
	"fmt"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/api"
	"github.com/spf13/cobra"
)

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start Go HTTP server for RTM Dashboard",
	Run: func(cmd *cobra.Command, args []string) {
		port, _ := cmd.Flags().GetInt("port")
		if err := api.StartServer(port); err != nil {
			fmt.Printf("Error starting server: %v\n", err)
		}
	},
}

func init() {
	serveCmd.Flags().Int("port", 8080, "Port to run the HTTP server on")
	rootCmd.AddCommand(serveCmd)
}
