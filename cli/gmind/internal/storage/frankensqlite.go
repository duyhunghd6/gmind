package storage

import (
	"database/sql"
	"fmt"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

type SQLiteDB struct {
	*sqlx.DB
}

// NewSQLiteDB initializes connection to FrankenSQLite DB.
func NewSQLiteDB(dsn string) (*SQLiteDB, error) {
	db, err := sqlx.Connect("sqlite3", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to FrankenSQLite: %w", err)
	}

	// Optimize for read concurrency
	db.Exec("PRAGMA journal_mode=WAL;")

	return &SQLiteDB{db}, nil
}

// GetIssueState retrieves the state of an issue given its beads ID.
func (db *SQLiteDB) GetIssueState(beadsID string) (string, error) {
	var state string
	query := "SELECT status FROM issues WHERE beads_id = ?"
	err := db.Get(&state, query, beadsID)
	if err == sql.ErrNoRows {
		return "Unknown", nil
	}
	return state, err
}
