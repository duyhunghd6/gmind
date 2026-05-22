"""Review diagrams visualizer — renders review-diagrams.md Mermaid blocks as a gallery.

Produces:
1. All Mermaid flowcharts/state diagrams from review-diagrams.md rendered via CDN
2. Split review diagram files rendered individually
3. Heading structure with beads-id traceability

<!-- beads-id: br-chat-20260522-viz-review -->
"""

from __future__ import annotations

import html
from typing import Any


def _esc(text: Any) -> str:
    return html.escape(str(text))


def render_review_diagrams_section(artifacts: dict[str, Any]) -> str:
    """Render all review diagram Mermaid blocks as a visual gallery."""
    sections: list[str] = ["<h2>Review Diagrams</h2>"]
    idx = 0
    has_content = False

    # 1. review-diagrams.md main file
    rd_info = artifacts.get("review-diagrams.md", {})
    rd_blocks = rd_info.get("mermaid_blocks", [])
    if rd_blocks:
        has_content = True
        for mb in rd_blocks:
            heading = mb.get("heading", "Review Diagram")
            source = mb.get("source", "")
            sections.append(f"""
            <section class='card mermaid-card'>
              <h3>{_esc(heading)}</h3>
              <pre class="mermaid" id="review-mermaid-{idx}">{_esc(source)}</pre>
              <details><summary>Raw Mermaid source</summary><pre class='raw-mermaid'>{_esc(source)}</pre></details>
            </section>
            """)
            idx += 1

    # 2. Split review diagram files
    split_info = artifacts.get("review-diagrams-split", {})
    split_files = split_info.get("files", [])
    if split_files:
        has_content = True
        sections.append("<h3>Split Review Diagrams</h3>")
        for sf in split_files:
            sf_name = sf.get("name", "")
            for mb in sf.get("mermaid_blocks", []):
                heading = mb.get("heading", "")
                source = mb.get("source", "")
                full_heading = f"{sf_name} — {heading}" if heading else sf_name
                sections.append(f"""
                <section class='card mermaid-card'>
                  <h3>{_esc(full_heading)}</h3>
                  <pre class="mermaid" id="split-mermaid-{idx}">{_esc(source)}</pre>
                  <details><summary>Raw Mermaid source</summary><pre class='raw-mermaid'>{_esc(source)}</pre></details>
                </section>
                """)
                idx += 1

    if not has_content:
        return "<section class='card'><h2>Review Diagrams</h2><p>No review diagrams found.</p></section>"

    return "\n".join(sections)
