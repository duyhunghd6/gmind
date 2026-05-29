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
		
		issueType := r.URL.Query().Get("issue_type")
		status := r.URL.Query().Get("status")
		view := r.URL.Query().Get("view")
		board := r.URL.Query().Get("board")
		
		var filtered []storage.Issue
		for _, issue := range issues {
			if issueType != "" && issue.Type != issueType {
				continue
			}
			if status != "" {
				if status == "pending-approval" && issue.RTEStatus != "escalated" {
					continue
				} else if status != "pending-approval" && issue.Status != status {
					continue
				}
			}
			if view == "board" && board != "" {
				// Simple mock filtering for board
				labelsStr := strings.Join(issue.Labels, ",")
				if !strings.Contains(labelsStr, board) && issue.Type != "task" {
					// In a real app we'd filter by sprint or release labels
				}
			}
			filtered = append(filtered, issue)
		}
		jsonResponse(w, filtered)
	})

	mux.HandleFunc("/api/tasks/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/api/tasks/")
		
		if r.Method == http.MethodPut {
			var payload struct {
				QAStatus        string `json:"qa_status"`
				QAVerifiedBy    string `json:"qa_verified_by"`
				TestLogsRef     string `json:"test_logs_ref"`
				Coverage        string `json:"coverage"`
				EscalationLevel int    `json:"escalation_level"`
				Status          string `json:"status"`
			}
			if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			// In a full implementation, you'd also call 'bd' CLI to update standard fields like Status
			err := sqlite.UpdateIssuePM(id, payload.QAStatus, payload.QAVerifiedBy, payload.TestLogsRef, payload.Coverage, payload.EscalationLevel)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			jsonResponse(w, map[string]string{"status": "success"})
			return
		}

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

	// Register WebUI specific endpoints
	RegisterWebUIEndpoints(mux, sqlite)

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
