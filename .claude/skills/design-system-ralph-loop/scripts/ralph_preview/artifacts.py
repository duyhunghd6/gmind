"""Load sibling SSOT artifacts from the contract directory."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .markdown import safe_read, extract_beads_ids, extract_mermaid_blocks

MARKDOWN_ARTIFACTS = [
    "flow.md",
    "review-diagrams.md",
    "prd-ds-conflicts.md",
    "assertion-checklist.md",
]

JSON_ARTIFACTS = [
    "storyboards.json",
    "layout-rules.json",
    "component-map.json",
    "artifact-index.json",
]


def _status(exists: bool, parse_ok: bool | None, error: str | None) -> dict[str, Any]:
    return {"exists": exists, "parse_ok": parse_ok, "error": error}


def load_markdown_artifact(path: Path) -> dict[str, Any]:
    """Load a markdown artifact, extract beads IDs and mermaid blocks."""
    text, err = safe_read(path)
    if text is None:
        return {"status": _status(False, None, err), "beads_ids": [], "mermaid_blocks": [], "line_count": 0}
    return {
        "status": _status(True, True, None),
        "beads_ids": extract_beads_ids(text),
        "mermaid_blocks": extract_mermaid_blocks(text),
        "line_count": len(text.splitlines()),
    }


def load_json_artifact(path: Path) -> dict[str, Any]:
    """Load a JSON artifact, return parsed data and status."""
    text, err = safe_read(path)
    if text is None:
        return {"status": _status(False, None, err), "data": None, "size_bytes": 0}
    try:
        data = json.loads(text)
        return {"status": _status(True, True, None), "data": data, "size_bytes": len(text.encode("utf-8"))}
    except json.JSONDecodeError as exc:
        return {"status": _status(True, False, str(exc)), "data": None, "size_bytes": len(text.encode("utf-8"))}


def load_all_artifacts(contract_dir: Path) -> dict[str, Any]:
    """Load all sibling SSOT artifacts. Returns {name: {status, ...}}."""
    result: dict[str, Any] = {}

    for name in MARKDOWN_ARTIFACTS:
        path = contract_dir / name
        result[name] = {"type": "markdown", "path": str(path), **load_markdown_artifact(path)}

    # Check for review-diagrams/*.md split files
    rd_dir = contract_dir / "review-diagrams"
    if rd_dir.is_dir():
        split_files = sorted(rd_dir.glob("*.md"))
        if split_files:
            split_data: list[dict[str, Any]] = []
            for sf in split_files:
                entry = {"path": str(sf), "name": sf.name, **load_markdown_artifact(sf)}
                split_data.append(entry)
            result["review-diagrams-split"] = {"type": "markdown_split", "files": split_data}

    for name in JSON_ARTIFACTS:
        path = contract_dir / name
        result[name] = {"type": "json", "path": str(path), **load_json_artifact(path)}

    return result


def collect_artifact_warnings(artifacts: dict[str, Any]) -> list[str]:
    """Gather warnings from artifact loading."""
    warnings: list[str] = []
    for name, info in artifacts.items():
        status = info.get("status", {})
        if not status.get("exists"):
            if name in ("assertion-checklist.md", "artifact-index.json"):
                continue  # optional artifacts
            warnings.append(f"Missing artifact: {name}")
        elif not status.get("parse_ok"):
            warnings.append(f"Parse error in {name}: {status.get('error', 'unknown')}")
    return warnings
