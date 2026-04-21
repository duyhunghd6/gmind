package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start Go HTTP server for RTM Dashboard",
	Run: func(cmd *cobra.Command, args []string) {
		port, _ := cmd.Flags().GetInt("port")
		fmt.Printf("Starting HTTP server on port %d\n", port)
		// TODO: call internal/api/server
	},
}

func init() {
	serveCmd.Flags().Int("port", 8080, "Port to run the HTTP server on")
	rootCmd.AddCommand(serveCmd)
}
