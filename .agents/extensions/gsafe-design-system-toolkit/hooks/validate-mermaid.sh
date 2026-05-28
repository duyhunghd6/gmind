#!/usr/bin/env bash

# Read JSON from stdin
input=$(cat)
tool_name=$(echo "$input" | jq -r '.tool_name // ""')
file_path=$(echo "$input" | jq -r '.tool_input.file_path // ""')

# We only care about replace and write_file on .md files
if [[ "$tool_name" != "replace" && "$tool_name" != "write_file" ]]; then
  echo '{"decision": "allow"}'
  exit 0
fi

if [[ "$file_path" != *.md ]]; then
  echo '{"decision": "allow"}'
  exit 0
fi

# 1. First run the project's standard mermaid validator
validation_output=$(python3 "$GEMINI_PROJECT_DIR/.claude/skills/design-system-ralph-loop/scripts/validate_mermaid_markdown.py" "$file_path" 2>&1)
exit_code=$?

# We need to parse out actual block errors, ignoring standalone_mmd_files errors
# because standalone_mmd_files checks the whole directory, not just the file_path we passed.
# Let's extract errors specific to the file.
file_errors=$(echo "$validation_output" | jq -r '.results[] | select(.path == "'"$file_path"'") | .errors | join(", ")' 2>/dev/null)

if [ "$file_errors" != "" ] && [ "$file_errors" != "null" ]; then
  echo "Mermaid validation error in $file_path: $file_errors" >&2
  cat <<EOF
{
  "decision": "deny",
  "reason": "Mermaid syntax error detected in $file_path: $file_errors. Please fix the syntax.",
  "systemMessage": "🚨 Mermaid syntax error prevented in $file_path"
}
EOF
  exit 0
fi

# 2. Check for Mermaid 10.9.6 specific syntax errors not caught by local mmdc v11
# specifically `direction [A-Z]+` inside `subgraph`
if awk '/subgraph/,/end/' "$file_path" | grep -qE '^[[:space:]]*direction [A-Z]+'; then
  echo "Mermaid strict v10.9.6 error detected: direction inside subgraph" >&2
  cat <<EOF
{
  "decision": "deny",
  "reason": "Mermaid syntax error detected in $file_path: 'direction' directives inside 'subgraph' blocks are not supported by the strict browser parser (v10.9.6). Please remove them.",
  "systemMessage": "🚨 Mermaid strict syntax error prevented in $file_path"
}
EOF
  exit 0
fi

echo '{"decision": "allow"}'
exit 0
