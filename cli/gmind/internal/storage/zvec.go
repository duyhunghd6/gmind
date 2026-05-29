package storage

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"regexp"
	"strings"

	"github.com/jmoiron/sqlx"
)

type ZvecSearchResult struct {
	ChunkID    string   `json:"chunk_id"`
	SourceType string   `json:"source_type"`
	SourceRef  string   `json:"source_ref"`
	BeadsIDs   []string `json:"beads_ids"`
	Content    string   `json:"content"`
	Score      float64  `json:"score"`
	Timestamp  string   `json:"timestamp"`
	Author     string   `json:"author"`
}

type ZvecDB struct {
	DB *sqlx.DB
}

func NewZvecDB(db *sqlx.DB) (*ZvecDB, error) {
	return &ZvecDB{DB: db}, nil
}

func (z *ZvecDB) SemanticSearch(query string, limit int) ([]ZvecSearchResult, error) {
	// Basic keyword matching since sqlite does not perform vector searches. Wait for C++ integration for true semantics.
	var results []ZvecSearchResult
	// Search over text. Basic wildcard matching.
	searchQuery := fmt.Sprintf("%%%s%%", query)

	q := `SELECT chunk_id, source_type, source_ref, beads_ids, content, score, timestamp, author 
	      FROM zvec_chunks 
	      WHERE content LIKE ? 
	      ORDER BY timestamp DESC 
	      LIMIT ?`

	rows, err := z.DB.Queryx(q, searchQuery, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var r struct {
			ChunkID    string  `db:"chunk_id"`
			SourceType string  `db:"source_type"`
			SourceRef  string  `db:"source_ref"`
			BeadsIDs   string  `db:"beads_ids"`
			Content    string  `db:"content"`
			Score      float64 `db:"score"`
			Timestamp  string  `db:"timestamp"`
			Author     string  `db:"author"`
		}
		if err := rows.StructScan(&r); err != nil {
			return nil, err
		}

		var beadsIDs []string
		if r.BeadsIDs != "" {
			json.Unmarshal([]byte(r.BeadsIDs), &beadsIDs)
		}

		results = append(results, ZvecSearchResult{
			ChunkID:    r.ChunkID,
			SourceType: r.SourceType,
			SourceRef:  r.SourceRef,
			BeadsIDs:   beadsIDs,
			Content:    r.Content,
			Score:      r.Score,
			Timestamp:  r.Timestamp,
			Author:     r.Author,
		})
	}
	return results, nil
}

func (z *ZvecDB) SearchByBeadsID(id string) ([]ZvecSearchResult, error) {
	var results []ZvecSearchResult
	searchStr := fmt.Sprintf(`%%"%s"%%`, id)

	q := `SELECT chunk_id, source_type, source_ref, beads_ids, content, score, timestamp, author 
	      FROM zvec_chunks 
	      WHERE beads_ids LIKE ? 
	      ORDER BY timestamp DESC`

	rows, err := z.DB.Queryx(q, searchStr)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var r struct {
			ChunkID    string  `db:"chunk_id"`
			SourceType string  `db:"source_type"`
			SourceRef  string  `db:"source_ref"`
			BeadsIDs   string  `db:"beads_ids"`
			Content    string  `db:"content"`
			Score      float64 `db:"score"`
			Timestamp  string  `db:"timestamp"`
			Author     string  `db:"author"`
		}
		if err := rows.StructScan(&r); err != nil {
			return nil, err
		}

		var beadsIDs []string
		if r.BeadsIDs != "" {
			json.Unmarshal([]byte(r.BeadsIDs), &beadsIDs)
		}

		results = append(results, ZvecSearchResult{
			ChunkID:    r.ChunkID,
			SourceType: r.SourceType,
			SourceRef:  r.SourceRef,
			BeadsIDs:   beadsIDs,
			Content:    r.Content,
			Score:      r.Score,
			Timestamp:  r.Timestamp,
			Author:     r.Author,
		})
	}
	return results, nil
}

// UpsertChunk adds or updates a chunk in the vector database.
func (z *ZvecDB) UpsertChunk(chunk ZvecSearchResult) error {
	beadsJson, _ := json.Marshal(chunk.BeadsIDs)

	q := `INSERT OR REPLACE INTO zvec_chunks 
	      (chunk_id, source_type, source_ref, beads_ids, content, score, timestamp, author) 
	      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

	_, err := z.DB.Exec(q,
		chunk.ChunkID,
		chunk.SourceType,
		chunk.SourceRef,
		string(beadsJson),
		chunk.Content,
		chunk.Score,
		chunk.Timestamp,
		chunk.Author,
	)
	return err
}

// DetectBeadsIDs scans text for br-xxx and bd-xxx patterns.
func DetectBeadsIDs(text string) []string {
	// Patterns: br-xxx, bd-xxx, and handle potential trailing punctuation
	re := regexp.MustCompile(`\b(br-[a-zA-Z0-9.-]+|bd-[a-zA-Z0-9]+)\b`)
	matches := re.FindAllString(text, -1)

	// Deduplicate and clean
	unique := make(map[string]bool)
	var result []string
	for _, m := range matches {
		m = strings.TrimRight(m, ".,;:")
		if !unique[m] {
			unique[m] = true
			result = append(result, m)
		}
	}
	return result
}

// GenerateChunkID creates a unique ID for a chunk based on its content and source.
func GenerateChunkID(sourceRef, content string) string {
	hash := sha256.Sum256([]byte(sourceRef + content))
	return fmt.Sprintf("zvec-%x", hash[:8])
}
