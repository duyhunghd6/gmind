#!/usr/bin/env python3
"""
PreToolUse hook — validates user flow ASCII format.
Blocks writes of user flow files that use linear chains instead of connected screens.

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

    # Only check user flow files
    if "user-flow" not in file_path and "user_flow" not in file_path:
        sys.exit(0)
    if not file_path.endswith(".md"):
        sys.exit(0)

    lines = content.split("\n")

    # --- CHECK 1: Must contain connected-screen arrows ---
    arrow_pattern = re.compile(r"──[►>→]|──\[.*?\]──|----->|=====>|──────")
    arrow_count = sum(1 for line in lines if arrow_pattern.search(line))

    if arrow_count < 1:
        print(
            f"BLOCKED: User flow '{file_path}' has NO connected-screen arrows.\n"
            "\n"
            "User flows MUST show multiple screens connected by labeled arrows:\n"
            "\n"
            "  +================+       +================+\n"
            "  | Dashboard      | click | Detail View    |\n"
            '  | +----+ +----+  |------>| Title: PRD-04  |\n'
            "  | |KPI | |KPI |  |       | § Summary      |\n"
            "  | +----+ +----+  |       |   [Approve]    |\n"
            "  +================+       +================+\n"
            "\n"
            "Do NOT use linear chains like: [A] → [B] → [C]",
            file=sys.stderr,
        )
        sys.exit(2)

    # --- CHECK 2: Must contain multiple screen boxes ---
    box_pattern = re.compile(r"[+═]{3,}|[╔╗╚╝]")
    screen_boxes = sum(1 for line in lines if box_pattern.search(line))

    if screen_boxes < 4:
        print(
            f"WARNING: User flow has only {screen_boxes} box borders "
            "(expected ≥4 for 2+ screens).\n"
            "Each screen should be drawn as a miniature wireframe with box borders.",
            file=sys.stderr,
        )

    # --- CHECK 3: Should have return paths ---
    return_pattern = re.compile(r"◄|<──|<----|←|\[back\]|\[close\]|\[cancel\]")
    return_arrows = sum(1 for line in lines if return_pattern.search(line))

    if return_arrows == 0:
        print(
            "WARNING: No return paths detected (back, close, cancel arrows).\n"
            "User flows should show bidirectional navigation where applicable.",
            file=sys.stderr,
        )

    sys.exit(0)


if __name__ == "__main__":
    main()
