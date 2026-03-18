#!/usr/bin/env python3
"""
PreToolUse Hook: validate_output_completeness.py
Blocks writes containing placeholder patterns that indicate lazy/incomplete output.
Applies to: .tsx, .ts, .jsx, .js, .css files

Exit codes:
  0 = PASS (no placeholders found)
  2 = BLOCK (placeholder patterns detected — agent must write complete code)
"""
import json
import re
import sys

def main():
    try:
        hook_input = json.loads(sys.stdin.read())
    except (json.JSONDecodeError, EOFError):
        sys.exit(0)

    tool_input = hook_input.get("tool_input", {})
    file_path = tool_input.get("file_path", "")
    content = tool_input.get("content", "")

    # Only check code files
    code_extensions = (".tsx", ".ts", ".jsx", ".js", ".css")
    if not any(file_path.endswith(ext) for ext in code_extensions):
        sys.exit(0)

    # --- Banned placeholder patterns ---
    banned_patterns = [
        (r'//\s*\.\.\.', '// ...'),
        (r'//\s*rest of (code|component|file|implementation)', '// rest of ...'),
        (r'//\s*TODO(?!\()', '// TODO'),
        (r'//\s*implement here', '// implement here'),
        (r'//\s*similar to above', '// similar to above'),
        (r'//\s*continue pattern', '// continue pattern'),
        (r'//\s*add more as needed', '// add more as needed'),
        (r'/\*\s*\.\.\.\s*\*/', '/* ... */'),
        (r'//\s*remaining\s+(items|components|elements)', '// remaining ...'),
    ]

    violations = []
    lines = content.split('\n')
    for i, line in enumerate(lines, 1):
        for pattern, label in banned_patterns:
            if re.search(pattern, line, re.IGNORECASE):
                violations.append(f"  Line {i}: '{line.strip()}' → banned pattern: {label}")

    if violations:
        result = {
            "decision": "block",
            "reason": (
                f"OUTPUT_INCOMPLETE: {len(violations)} placeholder pattern(s) found in {file_path}.\n"
                "You MUST write complete code. No shortcuts, no placeholders.\n"
                "Fix these before writing:\n" +
                "\n".join(violations[:10])  # Cap at 10 to avoid huge output
            )
        }
        print(json.dumps(result))
        sys.exit(2)

    sys.exit(0)

if __name__ == "__main__":
    main()
