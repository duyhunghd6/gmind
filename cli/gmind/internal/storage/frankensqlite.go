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
	BeadsDB *sqlx.DB
	GmindDB *sqlx.DB
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
func FindDBPath(name string) (string, error) {
	curr, err := os.Getwd()
	if err != nil {
		return "", err
	}

	for {
		path := filepath.Join(curr, ".beads", name)
		if _, err := os.Stat(path); err == nil {
			return path, nil
		}
		
		// If looking for gmind.db and not found, return where it SHOULD be
		if name == "gmind.db" {
			// Check if .beads exists
			if _, err := os.Stat(filepath.Join(curr, ".beads")); err == nil {
				return filepath.Join(curr, ".beads", name), nil
			}
		}

		parent := filepath.Dir(curr)
		if parent == curr {
			break
		}
		curr = parent
	}

	return "", fmt.Errorf(".beads/%s not found in any parent directory", name)
}

// NewSQLiteDB initializes connection to FrankenSQLite DB.
func NewSQLiteDB(dsn string, readOnly bool) (*SQLiteDB, error) {
	if dsn == "" {
		discovered, err := FindDBPath("beads.db")
		if err != nil {
			return nil, err
		}
		dsn = discovered
	}

	// 1. Open Beads DB (Read-only as it's often reported as malformed for writes)
	beadsUri := fmt.Sprintf("file:%s?mode=ro&cache=shared", dsn)
	beadsDB, err := sqlx.Open("sqlite3", beadsUri)
	if err != nil {
		return nil, fmt.Errorf("failed to open beads.db: %w", err)
	}

	// 2. Open Gmind Metadata DB (Read-Write)
	gmindPath, err := FindDBPath("gmind.db")
	if err != nil {
		// Default to current .beads/gmind.db if not found
		gmindPath = filepath.Join(".beads", "gmind.db")
	}
	gmindUri := fmt.Sprintf("file:%s?mode=rw&cache=shared&_journal=WAL", gmindPath)
	
	// Create gmind.db if it doesn't exist
	if _, err := os.Stat(gmindPath); os.IsNotExist(err) {
		f, err := os.Create(gmindPath)
		if err != nil {
			return nil, fmt.Errorf("failed to create gmind.db: %w", err)
		}
		f.Close()
	}

	gmindDB, err := sqlx.Open("sqlite3", gmindUri)
	if err != nil {
		return nil, fmt.Errorf("failed to open gmind.db: %w", err)
	}

	return &SQLiteDB{BeadsDB: beadsDB, GmindDB: gmindDB}, nil
}

func (db *SQLiteDB) Close() error {
	db.BeadsDB.Close()
	db.GmindDB.Close()
	return nil
}

// InitSchema ensures the necessary RTE columns exist in the gmind.db.
func (db *SQLiteDB) InitSchema() error {
	query := `CREATE TABLE IF NOT EXISTS rte_metadata (
		id TEXT PRIMARY KEY,
		status TEXT,
		risk TEXT,
		resolution TEXT,
		approved_at TEXT,
		approved_by TEXT
	);`
	_, err := db.GmindDB.Exec(query)
	return err
}

// UpdateIssueRTE updates the RTE fields of an issue.
func (db *SQLiteDB) UpdateIssueRTE(id string, status, risk, resolution, approvedBy, approvedAt string) error {
	query := `INSERT INTO rte_metadata (id, status, risk, resolution, approved_by, approved_at)
		VALUES (?, ?, ?, ?, ?, ?)
		ON CONFLICT(id) DO UPDATE SET
		status = excluded.status,
		risk = excluded.risk,
		resolution = excluded.resolution,
		approved_by = excluded.approved_by,
		approved_at = excluded.approved_at;`
	_, err := db.GmindDB.Exec(query, id, status, risk, resolution, approvedBy, approvedAt)
	return err
}

// GetIssueDetails retrieves full details of an issue.
func (db *SQLiteDB) GetIssueDetails(beadsID string) (*Issue, error) {
	// 1. Get core data from beads.db
	var issue Issue
	query := "SELECT id, title, description, status, priority, issue_type, assignee FROM issues WHERE id = ?"
	err := db.BeadsDB.Get(&issue, query, beadsID)
	if err != nil {
		// Fallback to 'bd' CLI
		out, err := exec.Command("bd", "show", beadsID, "--json").Output()
		if err != nil {
			return nil, fmt.Errorf("both SQL and 'bd' CLI failed for %s: %w", beadsID, err)
		}

		var results []Issue
		if err := json.Unmarshal(out, &results); err != nil {
			return nil, fmt.Errorf("failed to parse 'bd show' output: %w", err)
		}

		if len(results) == 0 {
			return nil, fmt.Errorf("issue %s not found", beadsID)
		}
		issue = results[0]
	}

	// 2. Get RTE metadata from gmind.db
	var metadata struct {
		Status     string `db:"status"`
		Risk       string `db:"risk"`
		Resolution string `db:"resolution"`
		ApprovedAt string `db:"approved_at"`
		ApprovedBy string `db:"approved_by"`
	}
	query = "SELECT status, risk, resolution, approved_at, approved_by FROM rte_metadata WHERE id = ?"
	err = db.GmindDB.Get(&metadata, query, beadsID)
	if err == nil {
		issue.RTEStatus = metadata.Status
		issue.RTERisk = metadata.Risk
		issue.RTEResolution = metadata.Resolution
		issue.RTEApprovedAt = metadata.ApprovedAt
		issue.RTEApprovedBy = metadata.ApprovedBy
	}

	return &issue, nil
}

// GetIssueState retrieves the state of an issue given its beads ID.
func (db *SQLiteDB) GetIssueState(beadsID string) (string, error) {
	issue, err := db.GetIssueDetails(beadsID)
	if err != nil {
		return "Unknown", err
	}
	return issue.Status, nil
}

// GetAllIssues retrieves all issues from the database.
func (db *SQLiteDB) GetAllIssues() ([]Issue, error) {
	// This is more complex because we need to join across DBs
	// For simplicity, get all from BeadsDB then enrich
	var issues []Issue
	query := "SELECT id, title, description, status, priority, issue_type, assignee FROM issues"
	err := db.BeadsDB.Select(&issues, query)
	if err != nil {
		// Fallback to 'bd' CLI
		out, err := exec.Command("bd", "list", "--all", "--json").Output()
		if err != nil {
			return nil, fmt.Errorf("both SQL and 'bd' CLI failed: %w", err)
		}
		if err := json.Unmarshal(out, &issues); err != nil {
			return nil, fmt.Errorf("failed to parse 'bd list' output: %w", err)
		}
	}

	// Enrich with RTE metadata
	for i := range issues {
		var metadata struct {
			Status     string `db:"status"`
			Risk       string `db:"risk"`
			Resolution string `db:"resolution"`
			ApprovedAt string `db:"approved_at"`
			ApprovedBy string `db:"approved_by"`
		}
		query = "SELECT status, risk, resolution, approved_at, approved_by FROM rte_metadata WHERE id = ?"
		err = db.GmindDB.Get(&metadata, query, issues[i].ID)
		if err == nil {
			issues[i].RTEStatus = metadata.Status
			issues[i].RTERisk = metadata.Risk
			issues[i].RTEResolution = metadata.Resolution
			issues[i].RTEApprovedAt = metadata.ApprovedAt
			issues[i].RTEApprovedBy = metadata.ApprovedBy
		}
	}

	return issues, nil
}
