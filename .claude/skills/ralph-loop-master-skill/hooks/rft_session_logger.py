#!/usr/bin/env python3

import datetime as dt
import json
import os
import re
import sys
from pathlib import Path
from typing import Any

SENSITIVE_PATTERNS = [
    re.compile(r"(?i)(anthropic_auth_token|api[_-]?key|secret|password|token)\s*[:=]\s*[^\s,}]+"),
    re.compile(r"(?i)bearer\s+[a-z0-9._\-]+"),
]


def scrub(value: str) -> str:
    output = value
    for pattern in SENSITIVE_PATTERNS:
        output = pattern.sub(lambda m: m.group(0).split("=", 1)[0] + "=[REDACTED]" if "=" in m.group(0) else "[REDACTED]", output)
    return output


def compact(value: Any, limit: int = 500) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        text = value
    else:
        text = json.dumps(value, ensure_ascii=False, sort_keys=True)
    text = scrub(text).replace("\r", " ").strip()
    if len(text) > limit:
        return text[:limit] + "…"
    return text


def read_input() -> dict[str, Any]:
    raw = sys.stdin.read().strip()
    if not raw:
        return {}
    try:
        value = json.loads(raw)
        return value if isinstance(value, dict) else {"payload": value}
    except json.JSONDecodeError:
        return {"raw": raw}


def project_root(payload: dict[str, Any]) -> Path:
    cwd = payload.get("cwd") or payload.get("project_dir") or os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd()
    return Path(str(cwd)).resolve()


def event_name(payload: dict[str, Any]) -> str:
    return str(payload.get("hook_event_name") or payload.get("event") or payload.get("type") or "unknown")


def render_entry(payload: dict[str, Any]) -> str:
    timestamp = dt.datetime.now(dt.timezone.utc).isoformat()
    event = event_name(payload)
    tool = payload.get("tool_name") or payload.get("tool") or ""
    session = payload.get("session_id") or payload.get("transcript_path") or ""
    prompt = payload.get("prompt") or payload.get("message") or payload.get("raw") or ""
    fields = [
        f"### {timestamp} — {event}",
        "",
        f"- session: `{compact(session, 220)}`" if session else "- session: unknown",
        f"- tool: `{compact(tool, 120)}`" if tool else "- tool: none",
    ]
    if prompt:
        fields.extend(["", "```text", compact(prompt, 1200), "```"])
    elif payload:
        fields.extend(["", "```json", compact(payload, 1200), "```"])
    fields.append("")
    return "\n".join(fields)


def main() -> int:
    payload = read_input()
    root = project_root(payload)
    out_dir = root / ".claude" / "rft-session-logs"
    out_dir.mkdir(parents=True, exist_ok=True)
    date = dt.datetime.now().strftime("%Y-%m-%d")
    out_file = out_dir / f"{date}.md"
    if not out_file.exists():
        out_file.write_text(f"# Claude RFT Session Log — {date}\n\n<!-- beads-id: br-rft-session-log-{date} -->\n\n", encoding="utf-8")
    with out_file.open("a", encoding="utf-8") as handle:
        handle.write(render_entry(payload))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
