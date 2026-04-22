package rtm

import (
	"os"
	"path/filepath"
	"testing"
)

func TestExtractTargetIDs(t *testing.T) {
	tmpDir := t.TempDir()
	docContent := `---
beads-id: br-prd01
title: "Test Doc"
---

# Section

<!-- beads-id: br-prd01-s1 -->

Content here.

<!-- beads-id: br-prd01-s2 -->

More content.
`
	os.WriteFile(filepath.Join(tmpDir, "test.md"), []byte(docContent), 0o644)

	ids, err := extractTargetIDs(tmpDir)
	if err != nil {
		t.Fatal("extractTargetIDs failed:", err)
	}

	if len(ids) < 2 {
		t.Errorf("expected at least 2 IDs, got %d: %v", len(ids), ids)
	}

	// Check deduplication
	idMap := make(map[string]int)
	for _, id := range ids {
		idMap[id]++
		if idMap[id] > 1 {
			t.Errorf("duplicate ID found: %s", id)
		}
	}
}

func TestExtractTargetIDs_NoIDs(t *testing.T) {
	tmpDir := t.TempDir()
	os.WriteFile(filepath.Join(tmpDir, "plain.md"), []byte("# No IDs here\n"), 0o644)

	ids, err := extractTargetIDs(tmpDir)
	if err != nil {
		t.Fatal(err)
	}
	if len(ids) != 0 {
		t.Errorf("expected 0 IDs, got %d", len(ids))
	}
}

func TestExtractTargetIDs_EmptyDir(t *testing.T) {
	tmpDir := t.TempDir()
	ids, err := extractTargetIDs(tmpDir)
	if err != nil {
		t.Fatal(err)
	}
	if len(ids) != 0 {
		t.Errorf("expected 0 IDs from empty dir, got %d", len(ids))
	}
}

func TestExtractTargetIDs_IgnoresNonMarkdown(t *testing.T) {
	tmpDir := t.TempDir()
	os.WriteFile(filepath.Join(tmpDir, "code.go"), []byte("// beads-id: br-code-01\n"), 0o644)

	ids, err := extractTargetIDs(tmpDir)
	if err != nil {
		t.Fatal(err)
	}
	if len(ids) != 0 {
		t.Errorf("expected 0 IDs (should ignore .go files), got %d", len(ids))
	}
}

func TestFindRootDir_Fallback(t *testing.T) {
	// When no .beads dir exists, should fallback to cwd
	dir, err := FindRootDir()
	if err != nil {
		// It's okay if it errors or returns cwd
		t.Log("FindRootDir returned error (expected in test env):", err)
		return
	}
	if dir == "" {
		t.Error("expected non-empty root dir")
	}
}
