package storage

import (
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

// setupTestDBs creates fully isolated temporary beads.db and gmind.db.
// Bypasses NewSQLiteDB/FindDBPath to avoid discovering real project DBs.
func setupTestDBs(t *testing.T) (*SQLiteDB, func()) {
	t.Helper()
	tmpDir := t.TempDir()
	beadsDir := filepath.Join(tmpDir, ".beads")
	if err := os.MkdirAll(beadsDir, 0o755); err != nil {
		t.Fatal(err)
	}

	beadsPath := filepath.Join(beadsDir, "beads.db")
	gmindPath := filepath.Join(beadsDir, "gmind.db")

	// Open beads DB (read-write for tests so we can insert test data)
	beadsURI := fmt.Sprintf("file:%s?cache=shared", beadsPath)
	beadsDB, err := sqlx.Open("sqlite3", beadsURI)
	if err != nil {
		t.Fatal("failed to open beads.db:", err)
	}

	// Open gmind DB (read-write)
	gmindURI := fmt.Sprintf("file:%s?cache=shared&_journal=WAL", gmindPath)
	gmindDB, err := sqlx.Open("sqlite3", gmindURI)
	if err != nil {
		t.Fatal("failed to open gmind.db:", err)
	}

	db := &SQLiteDB{BeadsDB: beadsDB, GmindDB: gmindDB}

	// Create issues table in beads DB for test queries
	_, err = db.BeadsDB.Exec(`CREATE TABLE IF NOT EXISTS issues (
		id TEXT PRIMARY KEY,
		title TEXT,
		description TEXT,
		status TEXT,
		priority INTEGER,
		issue_type TEXT,
		assignee TEXT
	)`)
	if err != nil {
		t.Fatal("failed to create issues table:", err)
	}

	cleanup := func() {
		db.Close()
	}
	return db, cleanup
}

func TestInitSchema(t *testing.T) {
	db, cleanup := setupTestDBs(t)
	defer cleanup()

	if err := db.InitSchema(); err != nil {
		t.Fatal("InitSchema failed:", err)
	}

	// Verify rte_metadata table exists
	var name string
	err := db.GmindDB.Get(&name, "SELECT name FROM sqlite_master WHERE type='table' AND name='rte_metadata'")
	if err != nil {
		t.Fatal("rte_metadata table not created:", err)
	}

	// Verify index_watermarks table exists
	err = db.GmindDB.Get(&name, "SELECT name FROM sqlite_master WHERE type='table' AND name='index_watermarks'")
	if err != nil {
		t.Fatal("index_watermarks table not created:", err)
	}
}

func TestInitSchema_Idempotent(t *testing.T) {
	db, cleanup := setupTestDBs(t)
	defer cleanup()

	// Call InitSchema twice — should not error
	if err := db.InitSchema(); err != nil {
		t.Fatal("first InitSchema failed:", err)
	}
	if err := db.InitSchema(); err != nil {
		t.Fatal("second InitSchema failed:", err)
	}
}

func TestUpdateIssueRTE(t *testing.T) {
	db, cleanup := setupTestDBs(t)
	defer cleanup()

	if err := db.InitSchema(); err != nil {
		t.Fatal(err)
	}

	// Insert RTE metadata
	err := db.UpdateIssueRTE("br-test-001", "escalated", "high risk", "", "", "")
	if err != nil {
		t.Fatal("UpdateIssueRTE failed:", err)
	}

	// Verify
	var status string
	err = db.GmindDB.Get(&status, "SELECT status FROM rte_metadata WHERE id = ?", "br-test-001")
	if err != nil {
		t.Fatal("failed to read RTE metadata:", err)
	}
	if status != "escalated" {
		t.Errorf("expected status 'escalated', got '%s'", status)
	}
}

func TestUpdateIssueRTE_Upsert(t *testing.T) {
	db, cleanup := setupTestDBs(t)
	defer cleanup()

	if err := db.InitSchema(); err != nil {
		t.Fatal(err)
	}

	// Insert then update
	if err := db.UpdateIssueRTE("br-test-002", "escalated", "risk A", "", "", ""); err != nil {
		t.Fatal(err)
	}
	if err := db.UpdateIssueRTE("br-test-002", "approved", "risk A", "use approach B", "RTE-Lead", "2026-04-21"); err != nil {
		t.Fatal(err)
	}

	var metadata struct {
		Resolution string `db:"resolution"`
		ApprovedBy string `db:"approved_by"`
		ApprovedAt string `db:"approved_at"`
	}
	if err := db.GmindDB.Get(&metadata, "SELECT resolution, approved_by, approved_at FROM rte_metadata WHERE id = ?", "br-test-002"); err != nil {
		t.Fatal(err)
	}
	if metadata.Resolution != "use approach B" {
		t.Errorf("expected resolution 'use approach B', got '%s'", metadata.Resolution)
	}
	if metadata.ApprovedBy != "RTE-Lead" {
		t.Errorf("expected approved_by 'RTE-Lead', got '%s'", metadata.ApprovedBy)
	}
	if metadata.ApprovedAt != "2026-04-21" {
		t.Errorf("expected approved_at '2026-04-21', got '%s'", metadata.ApprovedAt)
	}
}

func TestUpdateIssueRTE_RejectionClearsApprovalMetadata(t *testing.T) {
	db, cleanup := setupTestDBs(t)
	defer cleanup()

	if err := db.InitSchema(); err != nil {
		t.Fatal(err)
	}

	if err := db.UpdateIssueRTE("br-test-003", "approved", "risk A", "ship it", "RTE-Lead", "2026-04-21"); err != nil {
		t.Fatal(err)
	}
	if err := db.UpdateIssueRTE("br-test-003", "rejected", "risk A", "need rollback plan", "", ""); err != nil {
		t.Fatal(err)
	}

	var metadata struct {
		Status     string `db:"status"`
		Resolution string `db:"resolution"`
		ApprovedBy string `db:"approved_by"`
		ApprovedAt string `db:"approved_at"`
	}
	if err := db.GmindDB.Get(&metadata, "SELECT status, resolution, approved_by, approved_at FROM rte_metadata WHERE id = ?", "br-test-003"); err != nil {
		t.Fatal(err)
	}
	if metadata.Status != "rejected" {
		t.Errorf("expected status 'rejected', got '%s'", metadata.Status)
	}
	if metadata.Resolution != "need rollback plan" {
		t.Errorf("expected resolution 'need rollback plan', got '%s'", metadata.Resolution)
	}
	if metadata.ApprovedBy != "" {
		t.Errorf("expected approved_by to be cleared, got '%s'", metadata.ApprovedBy)
	}
	if metadata.ApprovedAt != "" {
		t.Errorf("expected approved_at to be cleared, got '%s'", metadata.ApprovedAt)
	}
}

func TestWatermark_RoundTrip(t *testing.T) {
	db, cleanup := setupTestDBs(t)
	defer cleanup()

	if err := db.InitSchema(); err != nil {
		t.Fatal(err)
	}

	// Initially empty
	val, count, err := db.GetWatermark("markdown-doc")
	if err != nil {
		t.Fatal(err)
	}
	if val != "" || count != 0 {
		t.Errorf("expected empty watermark, got val=%s count=%d", val, count)
	}

	// Set watermark
	err = db.UpdateWatermark("markdown-doc", "2026-04-21T10:00:00Z", 42)
	if err != nil {
		t.Fatal("UpdateWatermark failed:", err)
	}

	// Read back
	val, count, err = db.GetWatermark("markdown-doc")
	if err != nil {
		t.Fatal(err)
	}
	if val != "2026-04-21T10:00:00Z" {
		t.Errorf("expected '2026-04-21T10:00:00Z', got '%s'", val)
	}
	if count != 42 {
		t.Errorf("expected 42, got %d", count)
	}
}

func TestWatermark_Update(t *testing.T) {
	db, cleanup := setupTestDBs(t)
	defer cleanup()

	if err := db.InitSchema(); err != nil {
		t.Fatal(err)
	}

	db.UpdateWatermark("git-commit", "2026-01-01", 10)
	db.UpdateWatermark("git-commit", "2026-04-21", 50)

	val, count, _ := db.GetWatermark("git-commit")
	if val != "2026-04-21" || count != 50 {
		t.Errorf("watermark not updated: val=%s count=%d", val, count)
	}
}

func TestGetIssueDetails_FromBeadsDB(t *testing.T) {
	db, cleanup := setupTestDBs(t)
	defer cleanup()

	if err := db.InitSchema(); err != nil {
		t.Fatal(err)
	}

	// Insert a test issue
	_, err := db.BeadsDB.Exec(
		`INSERT INTO issues (id, title, description, status, priority, issue_type, assignee)
		 VALUES (?, ?, ?, ?, ?, ?, ?)`,
		"test-001", "Test Issue", "A test issue", "open", 2, "task", "agent",
	)
	if err != nil {
		t.Fatal("failed to insert test issue:", err)
	}

	// Add RTE metadata
	db.UpdateIssueRTE("test-001", "escalated", "breaking change", "", "", "")

	issue, err := db.GetIssueDetails("test-001")
	if err != nil {
		t.Fatal("GetIssueDetails failed:", err)
	}
	if issue == nil {
		t.Fatal("issue should not be nil")
	}
	if issue.Title != "Test Issue" {
		t.Errorf("expected 'Test Issue', got '%s'", issue.Title)
	}
	if issue.RTEStatus != "escalated" {
		t.Errorf("expected RTE status 'escalated', got '%s'", issue.RTEStatus)
	}
}

func TestGetIssueState(t *testing.T) {
	db, cleanup := setupTestDBs(t)
	defer cleanup()

	_, err := db.BeadsDB.Exec(
		`INSERT INTO issues (id, title, description, status, priority, issue_type, assignee)
		 VALUES (?, ?, ?, ?, ?, ?, ?)`,
		"test-002", "State Test", "desc", "in_progress", 1, "task", "",
	)
	if err != nil {
		t.Fatal(err)
	}

	state, err := db.GetIssueState("test-002")
	if err != nil {
		t.Fatal(err)
	}
	if state != "in_progress" {
		t.Errorf("expected 'in_progress', got '%s'", state)
	}
}
