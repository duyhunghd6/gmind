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
	ID            string   `db:"id" json:"id"`
	Title         string   `db:"title" json:"title"`
	Description   string   `db:"description" json:"description"`
	Status        string   `db:"status" json:"status"`
	Priority      int      `db:"priority" json:"priority"`
	Type          string   `db:"issue_type" json:"issue_type"`
	Assignee      string   `db:"assignee" json:"assignee"`
	Labels        []string `json:"labels"`
	RTEStatus     string   `db:"rte_status" json:"rte_status"`
	RTERisk       string   `db:"rte_risk" json:"rte_risk"`
	RTEResolution string   `db:"rte_resolution" json:"rte_resolution"`
	RTEApprovedAt string   `db:"rte_approved_at" json:"rte_approved_at"`
	RTEApprovedBy string   `db:"rte_approved_by" json:"rte_approved_by"`
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
func NewSQLiteDB(dsn string, readOnly bool) (*SQLiteDB, error) {
	if dsn == "" {
		discovered, err := FindDBPath()
		if err != nil {
			return nil, err
		}
		dsn = discovered
	}

	mode := "rw"
	if readOnly {
		mode = "ro"
	}

	// Use URI for better control
	uri := fmt.Sprintf("file:%s?mode=%s&cache=shared", dsn, mode)

	// Open without Connect (Connect pings, which might fail if malformed)
	db, err := sqlx.Open("sqlite3", uri)
	if err != nil {
		return nil, fmt.Errorf("failed to open FrankenSQLite: %w", err)
	}

	return &SQLiteDB{db}, nil
}

// InitSchema ensures the necessary RTE columns exist in the issues table.
func (db *SQLiteDB) InitSchema() error {
	columns := []string{
		"ALTER TABLE issues ADD COLUMN rte_status TEXT",
		"ALTER TABLE issues ADD COLUMN rte_risk TEXT",
		"ALTER TABLE issues ADD COLUMN rte_resolution TEXT",
		"ALTER TABLE issues ADD COLUMN rte_approved_at TEXT",
		"ALTER TABLE issues ADD COLUMN rte_approved_by TEXT",
	}

	for _, col := range columns {
		_, _ = db.Exec(col) // Ignore errors (columns might exist)
	}
	return nil
}

// UpdateIssueRTE updates the RTE fields of an issue.
func (db *SQLiteDB) UpdateIssueRTE(id string, status, risk, resolution, approvedBy, approvedAt string) error {
	query := `UPDATE issues SET 
		rte_status = ?, 
		rte_risk = ?, 
		rte_resolution = ?, 
		rte_approved_by = ?, 
		rte_approved_at = ? 
		WHERE id = ?`
	_, err := db.Exec(query, status, risk, resolution, approvedBy, approvedAt, id)
	return err
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
	query := "SELECT id, title, description, status, priority, issue_type, assignee, " +
		"COALESCE(rte_status, '') as rte_status, " +
		"COALESCE(rte_risk, '') as rte_risk, " +
		"COALESCE(rte_resolution, '') as rte_resolution, " +
		"COALESCE(rte_approved_at, '') as rte_approved_at, " +
		"COALESCE(rte_approved_by, '') as rte_approved_by " +
		"FROM issues WHERE id = ?"
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
	query := "SELECT id, title, description, status, priority, issue_type, assignee, " +
		"COALESCE(rte_status, '') as rte_status, " +
		"COALESCE(rte_risk, '') as rte_risk, " +
		"COALESCE(rte_resolution, '') as rte_resolution, " +
		"COALESCE(rte_approved_at, '') as rte_approved_at, " +
		"COALESCE(rte_approved_by, '') as rte_approved_by " +
		"FROM issues"
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
