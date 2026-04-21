package storage

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

type SQLiteDB struct {
	*sqlx.DB
}

type Issue struct {
	ID          string   `db:"id" json:"id"`
	Title       string   `db:"title" json:"title"`
	Description string   `db:"description" json:"description"`
	Status      string   `db:"status" json:"status"`
	Priority    int      `db:"priority" json:"priority"`
	Type        string   `db:"issue_type" json:"issue_type"`
	Assignee    string   `db:"assignee" json:"assignee"`
	Labels      []string `json:"labels"`
}

// FindDBPath searches for .beads/beads.db starting from current directory up to root.
func FindDBPath() (string, error) {
	curr, err := os.Getwd()
	if err != nil {
		return "", err
	}

	for {
		path := filepath.Join(curr, ".beads", "beads.db")
		if _, err := os.Stat(path); err == nil {
			return path, nil
		}

		parent := filepath.Dir(curr)
		if parent == curr {
			break
		}
		curr = parent
	}

	return "", fmt.Errorf(".beads/beads.db not found in any parent directory")
}

// NewSQLiteDB initializes connection to FrankenSQLite DB.
func NewSQLiteDB(dsn string) (*SQLiteDB, error) {
	if dsn == "" {
		discovered, err := FindDBPath()
		if err != nil {
			return nil, err
		}
		dsn = discovered
	}

	// Use URI for better control
	uri := fmt.Sprintf("file:%s?mode=ro&cache=shared", dsn)

	// Open without Connect (Connect pings, which might fail if malformed)
	db, err := sqlx.Open("sqlite3", uri)
	if err != nil {
		return nil, fmt.Errorf("failed to open FrankenSQLite: %w", err)
	}

	return &SQLiteDB{db}, nil
}

// GetIssueState retrieves the state of an issue given its beads ID.
func (db *SQLiteDB) GetIssueState(beadsID string) (string, error) {
	var state string
	query := "SELECT status FROM issues WHERE id = ?"
	err := db.Get(&state, query, beadsID)
	if err != nil {
		// Fallback to 'bd' CLI
		issue, err := db.GetIssueDetails(beadsID)
		if err != nil || issue == nil {
			return "Unknown", err
		}
		return issue.Status, nil
	}
	return state, nil
}

// GetIssueDetails retrieves full details of an issue.
func (db *SQLiteDB) GetIssueDetails(beadsID string) (*Issue, error) {
	// Try SQL first
	var issue Issue
	query := "SELECT id, title, description, status, priority, issue_type, assignee FROM issues WHERE id = ?"
	err := db.Get(&issue, query, beadsID)
	if err == nil {
		return &issue, nil
	}

	// Fallback to 'bd' CLI
	out, err := exec.Command("bd", "show", beadsID, "--json").Output()
	if err != nil {
		return nil, fmt.Errorf("both SQL and 'bd' CLI failed for %s: %w", beadsID, err)
	}

	var results []Issue
	if err := json.Unmarshal(out, &results); err != nil {
		return nil, fmt.Errorf("failed to parse 'bd show' output: %w", err)
	}

	if len(results) > 0 {
		return &results[0], nil
	}

	return nil, nil
}

// GetAllIssues retrieves all issues from the database.
func (db *SQLiteDB) GetAllIssues() ([]Issue, error) {
	var issues []Issue
	query := "SELECT id, title, description, status, priority, issue_type, assignee FROM issues"
	err := db.Select(&issues, query)
	if err == nil {
		return issues, nil
	}

	// Fallback to 'bd' CLI
	out, err := exec.Command("bd", "list", "--all", "--json").Output()
	if err != nil {
		return nil, fmt.Errorf("both SQL and 'bd' CLI failed: %w", err)
	}

	if err := json.Unmarshal(out, &issues); err != nil {
		return nil, fmt.Errorf("failed to parse 'bd list' output: %w", err)
	}

	return issues, nil
}
