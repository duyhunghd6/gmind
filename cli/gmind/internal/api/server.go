package api

import (
	"fmt"
	"net/http"
)

// StartServer spins up the REST API HTTP server.
func StartServer(port int) error {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/coverage", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, `{"status": "ok", "message": "coverage endpoint mock"}`)
	})

	mux.HandleFunc("/api/trace", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, `{"status": "ok", "message": "trace endpoint mock"}`)
	})

	fmt.Printf("Starting Gmind RTM Server on port %d...\n", port)
	return http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
