#!/usr/bin/env python3
"""Validate Mermaid diagrams embedded in Markdown files."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

FENCE_RE = re.compile(r"```(?P<lang>[\w-]+)\s*\n(?P<body>.*?)(?:\n```)", re.DOTALL)
SUPPORTED_DIAGRAM_TYPES = {
    "architecture-beta",
    "block-beta",
    "c4component",
    "c4container",
    "c4context",
    "c4deployment",
    "classdiagram",
    "classdiagram-v2",
    "erdiagram",
    "flowchart",
    "gantt",
    "gitgraph",
    "graph",
    "journey",
    "mindmap",
    "packet-beta",
    "pie",
    "quadrantchart",
    "requirementdiagram",
    "sequencediagram",
    "statediagram",
    "statediagram-v2",
    "timeline",
    "xychart-beta",
}
MERMAID_DIRECTIVE_RE = re.compile(r"^%%\{.*\}%%$")
MARKDOWN_BULLET_RE = re.compile(r"^\s*([-*+]\s+|\d+[.)]\s+)")
STATE_TRANSITION_LABEL_RE = re.compile(r"^\s*(?:\[\*\]|[\w.-]+)\s*-->\s*(?:\[\*\]|[\w.-]+)\s*:\s*(?P<label>.+?)\s*$")


@dataclass
class MermaidBlock:
    index: int
    source: str
    start_line: int


@dataclass
class FileResult:
    path: str
    mermaid_blocks: int = 0
    fixed: bool = False
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(2)


def line_number(markdown: str, offset: int) -> int:
    return markdown.count("\n", 0, offset) + 1


def extract_mermaid_blocks(markdown: str) -> list[MermaidBlock]:
    blocks: list[MermaidBlock] = []
    for match in FENCE_RE.finditer(markdown):
        lang = match.group("lang").lower()
        if lang != "mermaid":
            continue
        blocks.append(
            MermaidBlock(
                index=len(blocks) + 1,
                source=match.group("body"),
                start_line=line_number(markdown, match.start("body")),
            )
        )
    return blocks


def first_mermaid_line(source: str) -> str:
    for raw in source.splitlines():
        line = raw.strip()
        if not line or line.startswith("%%") or MERMAID_DIRECTIVE_RE.match(line):
            continue
        return line
    return ""


def diagram_type(line: str) -> str:
    first = line.split(None, 1)[0].rstrip(":")
    return first.lower()


def validate_state_diagram_labels(block: MermaidBlock) -> list[str]:
    errors: list[str] = []
    for offset, raw in enumerate(block.source.splitlines(), start=0):
        match = STATE_TRANSITION_LABEL_RE.match(raw)
        if not match:
            continue
        label = match.group("label")
        if ":" in label:
            actual_line = block.start_line + offset
            errors.append(
                f"block {block.index} line {actual_line} has a stateDiagram transition label containing ':'; "
                "Mermaid parses this as invalid state syntax. Move identifiers like ds:webui.* outside "
                "the transition label or replace ':' with safe text."
            )
    return errors


def validate_heuristics(block: MermaidBlock) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    source = block.source
    stripped = source.strip()

    if not stripped:
        return [f"block {block.index} at line {block.start_line} is empty"], warnings

    first = first_mermaid_line(source)
    first_type = diagram_type(first) if first else ""
    if not first:
        errors.append(f"block {block.index} at line {block.start_line} has no Mermaid diagram declaration")
    elif first_type not in SUPPORTED_DIAGRAM_TYPES:
        errors.append(
            f"block {block.index} at line {block.start_line} starts with unsupported Mermaid diagram type: {first!r}"
        )
    elif first_type == "statediagram-v2" and "direction LR" not in source:
        warnings.append(f"block {block.index} at line {block.start_line} uses stateDiagram-v2 but is missing 'direction LR' (recommended for vertical display)")

    if first_type in {"statediagram", "statediagram-v2"}:
        errors.extend(validate_state_diagram_labels(block))

    for offset, raw in enumerate(source.splitlines(), start=0):
        line = raw.strip()
        actual_line = block.start_line + offset
        if line.startswith("```"):
            errors.append(f"block {block.index} line {actual_line} contains nested code fence")
        if line.startswith("#"):
            errors.append(f"block {block.index} line {actual_line} contains Markdown heading syntax")
        if MARKDOWN_BULLET_RE.match(raw):
            errors.append(f"block {block.index} line {actual_line} contains Markdown bullet/list syntax")
        if "\t" in raw:
            warnings.append(f"block {block.index} line {actual_line} contains a tab character")

    if source.count("[") != source.count("]"):
        warnings.append(f"block {block.index} has unbalanced square bracket counts")
    if source.count("{") != source.count("}"):
        warnings.append(f"block {block.index} has unbalanced brace counts")

    return errors, warnings


def safe_fix_source(source: str) -> str:
    lines = source.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    fixed: list[str] = []
    seen_diagram = False
    for raw in lines:
        line = raw.rstrip()
        stripped = line.strip()
        if stripped.startswith("```"):
            continue
        if not seen_diagram:
            if not stripped:
                continue
            if stripped.startswith("#") or MARKDOWN_BULLET_RE.match(line):
                continue
            seen_diagram = True
        fixed.append(line)
    while fixed and not fixed[-1].strip():
        fixed.pop()
    return "\n".join(fixed).strip() + "\n"


def apply_fixes(markdown: str) -> tuple[str, bool]:
    changed = False

    def replace(match: re.Match[str]) -> str:
        nonlocal changed
        lang = match.group("lang")
        body = match.group("body")
        if lang.lower() != "mermaid":
            return match.group(0)
        fixed = safe_fix_source(body)
        if fixed != body:
            changed = True
        return f"```{lang}\n{fixed.rstrip()}\n```"

    return FENCE_RE.sub(replace, markdown), changed


def validate_with_mmdc(block: MermaidBlock, mmdc: str) -> tuple[str | None, str | None]:
    with tempfile.TemporaryDirectory(prefix="mermaid-md-") as tmp:
        src = Path(tmp) / "diagram.mmd"
        out = Path(tmp) / "diagram.svg"
        src.write_text(block.source.strip() + "\n", encoding="utf-8")
        proc = subprocess.run(
            [mmdc, "-i", str(src), "-o", str(out)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=30,
            check=False,
        )
    if proc.returncode == 0:
        return None, None
    message = (proc.stderr or proc.stdout or "mmdc failed").strip().splitlines()
    return f"block {block.index} Mermaid CLI compile error: {message[0] if message else 'unknown error'}", None


def validate_file(path: Path, fix: bool, mmdc: str | None) -> FileResult:
    result = FileResult(path=str(path))
    if not path.exists():
        result.errors.append("file does not exist")
        return result
    if path.suffix.lower() != ".md":
        result.errors.append("Mermaid artifact must be a Markdown .md file")
        return result

    markdown = path.read_text(encoding="utf-8")
    if markdown.count("```") % 2:
        result.errors.append("unmatched Markdown code fence")
        return result

    if fix:
        fixed_markdown, changed = apply_fixes(markdown)
        if changed:
            path.write_text(fixed_markdown, encoding="utf-8")
            markdown = fixed_markdown
            result.fixed = True

    blocks = extract_mermaid_blocks(markdown)
    result.mermaid_blocks = len(blocks)
    if not blocks:
        result.errors.append("no fenced mermaid block found")
        return result
    if path.name == "flow.md" and len(blocks) != 1:
        result.errors.append(f"flow.md must contain exactly one mermaid block, found {len(blocks)}")

    for block in blocks:
        errors, warnings = validate_heuristics(block)
        result.errors.extend(errors)
        result.warnings.extend(warnings)
        if mmdc:
            error, warning = validate_with_mmdc(block, mmdc)
            if error:
                result.errors.append(error)
            if warning:
                result.warnings.append(warning)

    return result


def find_mmd_files(paths: list[Path]) -> list[str]:
    roots: set[Path] = set()
    for path in paths:
        if path.exists():
            roots.add(path if path.is_dir() else path.parent)
    found: list[str] = []
    for root in roots:
        found.extend(str(path) for path in sorted(root.rglob("*.mmd")))
    return found


def build_summary(results: list[FileResult], mmd_files: list[str], parser: str | None) -> dict[str, Any]:
    total_errors = sum(len(result.errors) for result in results) + len(mmd_files)
    total_warnings = sum(len(result.warnings) for result in results)
    return {
        "status": "PASS" if total_errors == 0 else "FAIL",
        "parser": parser or "heuristic-only",
        "files_checked": len(results),
        "errors": total_errors,
        "warnings": total_warnings,
        "standalone_mmd_files": mmd_files,
        "results": [result.__dict__ for result in results],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Validate fenced Mermaid diagrams inside Markdown files")
    parser.add_argument("paths", nargs="+", type=Path, help="Markdown files containing fenced mermaid blocks")
    parser.add_argument("--fix", action="store_true", help="Apply safe cleanup inside mermaid fences before validating")
    parser.add_argument("--no-mmd-scan", action="store_true", help="Do not fail on sibling standalone .mmd files")
    parser.add_argument("--strict-parser", action="store_true", help="Fail if Mermaid CLI (mmdc) is unavailable")
    parser.add_argument("--json", action="store_true", help="Emit JSON only")
    args = parser.parse_args()

    mmdc = shutil.which("mmdc")
    if args.strict_parser and not mmdc:
        fail("Mermaid CLI not found. Install @mermaid-js/mermaid-cli or omit --strict-parser.")

    results = [validate_file(path, args.fix, mmdc) for path in args.paths]
    mmd_files = [] if args.no_mmd_scan else find_mmd_files(args.paths)
    summary = build_summary(results, mmd_files, "mmdc" if mmdc else None)

    if args.json:
        print(json.dumps(summary, ensure_ascii=False, indent=2))
    else:
        print(json.dumps(summary, ensure_ascii=False, indent=2))
        if not mmdc:
            print("WARN: Mermaid CLI (mmdc) not found; used heuristic validation only.", file=sys.stderr)

    raise SystemExit(0 if summary["status"] == "PASS" else 1)


if __name__ == "__main__":
    main()
