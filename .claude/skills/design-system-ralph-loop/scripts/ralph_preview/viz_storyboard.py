"""Storyboard visualizer — renders storyboards.json trajectories as low-fi UI step cards.

Produces:
1. A visual timeline card per trajectory showing screen→state→event→assert flow
2. Grouped trajectory lists by PRD trace
3. Recovery path highlighting for error scenarios

<!-- beads-id: br-chat-20260522-viz-storyboard -->
"""

from __future__ import annotations

import html
from typing import Any


def _esc(text: Any) -> str:
    return html.escape(str(text), quote=False)


def _step_badge(step: dict[str, Any], idx: int) -> str:
    """Render a single step as a visual badge in the timeline."""
    screen = step.get("screen", "")
    state = step.get("state", "")
    event = step.get("event", "")
    assert_text = step.get("assert", "")

    # Determine step type for coloring
    is_error = "error" in state.lower() or "error" in event.lower()
    is_loading = state == "loading"
    is_success = state in ("default", "success") or "SUCCESS" in event
    step_cls = "step-error" if is_error else ("step-loading" if is_loading else ("step-success" if is_success else "step-default"))

    return f"""
    <div class='step-badge {step_cls}'>
      <div class='step-number'>{idx + 1}</div>
      <div class='step-detail'>
        <div class='step-screen'>{_esc(screen)}</div>
        <div class='step-state'>{_esc(state)}</div>
        <div class='step-event'>{_esc(event)}</div>
        <div class='step-assert'>{_esc(assert_text)}</div>
      </div>
    </div>
    """


def _trajectory_card(traj: dict[str, Any]) -> str:
    """Render one trajectory as a visual step-sequence card."""
    traj_id = traj.get("trajectory_id", "")
    title = traj.get("title", "")
    prd_trace = traj.get("prd_trace", "")
    start_state = traj.get("start_state", "")
    recovery = traj.get("expected_recovery") or "none"
    steps = traj.get("steps", [])

    steps_html = "".join(_step_badge(step, i) for i, step in enumerate(steps))
    recovery_cls = "has-recovery" if recovery != "none" else ""

    return f"""
    <section class='card storyboard-card'>
      <h3>{_esc(traj_id)}: {_esc(title)}</h3>
      <p class='traj-meta'>
        <strong>PRD:</strong> {_esc(prd_trace)} |
        <strong>Start:</strong> {_esc(start_state)} |
        <strong>Steps:</strong> {len(steps)}
        {f' | <strong>Recovery:</strong> <span class="recovery-text">{_esc(recovery)}</span>' if recovery != "none" else ""}
      </p>
      <div class='step-timeline'>
        {steps_html}
      </div>
    </section>
    """


def group_trajectories_by_prd(trajectories: list[dict[str, Any]]) -> dict[str, list[dict[str, Any]]]:
    """Group trajectories by their prd_trace field."""
    groups: dict[str, list[dict[str, Any]]] = {}
    for traj in trajectories:
        prd = traj.get("prd_trace", "untracked")
        groups.setdefault(prd, []).append(traj)
    return groups


def render_storyboard_section(artifacts: dict[str, Any]) -> str:
    """Render full storyboard visualization section."""
    sb_data = artifacts.get("storyboards.json", {}).get("data")
    if not sb_data or not isinstance(sb_data, dict):
        return "<section class='card'><h2>Storyboards</h2><p>No storyboard data available.</p></section>"

    trajectories = sb_data.get("trajectories", [])
    total = sb_data.get("trajectories_total", len(trajectories))

    # Group by PRD trace
    prd_groups = group_trajectories_by_prd(trajectories)

    group_sections: list[str] = []
    for prd_trace, trajs in sorted(prd_groups.items()):
        cards = "".join(_trajectory_card(traj) for traj in trajs)
        group_sections.append(f"""
        <div class='prd-group'>
          <h3 class='prd-group-header'>{_esc(prd_trace)} ({len(trajs)} trajectories)</h3>
          <div class='grid'>{cards}</div>
        </div>
        """)

    groups_html = "\n".join(group_sections)

    return f"""
    <h2>Storyboard Trajectories ({total} total)</h2>
    <p class='subtitle'>Visual step-by-step UI walk-throughs grouped by PRD trace.</p>
    {groups_html}
    """
