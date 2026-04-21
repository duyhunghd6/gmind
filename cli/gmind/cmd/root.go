package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var rootCmd = &cobra.Command{
	Use:   "gmind",
	Short: "Gmind CLI - The Context API Gateway",
	Long:  `gmind is the orchestrator for context retrieval, structural code intelligence, and project tracking for the Gmind ecosystem.`,
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)
}

func initConfig() {
	viper.AutomaticEnv() // read in environment variables that match
}
