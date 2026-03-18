#!/usr/bin/env python3
"""
PostToolUse hook — checks page.tsx for state completeness and accessibility.
Warns (does not block) since PostToolUse cannot undo writes.

Exit codes:
  0 = always (PostToolUse can only provide feedback, not block)
"""
import json
import re
import sys
from pathlib import Path


REQUIRED_STATES = ["default", "loading", "error", "empty"]


def main():
    hook_input = json.load(sys.stdin)
    file_path = hook_input.get("tool_input", {}).get("file_path", "")

    # Only check page.tsx in design-system
    if not file_path.endswith("page.tsx"):
        sys.exit(0)
    if "design-system" not in file_path:
        sys.exit(0)

    path = Path(file_path)
    if not path.exists():
        sys.exit(0)

    content = path.read_text()
    warnings = []

    # --- CHECK 1: Required data-state attributes ---
    missing_states = []
    for state in REQUIRED_STATES:
        patterns = [
            f'data-state="{state}"',
            f"data-state=`{state}`",
            f"'{state}'",
            f'"{state}"',
        ]
        if not any(p in content for p in patterns):
            missing_states.append(state)

    if missing_states:
        warnings.append(
            f"Missing data-state implementations: {', '.join(missing_states)}\n"
            "  Each screen requires all 4 states: default, loading, error, empty."
        )

    # --- CHECK 2: Accessibility minimums ---
    a11y_issues = []
    if 'role="main"' not in content and "<main" not in content:
        a11y_issues.append("Missing <main> or role=\"main\" landmark")

    if "aria-label" not in content and "aria-labelledby" not in content:
        a11y_issues.append("No aria-label or aria-labelledby attributes")

    if "aria-live" not in content:
        a11y_issues.append("No aria-live region for dynamic content updates")

    heading_count = len(re.findall(r"<h[1-3]", content))
    if heading_count == 0:
        a11y_issues.append("No heading tags (<h1>, <h2>, <h3>)")

    if a11y_issues:
        issues_str = "\n  ".join(f"❌ {issue}" for issue in a11y_issues)
        warnings.append(f"Accessibility issues:\n  {issues_str}")

    # --- CHECK 3: DS token usage ---
    var_count = len(re.findall(r"var\(--", content))
    if var_count < 5:
        warnings.append(
            f"Only {var_count} CSS custom property references (expected ≥5 for DS compliance)."
        )

    # Print all warnings
    if warnings:
        print("POST-WRITE QUALITY CHECK:", file=sys.stderr)
        for i, warning in enumerate(warnings, 1):
            print(f"\n  ⚠️  {i}. {warning}", file=sys.stderr)

    sys.exit(0)


if __name__ == "__main__":
    main()
