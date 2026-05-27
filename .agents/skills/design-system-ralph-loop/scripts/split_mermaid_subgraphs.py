#!/usr/bin/env python3
"""Split self-contained Mermaid subgraphs into separate Markdown fences."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

FENCE_RE = re.compile(r"```(?P<lang>[\w-]+)\s*\n(?P<body>.*?)(?:\n```)", re.DOTALL)
DIAGRAM_RE = re.compile(r"^\s*(flowchart|graph)\b", re.IGNORECASE)
SUBGRAPH_RE = re.compile(r"^\s*subgraph\b", re.IGNORECASE)
END_RE = re.compile(r"^\s*end\s*$", re.IGNORECASE)
MERMAID_DIRECTIVE_RE = re.compile(r"^\s*%%\{.*\}%%\s*$")


@dataclass(frozen=True)
class Span:
    start: int
    end: int


@dataclass
class FileSummary:
    path: str
    changed: bool = False
    mermaid_blocks_before: int = 0
    mermaid_blocks_after: int = 0
    blocks_split: int = 0
    subgraphs_extracted: int = 0
    warnings: list[str] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)


def line_is_prelude(line: str) -> bool:
    stripped = line.strip()
    return not stripped or stripped.startswith("%%") or bool(MERMAID_DIRECTIVE_RE.match(line))


def find_diagram_line(lines: list[str]) -> int | None:
    for index, line in enumerate(lines):
        if line_is_prelude(line):
            continue
        return index if DIAGRAM_RE.match(line) else None
    return None


def top_level_subgraph_spans(lines: list[str], start_index: int) -> tuple[list[Span], str | None]:
    spans: list[Span] = []
    depth = 0
    start: int | None = None

    for index in range(start_index, len(lines)):
        line = lines[index]
        if SUBGRAPH_RE.match(line):
            if depth == 0:
                start = index
            depth += 1
        elif END_RE.match(line):
            if depth == 0:
                return spans, f"line {index + 1} has an unmatched Mermaid 'end'"
            depth -= 1
            if depth == 0 and start is not None:
                spans.append(Span(start=start, end=index + 1))
                start = None

    if depth != 0:
        return spans, "Mermaid subgraph is missing a closing 'end'"
    return spans, None


def covered_indexes(spans: list[Span]) -> set[int]:
    covered: set[int] = set()
    for span in spans:
        covered.update(range(span.start, span.end))
    return covered


def outside_meaningful_lines(lines: list[str], diagram_index: int, spans: list[Span]) -> list[tuple[int, str]]:
    covered = covered_indexes(spans)
    outside: list[tuple[int, str]] = []
    for index, line in enumerate(lines):
        if index <= diagram_index or index in covered:
            continue
        if line_is_prelude(line):
            continue
        outside.append((index + 1, line.strip()))
    return outside


def split_mermaid_source(source: str, min_subgraphs: int) -> tuple[list[str], list[str]]:
    lines = source.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    while lines and not lines[-1].strip():
        lines.pop()

    diagram_index = find_diagram_line(lines)
    if diagram_index is None:
        return ["\n".join(lines).strip() + "\n"], []

    spans, error = top_level_subgraph_spans(lines, diagram_index + 1)
    if error:
        return ["\n".join(lines).strip() + "\n"], [error]
    if len(spans) < min_subgraphs:
        return ["\n".join(lines).strip() + "\n"], []

    outside = outside_meaningful_lines(lines, diagram_index, spans)
    if outside:
        sample = "; ".join(f"line {line_no}: {text}" for line_no, text in outside[:3])
        return ["\n".join(lines).strip() + "\n"], [f"skipped split because the Mermaid block has shared top-level content outside subgraphs: {sample}"]

    prelude = lines[: diagram_index + 1]
    blocks: list[str] = []
    for span in spans:
        block_lines = prelude + lines[span.start : span.end]
        blocks.append("\n".join(block_lines).strip() + "\n")
    return blocks, []


def transform_markdown(markdown: str, min_subgraphs: int) -> tuple[str, FileSummary]:
    summary = FileSummary(path="")
    output: list[str] = []
    cursor = 0

    for match in FENCE_RE.finditer(markdown):
        output.append(markdown[cursor : match.start()])
        cursor = match.end()
        lang = match.group("lang")
        body = match.group("body")

        if lang.lower() != "mermaid":
            output.append(match.group(0))
            continue

        summary.mermaid_blocks_before += 1
        split_blocks, warnings = split_mermaid_source(body, min_subgraphs)
        summary.warnings.extend(warnings)
        summary.mermaid_blocks_after += len(split_blocks)

        if len(split_blocks) > 1:
            summary.changed = True
            summary.blocks_split += 1
            summary.subgraphs_extracted += len(split_blocks)

        rendered = [f"```{lang}\n{block.rstrip()}\n```" for block in split_blocks]
        output.append("\n\n".join(rendered))

    output.append(markdown[cursor:])
    if summary.mermaid_blocks_before == 0:
        summary.mermaid_blocks_after = 0
    return "".join(output), summary


def process_file(path: Path, write: bool, min_subgraphs: int) -> FileSummary:
    summary = FileSummary(path=str(path))
    if not path.exists():
        summary.errors.append("file does not exist")
        return summary
    if path.suffix.lower() != ".md":
        summary.errors.append("expected a Markdown .md file")
        return summary

    markdown = path.read_text(encoding="utf-8")
    transformed, result = transform_markdown(markdown, min_subgraphs)
    result.path = str(path)
    if transformed != markdown:
        result.changed = True
    if result.changed and write:
        path.write_text(transformed, encoding="utf-8")
    return result


def build_summary(results: list[FileSummary]) -> dict[str, Any]:
    return {
        "status": "PASS" if not any(result.errors for result in results) else "FAIL",
        "files_checked": len(results),
        "files_changed": sum(1 for result in results if result.changed),
        "blocks_split": sum(result.blocks_split for result in results),
        "subgraphs_extracted": sum(result.subgraphs_extracted for result in results),
        "results": [result.__dict__ for result in results],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Split self-contained Mermaid subgraphs in Markdown files")
    parser.add_argument("paths", nargs="+", type=Path, help="Markdown files containing fenced mermaid blocks")
    parser.add_argument("--write", action="store_true", help="Rewrite files in place")
    parser.add_argument("--min-subgraphs", type=int, default=2, help="Minimum top-level subgraphs required before splitting")
    parser.add_argument("--json", action="store_true", help="Emit JSON summary")
    args = parser.parse_args()

    if args.min_subgraphs < 2:
        print("ERROR: --min-subgraphs must be at least 2", file=sys.stderr)
        raise SystemExit(2)

    results = [process_file(path, args.write, args.min_subgraphs) for path in args.paths]
    summary = build_summary(results)
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    raise SystemExit(0 if summary["status"] == "PASS" else 1)


if __name__ == "__main__":
    main()
