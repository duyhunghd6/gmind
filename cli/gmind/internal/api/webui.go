package api

import (
	"net/http"
	"strings"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
)

// RegisterWebUIEndpoints registers the mock and functional endpoints for the WebUI PM workspace.
func RegisterWebUIEndpoints(mux *http.ServeMux, db *storage.SQLiteDB) {

	// 1. Portfolio & PI Planning
	mux.HandleFunc("/api/portfolio/epics", func(w http.ResponseWriter, r *http.Request) {
		epics := []map[string]interface{}{
			{"id": "epic-1", "title": "WebUI V2", "owner": "Steve", "progress": 45, "budget": 10000, "status": "in-progress", "forecast": "Q2 2026"},
			{"id": "epic-2", "title": "Data Pipeline", "owner": "Alice", "progress": 80, "budget": 15000, "status": "in-progress", "forecast": "Q2 2026"},
		}
		jsonResponse(w, epics)
	})

	mux.HandleFunc("/api/pi/features", func(w http.ResponseWriter, r *http.Request) {
		features := []map[string]interface{}{
			{"id": "feat-1", "title": "User Dashboard"},
			{"id": "feat-2", "title": "Analytics Engine"},
		}
		jsonResponse(w, features)
	})

	mux.HandleFunc("/api/pi/plan", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPut {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		jsonResponse(w, map[string]string{"status": "success"})
	})

	mux.HandleFunc("/api/risks", func(w http.ResponseWriter, r *http.Request) {
		risks := []map[string]interface{}{
			{"id": "risk-1", "title": "API Rate Limit", "roam_status": "resolved"},
			{"id": "risk-2", "title": "Data migration downtime", "roam_status": "mitigated"},
		}
		jsonResponse(w, risks)
	})

	mux.HandleFunc("/api/pi/confidence-vote", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		jsonResponse(w, map[string]string{"status": "success"})
	})

	// 2. Tasks bulk and activity
	mux.HandleFunc("/api/tasks/bulk", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPut {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		jsonResponse(w, map[string]string{"status": "success"})
	})

	mux.HandleFunc("/api/tasks/activity/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/api/tasks/activity/")
		activity := []map[string]interface{}{
			{"id": "act-1", "action": "created", "actor": "system", "timestamp": "2026-05-29T10:00:00Z"},
			{"id": "act-2", "action": "assigned", "actor": "steve", "timestamp": "2026-05-29T10:05:00Z", "task_id": id},
		}
		jsonResponse(w, activity)
	})

	// 4. Approval Evidence & Decision
	mux.HandleFunc("/api/approval/evidence/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/api/approval/evidence/")
		evidence := map[string]interface{}{
			"id":        id,
			"test_logs": "All tests passed for " + id,
			"code_diff": "+ func New() {}\n- func Old() {}",
			"prd_links": []string{"br-prd04"},
			"ci_status": "passed",
		}
		jsonResponse(w, evidence)
	})

	mux.HandleFunc("/api/approval/decision/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		jsonResponse(w, map[string]string{"status": "success"})
	})

	// 5. Timeline & Activity Global
	mux.HandleFunc("/api/activity", func(w http.ResponseWriter, r *http.Request) {
		feed := []map[string]interface{}{
			{"id": "ev-1", "action": "PR merged", "timestamp": "2026-05-29T09:00:00Z"},
			{"id": "ev-2", "action": "Task bd-x1y2 updated", "timestamp": "2026-05-29T09:30:00Z"},
		}
		jsonResponse(w, feed)
	})

	mux.HandleFunc("/api/file-leases", func(w http.ResponseWriter, r *http.Request) {
		leases := []map[string]interface{}{
			{"file_path": "cmd/main.go", "status": "locked", "agent": "DevBot01"},
			{"file_path": "api/server.go", "status": "unlocked", "agent": ""},
		}
		jsonResponse(w, leases)
	})

	// 6. Git & Terminal
	mux.HandleFunc("/api/git/graph", func(w http.ResponseWriter, r *http.Request) {
		graph := map[string]interface{}{
			"nodes": []map[string]string{{"id": "commit-1", "label": "Initial commit"}},
			"edges": []map[string]string{},
		}
		jsonResponse(w, graph)
	})

	mux.HandleFunc("/api/agents/sessions", func(w http.ResponseWriter, r *http.Request) {
		sessions := []map[string]interface{}{
			{"id": "sess-1", "name": "Claude-01 Storage", "status": "active"},
			{"id": "sess-2", "name": "Claude-02 CLI", "status": "idle"},
		}
		jsonResponse(w, sessions)
	})

	mux.HandleFunc("/api/ci/runs", func(w http.ResponseWriter, r *http.Request) {
		runs := []map[string]interface{}{
			{"id": "run-101", "status": "passed"},
			{"id": "run-102", "status": "running"},
		}
		jsonResponse(w, runs)
	})

	// 7. Docs & Search
	mux.HandleFunc("/api/docs", func(w http.ResponseWriter, r *http.Request) {
		docs := []map[string]interface{}{
			{"id": "doc-1", "title": "PRD-00 Vision", "source_type": "Docs"},
			{"id": "doc-2", "title": "PRD-04 WebUI", "source_type": "Docs"},
		}
		jsonResponse(w, docs)
	})

	mux.HandleFunc("/api/search", func(w http.ResponseWriter, r *http.Request) {
		results := []map[string]interface{}{
			{"id": "res-1", "type": "Task", "title": "Implement search", "snippet": "...search API endpoint..."},
		}
		jsonResponse(w, results)
	})

	// 8. Storyboards
	mux.HandleFunc("/api/storyboards", func(w http.ResponseWriter, r *http.Request) {
		boards := []map[string]interface{}{
			{"id": "sb-1", "title": "PM Planning Journey"},
		}
		jsonResponse(w, boards)
	})
}
