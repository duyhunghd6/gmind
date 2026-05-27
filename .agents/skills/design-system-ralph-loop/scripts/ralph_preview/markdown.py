"""Markdown fenced-block extraction and beads-id scanning."""

from __future__ import annotations

import re
from typing import Any

FENCE_RE = re.compile(r"```(?P<lang>[\w-]+)\s*\n(?P<body>.*?)\n```", re.DOTALL)
BEADS_ID_RE = re.compile(r"<!--\s*beads-id:\s*(?P<id>[^\s>]+)\s*-->")
HEADING_RE = re.compile(r"^(?P<prefix>#{1,6})\s+(?P<text>.+)$", re.MULTILINE)


def extract_blocks(markdown: str) -> dict[str, list[str]]:
    """Return {lang_lower: [body, ...]} for all fenced code blocks."""
    result: dict[str, list[str]] = {}
    for match in FENCE_RE.finditer(markdown):
        lang = match.group("lang").lower()
        body = match.group("body").strip()
        result.setdefault(lang, []).append(body)
    return result


def extract_mermaid_blocks(markdown: str) -> list[dict[str, str]]:
    """Return list of {source, heading} for each mermaid fenced block."""
    blocks: list[dict[str, str]] = []
    lines = markdown.splitlines()
    current_heading = ""
    in_fence = False
    fence_lang = ""
    fence_lines: list[str] = []
    for line in lines:
        if not in_fence and line.startswith("#"):
            heading_match = HEADING_RE.match(line)
            if heading_match:
                current_heading = heading_match.group("text").strip()
        if line.startswith("```"):
            if not in_fence:
                in_fence = True
                fence_lang = line[3:].strip().lower()
                fence_lines = []
            else:
                in_fence = False
                if fence_lang == "mermaid":
                    blocks.append({
                        "source": "\n".join(fence_lines).strip(),
                        "heading": current_heading,
                    })
                fence_lang = ""
        elif in_fence:
            fence_lines.append(line)
    return blocks


def extract_beads_ids(markdown: str) -> list[str]:
    """Return all beads-id values found in HTML comments."""
    return [m.group("id") for m in BEADS_ID_RE.finditer(markdown)]


def fail(message: str) -> None:
    """Print error and exit — shared across modules."""
    import sys
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def require_yaml_block(blocks: dict[str, list[str]], context: str = "") -> str:
    """Require exactly one YAML/YML block, return its body."""
    yaml_blocks = blocks.get("yaml", []) + blocks.get("yml", [])
    label = f" in {context}" if context else ""
    if len(yaml_blocks) != 1:
        fail(f"expected exactly one YAML fenced block{label}, found {len(yaml_blocks)}")
    return yaml_blocks[0]


def require_mermaid_block(blocks: dict[str, list[str]], context: str = "") -> str:
    """Require exactly one Mermaid block, return its body."""
    mermaid_blocks = blocks.get("mermaid", [])
    label = f" in {context}" if context else ""
    if len(mermaid_blocks) != 1:
        fail(f"expected exactly one Mermaid fenced block{label}, found {len(mermaid_blocks)}")
    return mermaid_blocks[0]


def safe_read(path: Any) -> tuple[str | None, str | None]:
    """Read file text, return (text, None) or (None, error_message)."""
    from pathlib import Path
    p = Path(path)
    try:
        return p.read_text(encoding="utf-8"), None
    except Exception as exc:
        return None, str(exc)
