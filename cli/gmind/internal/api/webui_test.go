package api

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestWebUIEndpoints(t *testing.T) {
	mux := http.NewServeMux()
	RegisterWebUIEndpoints(mux, nil)

	tests := []struct {
		method string
		path   string
		status int
	}{
		{"GET", "/api/portfolio/epics", http.StatusOK},
		{"GET", "/api/pi/features", http.StatusOK},
		{"PUT", "/api/pi/plan", http.StatusOK},
		{"GET", "/api/risks", http.StatusOK},
		{"POST", "/api/pi/confidence-vote", http.StatusOK},
		{"PUT", "/api/tasks/bulk", http.StatusOK},
		{"GET", "/api/tasks/activity/123", http.StatusOK},
		{"GET", "/api/approval/evidence/456", http.StatusOK},
		{"POST", "/api/approval/decision/456", http.StatusOK},
		{"GET", "/api/activity", http.StatusOK},
		{"GET", "/api/file-leases", http.StatusOK},
		{"GET", "/api/git/graph", http.StatusOK},
		{"GET", "/api/agents/sessions", http.StatusOK},
		{"GET", "/api/ci/runs", http.StatusOK},
		{"GET", "/api/docs", http.StatusOK},
		{"GET", "/api/search", http.StatusOK},
		{"GET", "/api/storyboards", http.StatusOK},
	}

	for _, tc := range tests {
		t.Run(tc.method+" "+tc.path, func(t *testing.T) {
			req, err := http.NewRequest(tc.method, tc.path, nil)
			if err != nil {
				t.Fatal(err)
			}
			rr := httptest.NewRecorder()
			mux.ServeHTTP(rr, req)

			if status := rr.Code; status != tc.status {
				t.Errorf("handler returned wrong status code: got %v want %v",
					status, tc.status)
			}
		})
	}
}
