package storage

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

// IndexMarkdownDocs scans the docs directory for markdown files.
func (db *SQLiteDB) IndexMarkdownDocs(zvec *ZvecDB, force bool) error {
	sourceType := "markdown-doc"
	lastIndexed, _, _ := db.GetWatermark(sourceType)

	fmt.Printf("Indexing %s (Last: %s, Force: %v)...\n", sourceType, lastIndexed, force)

	count := 0
	directories := []string{"docs", "meetings"}

	for _, dir := range directories {
		// Only walk if the directory exists
		if _, err := os.Stat(dir); os.IsNotExist(err) {
			continue
		}

		err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return nil
			}
			if info.IsDir() || filepath.Ext(path) != ".md" {
				return nil
			}

			// Incremental: check mod time
			if !force && lastIndexed != "" {
				lastTime, err := time.Parse(time.RFC3339, lastIndexed)
				if err == nil && info.ModTime().Before(lastTime) {
					return nil
				}
			}

			content, err := os.ReadFile(path)
			if err != nil {
				return nil
			}

			// Semantic chunking: parse Markdown blocks by beads-id metadata markers
			chunks := splitMarkdownByBeadsID(string(content))
			for i, c := range chunks {
				chunkID := GenerateChunkID(path, c)
				beadsIDs := DetectBeadsIDs(c)

				zvec.UpsertChunk(ZvecSearchResult{
					ChunkID:    chunkID,
					SourceType: sourceType,
					SourceRef:  fmt.Sprintf("file:%s:chunk-%d", path, i),
					BeadsIDs:   beadsIDs,
					Content:    c,
					Timestamp:  info.ModTime().Format(time.RFC3339),
				})
				count++
			}
			return nil
		})
		if err != nil {
			fmt.Printf("Error walking %s: %v\n", dir, err)
		}
	}

	db.UpdateWatermark(sourceType, time.Now().Format(time.RFC3339), count)
	return nil
}

// IndexGitCommits indexes new git commits since last watermark.
func (db *SQLiteDB) IndexGitCommits(zvec *ZvecDB, force bool) error {
	sourceType := "git-commit"
	lastHash, _, _ := db.GetWatermark(sourceType)

	fmt.Printf("Indexing %s (Last: %s, Force: %v)...\n", sourceType, lastHash, force)

	root, err := FindRootDir()
	if err != nil {
		return err
	}

	rangeArg := "HEAD"
	if !force && lastHash != "" {
		rangeArg = lastHash + "..HEAD"
	}

	// Format: hash|timestamp|author|subject\nbody---ENDCOMMIT---
	cmd := exec.Command("git", "log", rangeArg, "--format=%H|%at|%an|%s%n%b---ENDCOMMIT---")
	cmd.Dir = root
	out, err := cmd.Output()
	if err != nil {
		if strings.Contains(err.Error(), "fatal: bad revision") {
			// Fallback to all commits if hash not found
			cmd = exec.Command("git", "log", "--format=%H|%at|%an|%s%n%b---ENDCOMMIT---")
			cmd.Dir = root
			out, err = cmd.Output()
			if err != nil {
				return err
			}
		} else {
			return err
		}
	}

	raw := string(out)
	if raw == "" {
		return nil
	}

	commits := strings.Split(raw, "---ENDCOMMIT---")
	count := 0
	latestHash := ""

	for _, rawCommit := range commits {
		rawCommit = strings.TrimSpace(rawCommit)
		if rawCommit == "" {
			continue
		}

		parts := strings.SplitN(rawCommit, "|", 4)
		if len(parts) < 4 {
			continue
		}

		hash := parts[0]
		tsStr := parts[1]
		author := parts[2]
		content := parts[3]

		if latestHash == "" {
			latestHash = hash
		}

		tsInt := time.Now().Unix()
		fmt.Sscanf(tsStr, "%d", &tsInt)
		timestamp := time.Unix(tsInt, 0).Format(time.RFC3339)

		beadsIDs := DetectBeadsIDs(content)

		zvec.UpsertChunk(ZvecSearchResult{
			ChunkID:    "commit-" + hash,
			SourceType: sourceType,
			SourceRef:  "commit:" + hash,
			BeadsIDs:   beadsIDs,
			Content:    content,
			Timestamp:  timestamp,
			Author:     author,
		})
		count++
	}

	if latestHash != "" {
		db.UpdateWatermark(sourceType, latestHash, count)
	}

	return nil
}

// IndexGitHubPRs indexes GitHub PR descriptions and comments.
func (db *SQLiteDB) IndexGitHubPRs(zvec *ZvecDB, force bool) error {
	sourceType := "pr-description"
	lastUpdated, _, _ := db.GetWatermark(sourceType)

	fmt.Printf("Indexing %s (Last: %s, Force: %v)...\n", sourceType, lastUpdated, force)

	root, err := FindRootDir()
	if err != nil {
		return err
	}

	// Use gh pr list to get all PRs
	args := []string{"pr", "list", "--state", "all", "--limit", "1000", "--json", "number,title,body,updatedAt,author"}
	cmd := exec.Command("gh", args...)
	cmd.Dir = root
	out, err := cmd.Output()
	if err != nil {
		return fmt.Errorf("failed to list PRs via gh CLI: %w", err)
	}

	var prs []struct {
		Number    int    `json:"number"`
		Title     string `json:"title"`
		Body      string `json:"body"`
		UpdatedAt string `json:"updatedAt"`
		Author    struct {
			Login string `json:"login"`
		} `json:"author"`
	}

	if err := json.Unmarshal(out, &prs); err != nil {
		return fmt.Errorf("failed to parse gh output: %w", err)
	}

	count := 0
	latestUpdate := lastUpdated

	for _, pr := range prs {
		// Incremental: check updated at
		if !force && lastUpdated != "" && pr.UpdatedAt <= lastUpdated {
			continue
		}

		if pr.UpdatedAt > latestUpdate {
			latestUpdate = pr.UpdatedAt
		}

		// 1. Index PR Description
		content := fmt.Sprintf("PR #%d: %s\n\n%s", pr.Number, pr.Title, pr.Body)
		beadsIDs := DetectBeadsIDs(content)

		zvec.UpsertChunk(ZvecSearchResult{
			ChunkID:    fmt.Sprintf("pr-%d", pr.Number),
			SourceType: sourceType,
			SourceRef:  fmt.Sprintf("github:pr:%d", pr.Number),
			BeadsIDs:   beadsIDs,
			Content:    content,
			Timestamp:  pr.UpdatedAt,
			Author:     pr.Author.Login,
		})
		count++

		// 2. Index PR Comments
		commentArgs := []string{"pr", "view", fmt.Sprintf("%d", pr.Number), "--json", "comments"}
		cmdComments := exec.Command("gh", commentArgs...)
		cmdComments.Dir = root
		outComments, err := cmdComments.Output()
		if err == nil {
			var commentsData struct {
				Comments []struct {
					Author struct {
						Login string `json:"login"`
					} `json:"author"`
					Body      string `json:"body"`
					CreatedAt string `json:"createdAt"`
				} `json:"comments"`
			}
			if err := json.Unmarshal(outComments, &commentsData); err == nil {
				for i, comment := range commentsData.Comments {
					cBeadsIDs := DetectBeadsIDs(comment.Body)
					zvec.UpsertChunk(ZvecSearchResult{
						ChunkID:    fmt.Sprintf("pr-%d-comment-%d", pr.Number, i),
						SourceType: "pr-comment",
						SourceRef:  fmt.Sprintf("github:pr:%d:comment-%d", pr.Number, i),
						BeadsIDs:   cBeadsIDs,
						Content:    comment.Body,
						Timestamp:  comment.CreatedAt,
						Author:     comment.Author.Login,
					})
					count++
				}
			}
		}
	}

	if latestUpdate != lastUpdated {
		db.UpdateWatermark(sourceType, latestUpdate, count)
	}

	return nil
}

// IndexRTEApprovals indexes RTE escalation and approval metadata.
func (db *SQLiteDB) IndexRTEApprovals(zvec *ZvecDB, force bool) error {
	sourceType := "rte-approval"
	lastIndexed, _, _ := db.GetWatermark(sourceType)

	fmt.Printf("Indexing %s (Last: %s, Force: %v)...\n", sourceType, lastIndexed, force)

	var metadata []struct {
		ID         string `db:"id"`
		Status     string `db:"status"`
		Risk       string `db:"risk"`
		Resolution string `db:"resolution"`
		ApprovedAt string `db:"approved_at"`
		ApprovedBy string `db:"approved_by"`
	}

	query := "SELECT id, status, risk, resolution, approved_at, approved_by FROM rte_metadata"
	err := db.GmindDB.Select(&metadata, query)
	if err != nil {
		return fmt.Errorf("failed to query rte_metadata: %w", err)
	}

	count := 0
	for _, m := range metadata {
		content := fmt.Sprintf("RTE Discussion for %s\nStatus: %s\nRisk: %s\nResolution: %s", m.ID, m.Status, m.Risk, m.Resolution)
		beadsIDs := DetectBeadsIDs(content)
		if !contains(beadsIDs, m.ID) {
			beadsIDs = append(beadsIDs, m.ID)
		}

		zvec.UpsertChunk(ZvecSearchResult{
			ChunkID:    "rte-" + m.ID,
			SourceType: sourceType,
			SourceRef:  "sqlite:rte_metadata:" + m.ID,
			BeadsIDs:   beadsIDs,
			Content:    content,
			Timestamp:  m.ApprovedAt,
			Author:     m.ApprovedBy,
		})
		count++
	}

	if count > 0 {
		db.UpdateWatermark(sourceType, time.Now().Format(time.RFC3339), count)
	}

	return nil
}

// IndexCILogs indexes GitHub Action run logs.
func (db *SQLiteDB) IndexCILogs(zvec *ZvecDB, force bool) error {
	sourceType := "ci-log"
	lastRunID, _, _ := db.GetWatermark(sourceType)

	fmt.Printf("Indexing %s (Last: %s, Force: %v)...\n", sourceType, lastRunID, force)

	root, err := FindRootDir()
	if err != nil {
		return err
	}

	// List recent runs
	args := []string{"run", "list", "--limit", "10", "--json", "databaseId,status,conclusion,updatedAt"}
	cmd := exec.Command("gh", args...)
	cmd.Dir = root
	out, err := cmd.Output()
	if err != nil {
		return fmt.Errorf("failed to list CI runs: %w", err)
	}

	var runs []struct {
		ID         int    `json:"databaseId"`
		Status     string `json:"status"`
		Conclusion string `json:"conclusion"`
		UpdatedAt  string `json:"updatedAt"`
	}

	if err := json.Unmarshal(out, &runs); err != nil {
		return err
	}

	count := 0
	latestRunID := lastRunID

	for _, run := range runs {
		runIDStr := fmt.Sprintf("%d", run.ID)
		if !force && lastRunID != "" && runIDStr <= lastRunID {
			continue
		}

		if runIDStr > latestRunID {
			latestRunID = runIDStr
		}

		// Fetch log
		logArgs := []string{"run", "view", runIDStr, "--log"}
		logCmd := exec.Command("gh", logArgs...)
		logCmd.Dir = root
		logOut, err := logCmd.Output()
		if err != nil {
			continue
		}

		content := string(logOut)
		// Adaptive chunking for logs: 1000 chars
		chunks := splitContentWithOverlap(content, 1000, 100)
		for i, c := range chunks {
			beadsIDs := DetectBeadsIDs(c)
			zvec.UpsertChunk(ZvecSearchResult{
				ChunkID:    fmt.Sprintf("ci-run-%d-chunk-%d", run.ID, i),
				SourceType: sourceType,
				SourceRef:  fmt.Sprintf("github:run:%d", run.ID),
				BeadsIDs:   beadsIDs,
				Content:    c,
				Timestamp:  run.UpdatedAt,
				Author:     "github-actions",
			})
			count++
		}
	}

	if latestRunID != lastRunID {
		db.UpdateWatermark(sourceType, latestRunID, count)
	}

	return nil
}

// IndexAgentTraces indexes agent trace files.
func (db *SQLiteDB) IndexAgentTraces(zvec *ZvecDB, force bool) error {
	sourceType := "agent-trace"
	lastIndexed, _, _ := db.GetWatermark(sourceType)

	fmt.Printf("Indexing %s (Last: %s, Force: %v)...\n", sourceType, lastIndexed, force)

	root, err := FindRootDir()
	if err != nil {
		return err
	}

	traceDir := filepath.Join(root, "docs", "design", "pipeline-state")
	count := 0
	latestTime := lastIndexed

	err = filepath.Walk(traceDir, func(path string, info os.FileInfo, err error) error {
		if err != nil || info.IsDir() || filepath.Ext(path) != ".json" {
			return nil
		}

		modTime := info.ModTime().Format(time.RFC3339)
		if !force && lastIndexed != "" && modTime <= lastIndexed {
			return nil
		}

		if modTime > latestTime {
			latestTime = modTime
		}

		content, err := os.ReadFile(path)
		if err != nil {
			return nil
		}

		chunks := splitContentWithOverlap(string(content), 2000, 200)
		for i, c := range chunks {
			beadsIDs := DetectBeadsIDs(c)
			zvec.UpsertChunk(ZvecSearchResult{
				ChunkID:    GenerateChunkID(path, c),
				SourceType: sourceType,
				SourceRef:  fmt.Sprintf("file:%s:chunk-%d", path, i),
				BeadsIDs:   beadsIDs,
				Content:    c,
				Timestamp:  modTime,
				Author:     "agent",
			})
			count++
		}
		return nil
	})

	if err == nil && latestTime != lastIndexed {
		db.UpdateWatermark(sourceType, latestTime, count)
	}
	return err
}

// IndexPipelineLogs scans for pipeline-log.jsonl files and indexes them.
func (db *SQLiteDB) IndexPipelineLogs(zvec *ZvecDB, force bool) error {
	sourceType := "pipeline-log"
	lastIndexed, _, _ := db.GetWatermark(sourceType)

	fmt.Printf("Indexing %s (Last: %s, Force: %v)...\n", sourceType, lastIndexed, force)

	root, err := FindRootDir()
	if err != nil {
		return err
	}

	count := 0
	err = filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return nil
		}
		if info.IsDir() || !strings.HasSuffix(path, "pipeline-log.jsonl") {
			return nil
		}

		// Incremental: check mod time
		if !force && lastIndexed != "" {
			lastTime, err := time.Parse(time.RFC3339, lastIndexed)
			if err == nil && info.ModTime().Before(lastTime) {
				return nil
			}
		}

		content, err := os.ReadFile(path)
		if err != nil {
			return nil
		}

		lines := strings.Split(string(content), "\n")
		for i, line := range lines {
			line = strings.TrimSpace(line)
			if line == "" {
				continue
			}

			var entry map[string]interface{}
			if err := json.Unmarshal([]byte(line), &entry); err != nil {
				continue
			}

			// Extract timestamp
			ts := info.ModTime().Format(time.RFC3339)
			if val, ok := entry["ts"].(string); ok {
				ts = val
			} else if val, ok := entry["timestamp"].(string); ok {
				ts = val
			}

			// Extract author/agent
			author := "system"
			if val, ok := entry["agent"].(string); ok {
				author = val
			}

			beadsIDs := DetectBeadsIDs(line)
			zvec.UpsertChunk(ZvecSearchResult{
				ChunkID:    GenerateChunkID(path, line),
				SourceType: sourceType,
				SourceRef:  fmt.Sprintf("file:%s:line-%d", path, i),
				BeadsIDs:   beadsIDs,
				Content:    line,
				Timestamp:  ts,
				Author:     author,
			})
			count++
		}
		return nil
	})

	if err == nil {
		db.UpdateWatermark(sourceType, time.Now().Format(time.RFC3339), count)
	}
	return err
}

func splitContentWithOverlap(content string, size int, overlap int) []string {
	if len(content) == 0 {
		return nil
	}
	if overlap >= size {
		overlap = size / 2
	}

	var chunks []string
	start := 0
	for {
		end := start + size
		if end > len(content) {
			end = len(content)
		}
		chunks = append(chunks, content[start:end])
		if end == len(content) {
			break
		}
		start = end - overlap
		if start < 0 {
			start = 0
		}
		// Safety check to prevent infinite loop if start doesn't advance
		if start >= end && end < len(content) {
			start = end
		}
	}
	return chunks
}

func splitContent(content string, size int) []string {
	return splitContentWithOverlap(content, size, 0)
}

func contains(slice []string, val string) bool {
	for _, item := range slice {
		if item == val {
			return true
		}
	}
	return false
}

func splitMarkdownByBeadsID(content string) []string {
	if len(content) == 0 {
		return nil
	}

	lines := strings.Split(content, "\n")
	var chunks []string
	var currentChunk strings.Builder

	inYAML := false
	yamlCount := 0

	for i, line := range lines {
		isMarker := false
		if strings.HasPrefix(line, "---") && (i == 0 || yamlCount > 0) {
			if yamlCount == 0 {
				isMarker = true
				yamlCount++
				inYAML = true
			} else if inYAML {
				yamlCount++
				inYAML = false
			}
		}

		if !isMarker && !inYAML && strings.Contains(strings.ToLower(line), "<!--") && strings.Contains(strings.ToLower(line), "beads-id:") {
			isMarker = true
		}

		if isMarker && currentChunk.Len() > 0 {
			chunks = append(chunks, currentChunk.String())
			currentChunk.Reset()
		}

		currentChunk.WriteString(line + "\n")
	}

	if currentChunk.Len() > 0 {
		chunks = append(chunks, currentChunk.String())
	}

	var finalChunks []string
	for _, c := range chunks {
		if strings.TrimSpace(c) != "" {
			if len(c) > 8000 {
				finalChunks = append(finalChunks, splitContentWithOverlap(c, 2000, 250)...)
			} else {
				finalChunks = append(finalChunks, c)
			}
		}
	}

	return finalChunks
}
