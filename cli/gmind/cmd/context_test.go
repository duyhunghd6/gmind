package cmd

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/external"
	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func setupContextTestDB(t *testing.T) (*storage.SQLiteDB, func()) {
	t.Helper()
	tmpDir := t.TempDir()
	beadsDir := filepath.Join(tmpDir, ".beads")
	if err := os.MkdirAll(beadsDir, 0o755); err != nil {
		t.Fatal(err)
	}

	beadsPath := filepath.Join(beadsDir, "beads.db")
	gmindPath := filepath.Join(beadsDir, "gmind.db")
	beadsDB, err := sqlx.Open("sqlite3", fmt.Sprintf("file:%s?cache=shared", beadsPath))
	if err != nil {
		t.Fatal(err)
	}
	gmindDB, err := sqlx.Open("sqlite3", fmt.Sprintf("file:%s?cache=shared&_journal=WAL", gmindPath))
	if err != nil {
		t.Fatal(err)
	}

	db := &storage.SQLiteDB{BeadsDB: beadsDB, GmindDB: gmindDB}
	if _, err := db.BeadsDB.Exec(`CREATE TABLE IF NOT EXISTS issues (
		id TEXT PRIMARY KEY,
		title TEXT,
		description TEXT,
		status TEXT,
		priority INTEGER,
		issue_type TEXT,
		assignee TEXT
	)`); err != nil {
		t.Fatal(err)
	}
	if err := db.InitSchema(); err != nil {
		t.Fatal(err)
	}
	if _, err := db.BeadsDB.Exec(
		`INSERT INTO issues (id, title, description, status, priority, issue_type, assignee) VALUES (?, ?, ?, ?, ?, ?, ?)`,
		"gmind-ctx-1", "Context issue", "desc", "blocked", 2, "task", "Hung",
	); err != nil {
		t.Fatal(err)
	}
	if err := db.UpdateIssueRTE("gmind-ctx-1", "approved", "high", "resume with execution context", "RTE-Lead", "2026-04-22T03:00:00Z"); err != nil {
		t.Fatal(err)
	}

	return db, func() { db.Close() }
}

func captureContextCommand(t *testing.T, fn func()) (string, string) {
	t.Helper()
	oldStdout := os.Stdout
	oldStderr := os.Stderr
	stdoutR, stdoutW, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	stderrR, stderrW, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	os.Stdout = stdoutW
	os.Stderr = stderrW

	fn()

	stdoutW.Close()
	stderrW.Close()
	os.Stdout = oldStdout
	os.Stderr = oldStderr

	var stdout bytes.Buffer
	if _, err := io.Copy(&stdout, stdoutR); err != nil {
		t.Fatal(err)
	}
	var stderr bytes.Buffer
	if _, err := io.Copy(&stderr, stderrR); err != nil {
		t.Fatal(err)
	}
	return stdout.String(), stderr.String()
}

func TestLoadContextDataReturnsStructuredContext(t *testing.T) {
	db, cleanup := setupContextTestDB(t)
	defer cleanup()

	oldDB := newContextDB
	oldZvec := newContextZvec
	oldFastCode := newContextFastCode
	defer func() {
		newContextDB = oldDB
		newContextZvec = oldZvec
		newContextFastCode = oldFastCode
	}()

	newContextDB = func() (*storage.SQLiteDB, error) { return db, nil }
	newContextZvec = func() (*storage.ZvecDB, error) { return &storage.ZvecDB{}, nil }
	newContextFastCode = func() (*external.FastCode, error) { return &external.FastCode{BinaryPath: "/bin/echo"}, nil }

	data, err := loadContextData("gmind-ctx-1", 1)
	if err != nil {
		t.Fatal(err)
	}
	if data.Issue == nil || data.Issue.Status != "blocked" {
		t.Fatalf("expected issue status blocked, got %+v", data.Issue)
	}
	if data.Issue.RTEStatus != "approved" || data.Issue.RTEResolution != "resume with execution context" {
		t.Fatalf("expected RTE metadata, got %+v", data.Issue)
	}
	if len(data.RelatedKnowledge) != 1 {
		t.Fatalf("expected related knowledge, got %+v", data.RelatedKnowledge)
	}
	if strings.TrimSpace(data.CodeContext) == "" {
		t.Fatalf("expected code context, got %q", data.CodeContext)
	}
}

func TestLoadContextDataReportsStorageUnavailable(t *testing.T) {
	oldDB := newContextDB
	defer func() { newContextDB = oldDB }()
	newContextDB = func() (*storage.SQLiteDB, error) { return nil, errors.New("db offline") }

	_, err := loadContextData("gmind-ctx-1", 0)
	if err == nil || !strings.Contains(err.Error(), "storage unavailable") {
		t.Fatalf("expected storage unavailable error, got %v", err)
	}
}

func TestLoadContextDataReportsZvecUnavailable(t *testing.T) {
	db, cleanup := setupContextTestDB(t)
	defer cleanup()

	oldDB := newContextDB
	oldZvec := newContextZvec
	oldFastCode := newContextFastCode
	defer func() {
		newContextDB = oldDB
		newContextZvec = oldZvec
		newContextFastCode = oldFastCode
	}()

	newContextDB = func() (*storage.SQLiteDB, error) { return db, nil }
	newContextZvec = func() (*storage.ZvecDB, error) { return nil, errors.New("index offline") }
	newContextFastCode = func() (*external.FastCode, error) { return &external.FastCode{BinaryPath: "/bin/echo"}, nil }

	_, err := loadContextData("gmind-ctx-1", 0)
	if err == nil || !strings.Contains(err.Error(), "zvec unavailable") {
		t.Fatalf("expected zvec unavailable error, got %v", err)
	}
}

func TestLoadContextDataReportsFastCodeUnavailable(t *testing.T) {
	db, cleanup := setupContextTestDB(t)
	defer cleanup()

	oldDB := newContextDB
	oldZvec := newContextZvec
	oldFastCode := newContextFastCode
	defer func() {
		newContextDB = oldDB
		newContextZvec = oldZvec
		newContextFastCode = oldFastCode
	}()

	newContextDB = func() (*storage.SQLiteDB, error) { return db, nil }
	newContextZvec = func() (*storage.ZvecDB, error) { return &storage.ZvecDB{}, nil }
	newContextFastCode = func() (*external.FastCode, error) { return nil, errors.New("binary missing") }

	_, err := loadContextData("gmind-ctx-1", 0)
	if err == nil || !strings.Contains(err.Error(), "fastcode unavailable") {
		t.Fatalf("expected fastcode unavailable error, got %v", err)
	}
}

func TestLoadContextDataPermitsMissingIssue(t *testing.T) {
	db, cleanup := setupContextTestDB(t)
	defer cleanup()

	oldDB := newContextDB
	oldZvec := newContextZvec
	oldFastCode := newContextFastCode
	defer func() {
		newContextDB = oldDB
		newContextZvec = oldZvec
		newContextFastCode = oldFastCode
	}()

	newContextDB = func() (*storage.SQLiteDB, error) { return db, nil }
	newContextZvec = func() (*storage.ZvecDB, error) { return &storage.ZvecDB{}, nil }
	newContextFastCode = func() (*external.FastCode, error) { return &external.FastCode{BinaryPath: "/bin/echo"}, nil }

	data, err := loadContextData("gmind-missing", 0)
	if err != nil {
		t.Fatalf("expected no error for missing issue, got %v", err)
	}
	if data == nil || data.BeadsID != "gmind-missing" {
		t.Fatalf("expected valid ContextData, got %+v", data)
	}
}

func TestLoadContextTextReturnsRenderedContext(t *testing.T) {
	db, cleanup := setupContextTestDB(t)
	defer cleanup()

	oldDB := newContextDB
	oldZvec := newContextZvec
	oldFastCode := newContextFastCode
	defer func() {
		newContextDB = oldDB
		newContextZvec = oldZvec
		newContextFastCode = oldFastCode
	}()

	newContextDB = func() (*storage.SQLiteDB, error) { return db, nil }
	newContextZvec = func() (*storage.ZvecDB, error) { return &storage.ZvecDB{}, nil }
	newContextFastCode = func() (*external.FastCode, error) { return &external.FastCode{BinaryPath: "/bin/echo"}, nil }

	context, err := loadContextText("gmind-ctx-1", 1)
	if err != nil {
		t.Fatal(err)
	}
	checks := []string{
		"## Issue",
		"## Related Knowledge (Zvec)",
		"## Code Context (FastCode)",
	}
	for _, want := range checks {
		if !strings.Contains(context, want) {
			t.Fatalf("expected context to contain %q, got %s", want, context)
		}
	}
}

func TestContextCommandWritesDeterministicJSON(t *testing.T) {
	db, cleanup := setupContextTestDB(t)
	defer cleanup()

	oldDB := newContextDB
	oldZvec := newContextZvec
	oldFastCode := newContextFastCode
	oldExit := exitContextCommand
	defer func() {
		newContextDB = oldDB
		newContextZvec = oldZvec
		newContextFastCode = oldFastCode
		exitContextCommand = oldExit
	}()

	newContextDB = func() (*storage.SQLiteDB, error) { return db, nil }
	newContextZvec = func() (*storage.ZvecDB, error) { return &storage.ZvecDB{}, nil }
	newContextFastCode = func() (*external.FastCode, error) { return &external.FastCode{BinaryPath: "/bin/echo"}, nil }
	exitContextCommand = func(code int) { t.Fatalf("unexpected exit: %d", code) }

	defer contextCmd.Flags().Set("json", "false")
	defer contextCmd.Flags().Set("depth", "0")
	contextCmd.Flags().Set("json", "true")
	contextCmd.Flags().Set("depth", "1")

	stdout, stderr := captureContextCommand(t, func() {
		contextCmd.Run(contextCmd, []string{"gmind-ctx-1"})
	})

	if stderr != "" {
		t.Fatalf("expected empty stderr, got %q", stderr)
	}
	checks := []string{
		"\"beads_id\": \"gmind-ctx-1\"",
		"\"status\": \"blocked\"",
		"\"rte_status\": \"approved\"",
		"\"rte_resolution\": \"resume with execution context\"",
		"\"related_knowledge\"",
		"\"code_context\"",
	}
	for _, want := range checks {
		if !strings.Contains(stdout, want) {
			t.Fatalf("expected stdout to contain %q, got %s", want, stdout)
		}
	}
	if strings.Contains(stdout, "[DEBUG]") {
		t.Fatalf("expected deterministic output without debug lines, got %s", stdout)
	}
}
