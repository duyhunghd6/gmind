package api

import (
	"embed"
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/graph"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/rtm"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
)

//go:embed webui/index.html
var webuiFS embed.FS

// StartServer spins up the REST API HTTP server.
func StartServer(port int) error {
	mux := http.NewServeMux()

	dbPath := filepath.Join(".beads", "beads.db")
	sqlite, err := storage.NewSQLiteDB(dbPath, true)
	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}

	assembler := graph.NewAssembler(sqlite, nil, nil, nil)
	syncMgr := &rtm.SyncManager{}

	// API Endpoints
	mux.HandleFunc("/api/coverage", func(w http.ResponseWriter, r *http.Request) {
		mode := r.URL.Query().Get("mode")
		if mode == "" {
			mode = "full"
		}
		data, err := syncMgr.GetCoverageData(mode)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		jsonResponse(w, data)
	})

	mux.HandleFunc("/api/gaps", func(w http.ResponseWriter, r *http.Request) {
		mode := r.URL.Query().Get("mode")
		if mode == "" {
			mode = "prd-to-plan"
		}
		data, err := assembler.GapsData(mode)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		jsonResponse(w, data)
	})

	mux.HandleFunc("/api/trace/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/api/trace/")
		if id == "" {
			http.Error(w, "missing id", http.StatusBadRequest)
			return
		}
		data, err := assembler.TraceData(id, false, false)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		jsonResponse(w, data)
	})

	mux.HandleFunc("/api/impact/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/api/impact/")
		if id == "" {
			http.Error(w, "missing id", http.StatusBadRequest)
			return
		}
		data, err := assembler.ImpactData(id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		jsonResponse(w, data)
	})

	mux.HandleFunc("/api/tasks", func(w http.ResponseWriter, r *http.Request) {
		issues, err := sqlite.GetAllIssues()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		jsonResponse(w, issues)
	})

	mux.HandleFunc("/api/tasks/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/api/tasks/")
		issue, err := sqlite.GetIssueDetails(id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if issue == nil {
			http.Error(w, "task not found", http.StatusNotFound)
			return
		}
		jsonResponse(w, issue)
	})

	// Web UI
	mux.Handle("/", http.FileServer(http.FS(webuiFS)))
	mux.HandleFunc("/web", func(w http.ResponseWriter, r *http.Request) {
		data, _ := webuiFS.ReadFile("webui/index.html")
		w.Header().Set("Content-Type", "text/html")
		w.Write(data)
	})

	fmt.Printf("Starting Gmind RTM Server on port %d...\n", port)
	return http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}

func jsonResponse(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
