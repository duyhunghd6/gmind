#!/usr/bin/env python3
"""
PreToolUse hook — validates wideframe ASCII file format.
Blocks writes of .wideframe.ascii.md files that use tree-indent instead of box-grid.

Exit codes:
  0 = PASS (allow the write)
  2 = BLOCK (reject the write, stderr sent as feedback to agent)
"""
import json
import re
import sys


def main():
    hook_input = json.load(sys.stdin)
    file_path = hook_input.get("tool_input", {}).get("file_path", "")
    content = hook_input.get("tool_input", {}).get("content", "")

    # Only check .wideframe.ascii.md files
    if not file_path.endswith(".wideframe.ascii.md"):
        sys.exit(0)

    lines = content.split("\n")

    # --- CHECK 1: Must contain box-grid characters ---
    # Box-grid = +---+, +===+, or | ... | pipe-bordered lines
    # NOT tree-indent chars (├── └── │)
    box_border_pattern = re.compile(r"[+][─\-=]{2,}[+]|^\s*\|.*\|", re.MULTILINE)
    box_lines = len(box_border_pattern.findall(content))

    if box_lines < 3:
        print(
            f"BLOCKED: Wideframe '{file_path}' has only {box_lines} box-grid lines (minimum 3).\n"
            "\n"
            "WIDEFRAME files MUST use spatial box-grid layout:\n"
            "  +===========================+\n"
            "  | [Logo]  [Search___]  [☰]  |\n"
            "  +===========================+\n"
            "  | NAV  | +------+ +------+  |\n"
            "  | Home | | KPI  | | KPI  |  |\n"
            "  +------+--------------------+\n"
            "\n"
            "Tree-indent format (├── └──) belongs in .tree.ascii.md files.",
            file=sys.stderr,
        )
        sys.exit(2)

    # --- CHECK 2: Must NOT be mostly tree-indent ---
    tree_pattern = re.compile(r"^\s*[├└│┌]──")
    tree_lines = sum(1 for line in lines if tree_pattern.search(line))

    if tree_lines > box_lines and box_lines < 5:
        print(
            f"BLOCKED: Wideframe '{file_path}' has {tree_lines} tree-indent lines "
            f"but only {box_lines} box-grid lines.\n"
            "This is a hierarchy tree, not a spatial wideframe.\n"
            "Rewrite using box-grid layout (+---+, |...|) showing spatial positioning.",
            file=sys.stderr,
        )
        sys.exit(2)

    # --- CHECK 3: Should have width/proportion annotations ---
    annotation_pattern = re.compile(r"\[\d+%\]|\[flex\]|\(\d+px\)")
    annotation_count = sum(1 for line in lines if annotation_pattern.search(line))

    if annotation_count == 0:
        print(
            "WARNING: Wideframe has no width annotations ([60%], [40%], (16px)).\n"
            "Consider adding column/row proportions for clarity.",
            file=sys.stderr,
        )

    sys.exit(0)


if __name__ == "__main__":
    main()
