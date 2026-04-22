package cmd

import (
	"bytes"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func setupEscalateTestDB(t *testing.T) (*storage.SQLiteDB, func() *storage.SQLiteDB, func()) {
	t.Helper()
	tmpDir := t.TempDir()
	beadsDir := filepath.Join(tmpDir, ".beads")
	if err := os.MkdirAll(beadsDir, 0o755); err != nil {
		t.Fatal(err)
	}

	beadsPath := filepath.Join(beadsDir, "beads.db")
	gmindPath := filepath.Join(beadsDir, "gmind.db")
	openDB := func() *storage.SQLiteDB {
		t.Helper()
		beadsDB, err := sqlx.Open("sqlite3", fmt.Sprintf("file:%s?cache=shared", beadsPath))
		if err != nil {
			t.Fatal(err)
		}

		gmindDB, err := sqlx.Open("sqlite3", fmt.Sprintf("file:%s?cache=shared&_journal=WAL", gmindPath))
		if err != nil {
			t.Fatal(err)
		}
		return &storage.SQLiteDB{BeadsDB: beadsDB, GmindDB: gmindDB}
	}

	db := openDB()
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
		"gmind-1a5", "Escalate test", "desc", "open", 2, "task", "",
	); err != nil {
		t.Fatal(err)
	}

	return db, openDB, func() {
		db.Close()
	}
}

func captureStdout(t *testing.T, fn func()) string {
	t.Helper()
	oldStdout := os.Stdout
	r, w, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	os.Stdout = w

	fn()

	if err := w.Close(); err != nil {
		t.Fatal(err)
	}
	os.Stdout = oldStdout

	var buf bytes.Buffer
	if _, err := io.Copy(&buf, r); err != nil {
		t.Fatal(err)
	}
	return buf.String()
}

func TestEscalateCommandUpdatesBlockedStateAndMetadata(t *testing.T) {
	db, reopenDB, cleanup := setupEscalateTestDB(t)
	defer cleanup()

	oldDB := newEscalateDB
	oldRun := runEscalateCommand
	oldArgs := os.Args
	defer func() {
		newEscalateDB = oldDB
		runEscalateCommand = oldRun
		os.Args = oldArgs
	}()

	newEscalateDB = func() (*storage.SQLiteDB, error) {
		return db, nil
	}

	var calls [][]string
	runEscalateCommand = func(name string, args ...string) ([]byte, error) {
		calls = append(calls, append([]string{name}, args...))
		switch name {
		case "br":
			return []byte(`{"id":"gmind-1a5"}`), nil
		default:
			if name != "/tmp/gmind-test" {
				t.Fatalf("unexpected command: %s %v", name, args)
			}
			return []byte("trace evidence"), nil
		}
	}
	os.Args = []string{"/tmp/gmind-test"}

	oldOut := escalateCmd.OutOrStdout()
	oldErr := escalateCmd.ErrOrStderr()
	defer escalateCmd.SetOut(oldOut)
	defer escalateCmd.SetErr(oldErr)
	defer escalateCmd.Flags().Set("risk", "")
	buf := &bytes.Buffer{}
	escalateCmd.SetOut(buf)
	escalateCmd.SetErr(buf)
	escalateCmd.Flags().Set("risk", "critical dependency blocked")

	output := captureStdout(t, func() {
		escalateCmd.Run(escalateCmd, []string{"gmind-1a5"})
	})

	if len(calls) != 2 {
		t.Fatalf("expected 2 command calls, got %d", len(calls))
	}

	expectedUpdate := []string{"br", "update", "gmind-1a5", "--status", "blocked", "--remove-label", "rte:escalated", "--remove-label", "rte:approved", "--remove-label", "rte:rejected", "--add-label", "rte:escalated", "--json"}
	if strings.Join(calls[0], " ") != strings.Join(expectedUpdate, " ") {
		t.Fatalf("unexpected br update call:\nwant: %v\ngot:  %v", expectedUpdate, calls[0])
	}

	expectedTrace := []string{"/tmp/gmind-test", "trace", "gmind-1a5"}
	if strings.Join(calls[1], " ") != strings.Join(expectedTrace, " ") {
		t.Fatalf("unexpected trace call:\nwant: %v\ngot:  %v", expectedTrace, calls[1])
	}

	verifyDB := reopenDB()
	defer verifyDB.Close()

	issue, err := verifyDB.GetIssueDetails("gmind-1a5")
	if err != nil {
		t.Fatal(err)
	}
	if issue.RTEStatus != "escalated" {
		t.Fatalf("expected RTE status escalated, got %q", issue.RTEStatus)
	}
	if issue.RTERisk != "critical dependency blocked" {
		t.Fatalf("expected risk to persist, got %q", issue.RTERisk)
	}
	if issue.RTEResolution != "" {
		t.Fatalf("expected empty resolution, got %q", issue.RTEResolution)
	}
	if issue.RTEApprovedBy != "" || issue.RTEApprovedAt != "" {
		t.Fatalf("expected empty approval fields, got approved_by=%q approved_at=%q", issue.RTEApprovedBy, issue.RTEApprovedAt)
	}
	if !strings.Contains(output, "Escalated gmind-1a5 to RTE Team") {
		t.Fatalf("expected success output, got %q", output)
	}
}

func TestEscalateCommandWarnsWhenTraceFails(t *testing.T) {
	db, _, cleanup := setupEscalateTestDB(t)
	defer cleanup()

	oldDB := newEscalateDB
	oldRun := runEscalateCommand
	oldArgs := os.Args
	defer func() {
		newEscalateDB = oldDB
		runEscalateCommand = oldRun
		os.Args = oldArgs
	}()

	newEscalateDB = func() (*storage.SQLiteDB, error) {
		return db, nil
	}

	runEscalateCommand = func(name string, args ...string) ([]byte, error) {
		if name == "br" {
			return []byte(`{"id":"gmind-1a5"}`), nil
		}
		return nil, fmt.Errorf("trace failed")
	}
	os.Args = []string{"/tmp/gmind-test"}
	defer escalateCmd.Flags().Set("risk", "")
	escalateCmd.Flags().Set("risk", "critical dependency blocked")

	oldStderr := os.Stderr
	r, w, err := os.Pipe()
	if err != nil {
		t.Fatal(err)
	}
	os.Stderr = w

	output := captureStdout(t, func() {
		escalateCmd.Run(escalateCmd, []string{"gmind-1a5"})
	})

	if err := w.Close(); err != nil {
		t.Fatal(err)
	}
	os.Stderr = oldStderr

	var stderr bytes.Buffer
	if _, err := io.Copy(&stderr, r); err != nil {
		t.Fatal(err)
	}

	if !strings.Contains(stderr.String(), "Warning: Failed to gather trace evidence") {
		t.Fatalf("expected trace warning, got %q", stderr.String())
	}
	if !strings.Contains(output, "Escalated gmind-1a5 to RTE Team") {
		t.Fatalf("expected success output, got %q", output)
	}
}
