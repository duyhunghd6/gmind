#!/usr/bin/env python3
"""
PreToolUse hook — validates Design System token usage.
Blocks writes to .tsx/.css files containing hallucinated DS tokens.

Exit codes:
  0 = PASS (allow the write)
  2 = BLOCK (reject the write, stderr sent as feedback to agent)
"""
import json
import re
import sys

# These token names do NOT exist in the DS but LLMs frequently hallucinate them
HALLUCINATED_TOKENS = {
    "--bg-surface": "--surface or --bg",
    "--text-primary": "--text",
    "--text-secondary": "--text-dim",
    "--border-subtle": "--border",
    "--accent-primary": "--accent-cyan",
    "--text-on-accent": "--text (with context)",
    "--bg-card": "--surface",
    "--shadow-sm": "--shadow-card",
    "--shadow-md": "--shadow-card or --shadow-hero",
    "--shadow-lg": "--shadow-hero",
    "--color-primary": "--accent-cyan",
    "--color-secondary": "--accent-teal",
    "--color-accent": "--accent-cyan",
    "--color-error": "--red (DS semantic)",
    "--color-success": "--green (DS semantic)",
    "--color-warning": "--yellow (DS semantic)",
    "--font-size-sm": "--text-sm",
    "--font-size-md": "--text-base",
    "--font-size-lg": "--text-lg",
}


def main():
    hook_input = json.load(sys.stdin)
    file_path = hook_input.get("tool_input", {}).get("file_path", "")
    content = hook_input.get("tool_input", {}).get("content", "")

    # Only check .tsx and .css files
    if not (file_path.endswith(".tsx") or file_path.endswith(".css")):
        sys.exit(0)

    violations = []
    for bad_token, good_token in HALLUCINATED_TOKENS.items():
        pattern = f"var({bad_token})"
        count = content.count(pattern)
        if count > 0:
            violations.append((bad_token, good_token, count))

    if violations:
        total = sum(v[2] for v in violations)
        print(
            f"BLOCKED: '{file_path}' contains {total} hallucinated DS token(s):\n",
            file=sys.stderr,
        )
        for bad, good, count in violations:
            print(f"  ❌ var({bad}) used {count}× → use var({good})", file=sys.stderr)
        print(
            "\nUse REAL DS tokens. Run this to find the correct names:\n"
            "  grep -r 'var(--' packages/design-system/tokens/colors.css | head -20",
            file=sys.stderr,
        )
        sys.exit(2)

    # --- CHECK 2: Hardcoded colors in inline styles ---
    hex_in_styles = re.findall(
        r"style=.*?['\"].*?(#[0-9a-fA-F]{3,8})", content
    )
    if hex_in_styles:
        print(
            f"WARNING: '{file_path}' has {len(hex_in_styles)} hardcoded hex color(s) "
            f"in inline styles: {hex_in_styles[:3]}.\n"
            "Replace with var(--token-name) from the Design System.",
            file=sys.stderr,
        )

    sys.exit(0)


if __name__ == "__main__":
    main()
