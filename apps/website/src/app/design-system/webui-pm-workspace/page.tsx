"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { RTMDashboard, SafeBoard, ApprovalGates, SearchResults } from "./components/DashboardScreens";
import { TaskList, TaskDetail, TraceExplorer, DocViewer } from "./components/TaskScreens";
import { TerminalShowcase } from "./components/showcase/TerminalShowcase";
import { PortfolioShowcase } from "./components/showcase/PortfolioShowcase";
import { PiPlanningShowcase } from "./components/showcase/PiPlanningShowcase";
import { GitGraphShowcase } from "./components/showcase/GitGraphShowcase";
import { KanbanShowcase } from "./components/showcase/KanbanShowcase";
import { KnowledgeGraphShowcase } from "./components/showcase/KnowledgeGraphShowcase";
import { ApprovalShowcase } from "./components/showcase/ApprovalShowcase";
import { TimelineShowcase } from "./components/showcase/TimelineShowcase";
import { ComponentsShowcase } from "./components/showcase/ComponentsShowcase";
import { DocViewerShowcase } from "./components/showcase/DocViewerShowcase";
import { ExplorerShowcase } from "./components/showcase/ExplorerShowcase";
import { BeadsTraversalShowcase } from "./components/showcase/BeadsTraversalShowcase";
import { StoryboardShowcase } from "./components/showcase/StoryboardShowcase";

type Group = "Core WebUI" | "Showcase" | "Composite";
type ViewState = "default" | "loading" | "empty" | "error" | "offline" | "forbidden" | "partial" | "saving" | "not_found" | "success";
type Screen = { id: string; label: string; route: string; dsId: string; surfaceId: string; group: Group; layout: string; states: ViewState[]; regions: string[]; endpoints: string[]; prdDsId?: string };

const noDirect = "Browser boundary: Go REST API only; no direct shell, FrankenSQLite, Zvec, local git, gh, or FastCode access.";
const baseStates: ViewState[] = ["default", "loading", "empty", "error", "offline", "forbidden", "success"];
const stateOptions: ViewState[] = ["default", "loading", "empty", "error", "offline", "forbidden", "partial", "saving", "not_found", "success"];
const tasks = ["br-prd04-s8.1A WebUI route coverage", "br-plan-04 Approval gate evidence", "bd-agent-ralph-stage2-build-components"];
const people = ["Mina Patel", "Oskar Venn", "Linh Calder", "Priya Okafor"];
const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";
const motion = "transition-[opacity,transform] duration-[var(--duration-fast)] ease-[var(--ease-out)]";

function screen(id: string, label: string, route: string, dsId: string, surfaceId: string, group: Group, layout: string, regions: string[], endpoints: string[], extraStates: ViewState[] = [], prdDsId?: string): Screen {
  return { id, label, route, dsId, surfaceId, group, layout, regions, endpoints, prdDsId, states: Array.from(new Set([...baseStates, ...extraStates])) };
}

const coreScreens: Screen[] = [
  screen("screen:rtm-dashboard", "RTM Dashboard", "/", "ds:screen:rtm-dashboard-001", "ds:rtm-dashboard:surface", "Core WebUI", "Four-panel RTM dashboard with KPI row, heatmap, progress, graph, and gap analysis.", ["ds:rtm-dashboard:coverage-heatmap", "ds:rtm-dashboard:task-progress", "ds:rtm-dashboard:knowledge-graph", "ds:rtm-dashboard:gap-analysis"], ["GET /api/coverage", "GET /api/tasks", "GET /api/trace/:id?depth=2", "GET /api/gaps"]),
  screen("screen:safe-board", "SAFe Board", "/board", "ds:screen:safe-board-001", "ds:safe-board:surface", "Core WebUI", "Portfolio, ART, and team kanban views with WIP and RTE escalation regions.", ["ds:safe-board:view-switcher", "ds:safe-board:kanban", "ds:safe-board:rte-escalation-badge"], ["GET /api/tasks?view=board&level=<level>", "PUT /api/tasks/:id/status", "GET /api/tasks/:id/activity"], ["saving"]),
  screen("screen:task-list", "Task List", "/tasks", "ds:screen:task-list-001", "ds:task-list:surface", "Core WebUI", "Sortable table shell with filters, pagination, CSV export, and bulk action bar.", ["ds:task-list:filters", "ds:task-list:table", "ds:task-list:bulk-actions"], ["GET /api/tasks?format=list", "PUT /api/tasks/bulk"], ["saving"]),
  screen("screen:task-detail", "Task Detail", "/tasks/:id", "ds:screen:task-detail-001", "ds:task-detail:surface", "Core WebUI", "Editable task header with Detail, Activity, Graph, and Code tab slots.", ["ds:task-detail:editable-fields", "ds:task-detail:tabs", "ds:task-detail:activity"], ["GET /api/tasks/:id", "GET /api/tasks/:id/activity", "PUT /api/tasks/:id"], ["saving", "not_found"]),
  screen("screen:trace-explorer", "Trace Explorer", "/trace/:id", "ds:screen:trace-explorer-001", "ds:trace-explorer:surface", "Core WebUI", "Full-page graph canvas shell with toolbar, filters, legend, and detail panel.", ["ds:trace-explorer:toolbar", "ds:trace-explorer:graph", "ds:trace-explorer:detail-panel"], ["GET /api/trace/:id?depth=full", "GET /api/impact/:section"], ["partial"]),
  screen("screen:doc-viewer", "Core Doc Viewer", "/docs", "ds:screen:core-doc-viewer-001", "ds:core-doc-viewer:surface", "Core WebUI", "Source-type document tree beside rendered content and Beads auto-link slots.", ["ds:core-doc-viewer:tree", "ds:core-doc-viewer:content", "ds:core-doc-viewer:beads-links"], ["GET /api/docs?group=source_type", "GET /api/docs/:id", "GET /api/coverage?prd=<beads-id>"]),
  screen("screen:approval-gates", "Approval Gates", "/approval", "ds:screen:approval-gates-001", "ds:approval-gates:surface", "Core WebUI", "Level 3 approval workspace with queue, evidence, PRD context, and decision controls.", ["ds:approval-gates:queue", "ds:approval-gates:evidence", "ds:approval-gates:decision-controls"], ["GET /api/tasks?status=pending-approval", "GET /api/approval/:id/evidence", "POST /api/approval/:id/decision"], ["saving"]),
  screen("screen:search-results", "Search Results", "/search", "ds:screen:search-results-001", "ds:search-results:surface", "Core WebUI", "Global search input, filter sidebar, grouped results, and suggestion areas.", ["ds:search-results:input", "ds:search-results:filters", "ds:search-results:results"], ["GET /api/search?q=<query>&type=<type>"]),
];

const showcaseScreens: Screen[] = [
  screen("screen:ds-terminal", "Terminal", "/design-system/terminal", "ds:screen:terminal-showcase-001", "ds:terminal-showcase:surface", "Showcase", "Scenario tabs Agent Console, Deploy, Debug, CI/CD with command/output/success/error terminal line types; log events stream through the API.", ["ds:terminal-showcase:scenario-tabs", "ds:terminal-showcase:mosaic", "ds:terminal-showcase:lines"], ["GET /api/agents/sessions", "GET /api/ci/runs", "GET /api/tasks/:id/activity", "GET /api/log-events?stream=terminal"], [], "ds:screen:terminal-001"),
  screen("screen:ds-portfolio", "Portfolio", "/design-system/portfolio", "ds:screen:portfolio-showcase-001", "ds:portfolio-showcase:surface", "Showcase", "Executive portfolio table paired with roadmap quarters.", ["ds:portfolio-showcase:table", "ds:portfolio-showcase:roadmap"], ["GET /api/portfolio/epics", "GET /api/tasks?issue_type=epic"], [], "br-ds-portfolio-view"),
  screen("screen:ds-pi-planning", "PI Planning", "/design-system/pi-planning", "ds:screen:pi-planning-showcase-001", "ds:pi-planning-showcase:surface", "Showcase", "Two-column sandbox with scoring, confidence vote, and ROAM board regions.", ["ds:pi-planning-showcase:sandbox", "ds:pi-planning-showcase:value-scoring", "ds:pi-planning-showcase:confidence-vote", "ds:pi-planning-showcase:roam-board"], ["GET /api/pi/features", "PUT /api/pi/plan", "POST /api/pi/confidence-vote"], ["saving"], "br-ds-pi-planning"),
  screen("screen:ds-git-graph", "Git Graph", "/design-system/git-graph", "ds:screen:git-graph-showcase-001", "ds:git-graph-showcase:surface", "Showcase", "Hash-selected graph scenarios with canvas, branches, commits, tags, and stats.", ["ds:git-graph-showcase:scenario-selector", "ds:git-graph-showcase:canvas"], ["GET /api/git/graph?scenario=<id>", "GET /api/trace/:id?include=git"], ["partial"], "ds:screen:git-graph-001"),
  screen("screen:ds-kanban", "Kanban", "/design-system/kanban", "ds:screen:kanban-showcase-001", "ds:kanban-showcase:surface", "Showcase", "Board selector with horizontal columns, card slots, WIP badges, and board stats.", ["ds:kanban-showcase:board-selector", "ds:kanban-showcase:columns", "ds:kanban-showcase:stats"], ["GET /api/tasks?view=board&board=<id>", "PUT /api/tasks/:id/status"], ["saving"], "ds:screen:kanban-001"),
  screen("screen:ds-knowledge-graph", "Knowledge Graph", "/design-system/knowledge-graph", "ds:screen:knowledge-graph-showcase-001", "ds:knowledge-graph-showcase:surface", "Showcase", "Graph preset tabs, client graph viewport, selected-node banner, legend, and stats.", ["ds:knowledge-graph-showcase:presets", "ds:knowledge-graph-showcase:viewer", "ds:knowledge-graph-showcase:legend"], ["GET /api/trace/:id?depth=full", "GET /api/graph/presets"], ["partial"], "ds:screen:knowledge-graph-001"),
  screen("screen:ds-approval", "Approval", "/design-system/approval", "ds:screen:approval-showcase-001", "ds:approval-showcase:surface", "Showcase", "Approval panels with status toggles, evidence blocks, RTM matrix, and heatmap.", ["ds:approval-showcase:toggles", "ds:approval-showcase:evidence", "ds:approval-showcase:rtm", "ds:approval-showcase:heatmap"], ["GET /api/approval/:id/evidence", "GET /api/coverage", "POST /api/approval/:id/decision"], ["saving"], "ds:screen:approval-001"),
  screen("screen:ds-timeline", "Timeline", "/design-system/timeline", "ds:screen:timeline-showcase-001", "ds:timeline-showcase:surface", "Showcase", "File lease indicators, activity feed, and sprint day timeline regions.", ["ds:timeline-showcase:file-lease", "ds:timeline-showcase:activity-feed", "ds:timeline-showcase:sprint-day"], ["GET /api/activity", "GET /api/file-leases"], [], "ds:screen:timeline-001"),
  screen("screen:ds-components", "Components", "/design-system/components", "ds:screen:components-showcase-001", "ds:components-showcase:surface", "Showcase", "Catalog visibly enumerates Buttons, Badges/Status, Progress, Avatar Stack, Modal, Dropdown, Accordion, Tab Panel, Data Table, Tooltip, Code Block, Cards, Prompt Card, Section Labels, Status Dots, Skeleton, Empty State, and Error Banner.", ["ds:components-showcase:sections"], ["GET /api/design-system/components"], [], "ds:screen:components-001"),
  screen("screen:ds-doc-viewer", "DS Doc Viewer", "/design-system/doc-viewer", "ds:screen:doc-viewer-showcase-001", "ds:doc-viewer-showcase:surface", "Showcase", "File tree beside selected document panel and Beads badge anchors.", ["ds:doc-viewer-showcase:tree", "ds:doc-viewer-showcase:panel"], ["GET /api/docs?group=source_type", "GET /api/docs/:id"], [], "ds:screen:doc-viewer-001"),
  screen("screen:ds-explorer", "Explorer", "/design-system/explorer", "ds:screen:explorer-showcase-001", "ds:explorer-showcase:surface", "Showcase", "Unified search, type filters, result list, and responsive detail sidebar.", ["ds:explorer-showcase:query", "ds:explorer-showcase:type-filters", "ds:explorer-showcase:detail-sidebar"], ["GET /api/search?q=<query>&type=<type>"], [], "ds:screen:explorer-001"),
  screen("screen:ds-beads-traversal", "Beads Traversal", "/design-system/beads-traversal", "ds:screen:beads-traversal-showcase-001", "ds:beads-traversal-showcase:surface", "Showcase", "Layered DAG from PRD sections to plan elements, tasks, and commits.", ["ds:beads-traversal-showcase:layers", "ds:beads-traversal-showcase:direction-toggle", "ds:beads-traversal-showcase:detail-sidebar"], ["GET /api/trace/:id?depth=full"], ["partial"], "ds:screen:beads-traversal-001"),
  screen("screen:ds-storyboard", "Storyboard", "/design-system/storyboard", "ds:screen:storyboard-showcase-001", "ds:storyboard-showcase:surface", "Showcase", "Journey filter, horizontal use-case flow, guidance panel, and CTA shell.", ["ds:storyboard-showcase:filter", "ds:storyboard-showcase:flow", "ds:storyboard-showcase:guidance"], ["GET /api/storyboards"], [], "ds:screen:storyboard-001"),
  screen("screen:ds-storyboard-detail", "Storyboard Detail", "/design-system/storyboard/:id", "ds:screen:storyboard-detail-showcase-001", "ds:storyboard-detail-showcase:surface", "Showcase", "Dynamic storyboard detail shell with role panel, journey steps, and related use cases.", ["ds:storyboard-detail-showcase:role", "ds:storyboard-detail-showcase:steps", "ds:storyboard-detail-showcase:related"], ["GET /api/storyboards/:id"], ["not_found"]),
];

const workspace = screen("screen:ds-webui-pm-workspace", "WebUI PM Workspace", "/design-system/webui-pm-workspace", "ds:screen:webui-pm-workspace-showcase-001", "ds:webui-pm-workspace-showcase:surface", "Composite", "Integrated shell with header, search, offline indicator, sidebar nav, boundary actions, sync banner, and active PM surfaces.", ["ds:webui-pm-workspace-showcase:header", "ds:webui-pm-workspace-showcase:sidebar", "ds:webui-pm-workspace-showcase:boundary-actions", "ds:webui-pm-workspace-showcase:sync-conflict-banner", "ds:webui-pm-workspace-showcase:active-surface"], ["GET /api/coverage", "GET /api/tasks", "GET /api/trace/:id", "GET /api/docs", "GET /api/search"], ["saving"], "ds:global_shell");

const routeMarkers: Record<string, string> = {
  "/design-system/terminal": "TERM",
  "/design-system/portfolio": "PORT",
  "/design-system/pi-planning": "PI",
  "/design-system/git-graph": "GIT",
  "/design-system/kanban": "KAN",
  "/design-system/knowledge-graph": "KG",
  "/design-system/approval": "APPR",
  "/design-system/timeline": "TIME",
  "/design-system/components": "COMP",
  "/design-system/doc-viewer": "DOC",
  "/design-system/explorer": "EXPL",
  "/design-system/beads-traversal": "BEADS",
  "/design-system/storyboard": "STORY",
  "/design-system/storyboard/:id": "STORY-ID",
  "/design-system/webui-pm-workspace": "SHELL",
};

const routeScreens = [...coreScreens, ...showcaseScreens, workspace];

const screenIdToHash: Record<string, string> = {
  "screen:rtm-dashboard": "", "screen:safe-board": "#surface-board", "screen:task-list": "#surface-tasks", "screen:task-detail": "#surface-tasks-detail", "screen:trace-explorer": "#surface-trace", "screen:doc-viewer": "#surface-docs", "screen:approval-gates": "#surface-approval", "screen:search-results": "#surface-search",
  "rtm_dashboard": "", "safe_board": "#surface-board", "task_list": "#surface-tasks", "task_detail": "#surface-tasks-detail", "trace_explorer": "#surface-trace", "doc_viewer": "#surface-docs", "approval_gates": "#surface-approval", "search_results": "#surface-search",
  "rtm": "", "board": "#surface-board", "tasks": "#surface-tasks", "detail": "#surface-tasks-detail", "trace": "#surface-trace", "docs": "#surface-docs", "approval": "#surface-approval", "search": "#surface-search",
};

const pathnameToScreenIdMap: Record<string, string> = {
  "/design-system/terminal": "screen:ds-terminal",
  "/design-system/portfolio": "screen:ds-portfolio",
  "/design-system/pi-planning": "screen:ds-pi-planning",
  "/design-system/git-graph": "screen:ds-git-graph",
  "/design-system/kanban": "screen:ds-kanban",
  "/design-system/knowledge-graph": "screen:ds-knowledge-graph",
  "/design-system/approval": "screen:ds-approval",
  "/design-system/timeline": "screen:ds-timeline",
  "/design-system/components": "screen:ds-components",
  "/design-system/doc-viewer": "screen:ds-doc-viewer",
  "/design-system/explorer": "screen:ds-explorer",
  "/design-system/beads-traversal": "screen:ds-beads-traversal",
  "/design-system/storyboard": "screen:ds-storyboard",
  "/design-system/webui-pm-workspace": "screen:ds-webui-pm-workspace",
};

interface WorkspaceProps {
  initialActiveId?: string;
  storyboardId?: string;
}

export default function WebUIPMWorkspacePage({
  initialActiveId,
  storyboardId,
}: WorkspaceProps = {}) {
  const pathname = usePathname();
  const router = useRouter();

  const currentScreenId = useMemo(() => {
    if (pathname.startsWith("/design-system/storyboard/") && pathname !== "/design-system/storyboard") {
      return "screen:ds-storyboard-detail";
    }
    return pathnameToScreenIdMap[pathname] || initialActiveId || workspace.id;
  }, [pathname, initialActiveId]);

  const currentStoryboardId = useMemo(() => {
    if (pathname.startsWith("/design-system/storyboard/") && pathname !== "/design-system/storyboard") {
      return pathname.split("/").pop();
    }
    return storyboardId;
  }, [pathname, storyboardId]);

  const [activeId, setActiveId] = useState(currentScreenId);
  const [state, setState] = useState<ViewState>("default");
  const [connected, setConnected] = useState(true);
  const [query, setQuery] = useState("br-prd04 approval evidence");
  const [notice, setNotice] = useState("Ready: workspace routes render API-mapped data only.");
  
  const [taskActiveTab, setTaskActiveTab] = useState("detail");
  const [approvalStatus, setApprovalStatus] = useState("Pending Review");

  const activeScreen = useMemo(() => routeScreens.find((item) => item.id === activeId) ?? workspace, [activeId]);
  const activeState: ViewState = connected ? state : "offline";
  const supportedStates = stateOptions.filter((item) => activeScreen.states.includes(item));

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const hashToScreenIdMap: Record<string, string> = {
        "": "screen:rtm-dashboard",
        "#surface-dashboard": "screen:rtm-dashboard",
        "#surface-board": "screen:safe-board",
        "#surface-tasks": "screen:task-list",
        "#surface-tasks-detail": "screen:task-detail",
        "#surface-trace": "screen:trace-explorer",
        "#surface-docs": "screen:doc-viewer",
        "#surface-approval": "screen:approval-gates",
        "#surface-search": "screen:search-results",
      };
      
      if (pathname === "/design-system/webui-pm-workspace" || pathname === "/") {
        const targetId = hashToScreenIdMap[hash] || "screen:rtm-dashboard";
        setActiveId(targetId);
      } else {
        setActiveId(currentScreenId);
      }
      setState("default");
    };
    
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [pathname, currentScreenId]);

  function selectScreen(id: string) {
    const target = routeScreens.find((item) => item.id === id) ?? workspace;
    const hash = screenIdToHash[id];
    if (hash !== undefined) {
      if (pathname !== "/design-system/webui-pm-workspace") {
        router.push(`/design-system/webui-pm-workspace${hash}`);
      } else {
        window.location.hash = hash;
      }
    } else {
      router.push(target.route);
    }
    setState("default");
  }

  const navigateTo = (id: string) => selectScreen(id);

  function setPreviewState(next: ViewState) { setState(next); setNotice(`${next} state selected for ${activeScreen.route}; ${noDirect}`); }
  function action(event: string, target?: string) {
    const map: Record<string, () => void> = {
      EVENT_SEARCH: () => selectScreen("screen:search-results"), EVENT_VIEW_TASK: () => selectScreen("screen:task-detail"), EVENT_VIEW_TRACE: () => selectScreen("screen:trace-explorer"), EVENT_VIEW_DOC: () => selectScreen("screen:doc-viewer"), EVENT_REFRESH: () => setState("loading"), EVENT_MOVE_CARD: () => setState("saving"), EVENT_SAVE_TASK: () => setState("saving"), EVENT_SAVE_BULK: () => setState("saving"), EVENT_APPROVAL_DECISION: () => setState("saving"), EVENT_PI_PLAN_SAVE: () => setState("saving"), EVENT_CONFIDENCE_VOTE: () => setState("saving"), API_SUCCESS: () => setState("success"), EVENT_HASH_NAVIGATE: () => setNotice(`Hash scenario selected: ${target ?? "default"}`), EVENT_DISCONNECT: () => setConnected(false), EVENT_RECONNECT: () => setConnected(true), EVENT_KEEP_LOCAL: () => { setConnected(true); setState("success"); }, EVENT_USE_SERVER: () => { setConnected(true); setState("success"); }, EVENT_BACK: () => selectScreen(state === "not_found" ? "screen:ds-storyboard" : "screen:rtm-dashboard")
    };
    map[event]?.(); setNotice(`${event} uses ${target ?? "route-scoped"} REST mapping; ${noDirect}`);
  }

  return <main data-screen-id={workspace.id} data-ds-id={workspace.dsId} data-prd-ds-id={workspace.prdDsId} data-state={activeState} data-contract-state={activeState === "not_found" ? "not_found" : activeState} className="min-h-[100dvh] bg-[var(--bg)] text-[var(--text)]">
    <a href="#active-surface" className={`sr-only focus:not-sr-only focus:fixed focus:left-[var(--space-md)] focus:top-[var(--space-md)] focus:z-50 focus:rounded-[var(--radius)] focus:bg-[var(--surface-elevated)] focus:p-[var(--space-sm)] ${focusRing}`}>Skip to workspace surface</a>
    <section data-ds-id={workspace.surfaceId} aria-label="WebUI PM Workspace composite shell" className="mx-auto flex min-h-[100dvh] max-w-[1500px] flex-col border-x border-[var(--border)] bg-[var(--surface)]">
      <header role="banner" data-ds-id="ds:webui-pm-workspace-showcase:header" className="border-b border-[var(--border)] p-[var(--space-md)]"><div className="grid gap-[var(--space-md)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)_auto] lg:items-end"><div><p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-dim)]">gmind serve REST workspace</p><h1 className="mt-[var(--space-xs)] text-2xl font-semibold tracking-tight">WebUI PM Workspace</h1><p className="mt-[var(--space-xs)] max-w-3xl text-sm text-[var(--text-dim)]">Integrated Core WebUI and PRD-04 showcase shell. {noDirect}</p></div><form role="search" aria-label="Search PM workspace" onSubmit={(event) => { event.preventDefault(); action("EVENT_SEARCH", query); }} className="grid gap-[var(--space-sm)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"><label htmlFor="workspace-search" className="text-xs text-[var(--text-dim)]">Search tasks, docs, commits, and Beads IDs<input id="workspace-search" value={query} onChange={(event) => setQuery(event.target.value)} className={`mt-[var(--space-xs)] w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-[var(--space-md)] py-[var(--space-sm)] text-sm text-[var(--text)] ${focusRing}`} /></label><button type="submit" className={`btn-primary ${focusRing}`}>Search</button></form><button type="button" aria-label={connected ? "Switch workspace to offline read-only state" : "Reconnect and rehydrate queued workspace edits"} aria-pressed={!connected} onClick={() => action(connected ? "EVENT_DISCONNECT" : "EVENT_RECONNECT", connected ? "GET /api/health" : "POST /api/sync/rehydrate")} className={`btn-secondary ${focusRing}`}>{connected ? "API connected" : "Offline read-only"}</button></div></header>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{activeScreen.label} route is in {activeState.replace(/[-_]/g, " ")} state. {notice}</p>
      {!connected && <aside data-ds-id="ds:webui-pm-workspace-showcase:sync-conflict-banner" data-state="offline" aria-label="Offline sync conflict" className="grid gap-[var(--space-sm)] border-b border-[var(--border)] bg-[var(--accent-amber-dim)] p-[var(--space-md)] text-sm md:grid-cols-[1fr_auto_auto]"><span><strong>Status: offline conflict.</strong> Local edit br-plan-04 differs from server version. Resolve via REST conflict endpoint.</span><button type="button" onClick={() => action("EVENT_KEEP_LOCAL", "POST /api/sync/conflicts/rlp-482/resolve")} className={`btn-secondary btn-sm ${focusRing}`}>Keep local</button><button type="button" onClick={() => action("EVENT_USE_SERVER", "POST /api/sync/conflicts/rlp-482/resolve")} className={`btn-secondary btn-sm ${focusRing}`}>Use server</button></aside>}
      <div className="flex flex-1 flex-col overflow-hidden">
        <section id="active-surface" data-ds-id="ds:webui-pm-workspace-showcase:active-surface" aria-labelledby="active-screen-title" className="overflow-auto bg-[var(--bg)] p-[var(--space-md)] md:p-[var(--space-lg)]" tabIndex={-1}><section aria-labelledby="state-preview-title" className="mb-[var(--space-md)] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[var(--space-md)]"><h2 id="state-preview-title" className="text-base font-semibold">Declared state anchors</h2><p className="mt-[var(--space-xs)] text-xs text-[var(--text-dim)]">{notice}</p><div className="mt-[var(--space-sm)] flex flex-wrap gap-[var(--space-sm)]" role="toolbar" aria-label="Preview available states">{supportedStates.map((item) => <button key={item} type="button" data-state={item} aria-pressed={activeState === item} disabled={!connected && item !== "offline"} onClick={() => setPreviewState(item)} className={`badge ${activeState === item ? "badge-teal" : "badge-cyan"} ${focusRing}`}>{item.replace(/[-_]/g, " ")}</button>)}</div></section>
          <ScreenSurface screen={activeScreen} state={activeState} featured onAction={action} query={query} setQuery={setQuery} taskActiveTab={taskActiveTab} setTaskActiveTab={setTaskActiveTab} approvalStatus={approvalStatus} setApprovalStatus={setApprovalStatus} navigateTo={navigateTo} storyboardId={currentStoryboardId} />
        </section>
      </div>
      <footer data-ds-id="ds:webui-pm-workspace-showcase:boundary-actions" className="flex flex-col gap-[var(--space-sm)] border-t border-[var(--border)] bg-[var(--surface)] p-[var(--space-md)] text-xs text-[var(--text-dim)] sm:flex-row sm:items-center sm:justify-between"><span>{noDirect}</span><button type="button" data-state="forbidden" onClick={() => action("EVENT_BACK")} className={`btn-secondary btn-sm ${focusRing}`}>Return to dashboard</button></footer>
    </section>
  </main>;
}

function ScreenSurface({
  screen, state, featured = false, onAction, query, setQuery, taskActiveTab, setTaskActiveTab, approvalStatus, setApprovalStatus, navigateTo, storyboardId
}: {
  screen: Screen; state: ViewState; featured?: boolean; onAction: (event: string, target?: string) => void; query: string; setQuery: (value: string) => void; taskActiveTab: string; setTaskActiveTab: (tab: string) => void; approvalStatus: string; setApprovalStatus: (status: string) => void; navigateTo: (id: string) => void; storyboardId?: string;
}) {
  const renderCoreComponent = (id: string) => {
    switch (id) {
      case "screen:rtm-dashboard": return <RTMDashboard navigateTo={navigateTo} />;
      case "screen:safe-board": return <SafeBoard navigateTo={navigateTo} />;
      case "screen:task-list": return <TaskList navigateTo={navigateTo} />;
      case "screen:task-detail": return <TaskDetail navigateTo={navigateTo} activeTab={taskActiveTab} setActiveTab={setTaskActiveTab} state={state === "offline" ? "saving" : state === "saving" ? "saving" : undefined} />;
      case "screen:trace-explorer": return <TraceExplorer navigateTo={navigateTo} state={state === "offline" ? "partial" : state === "partial" ? "partial" : undefined} />;
      case "screen:doc-viewer": return <DocViewer navigateTo={navigateTo} />;
      case "screen:approval-gates": return <ApprovalGates approvalStatus={approvalStatus} setApprovalStatus={setApprovalStatus} state={state === "offline" ? "insufficient_evidence" : undefined} />;
      case "screen:search-results": return <SearchResults navigateTo={navigateTo} searchQuery={query} />;
      default: return null;
    }
  };

  const renderShowcaseComponent = (id: string) => {
    switch (id) {
      case "screen:ds-terminal": return <TerminalShowcase state={state} onAction={onAction} />;
      case "screen:ds-portfolio": return <PortfolioShowcase state={state} onAction={onAction} />;
      case "screen:ds-pi-planning": return <PiPlanningShowcase state={state} onAction={onAction} />;
      case "screen:ds-git-graph": return <GitGraphShowcase state={state} onAction={onAction} />;
      case "screen:ds-kanban": return <KanbanShowcase state={state} onAction={onAction} />;
      case "screen:ds-knowledge-graph": return <KnowledgeGraphShowcase state={state} onAction={onAction} />;
      case "screen:ds-approval": return <ApprovalShowcase state={state} onAction={onAction} />;
      case "screen:ds-timeline": return <TimelineShowcase state={state} onAction={onAction} />;
      case "screen:ds-components": return <ComponentsShowcase state={state} onAction={onAction} />;
      case "screen:ds-doc-viewer": return <DocViewerShowcase state={state} onAction={onAction} />;
      case "screen:ds-explorer": return <ExplorerShowcase state={state} onAction={onAction} />;
      case "screen:ds-beads-traversal": return <BeadsTraversalShowcase state={state} onAction={onAction} />;
      case "screen:ds-storyboard": return <StoryboardShowcase state={state} onAction={onAction} />;
      case "screen:ds-storyboard-detail": return <StoryboardShowcase state={state} storyboardId={storyboardId} onAction={onAction} />;
      default: return null;
    }
  };

  const renderFeaturedComponent = (id: string, group: string) => group === "Core WebUI" ? renderCoreComponent(id) : group === "Showcase" ? renderShowcaseComponent(id) : null;

  return <article data-screen-id={screen.id} data-ds-id={screen.dsId} data-prd-ds-id={screen.prdDsId} data-state={state} data-contract-state={state === "not_found" ? "not_found" : state} className={`rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[var(--space-md)] ${motion} ${featured ? "min-h-[440px]" : ""}`}><header className="border-b border-[var(--border)] pb-[var(--space-md)]"><p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-dim)]">{screen.group}</p><h3 id={featured ? "active-screen-title" : undefined} className="mt-[var(--space-xs)] flex flex-wrap items-center gap-[var(--space-xs)] text-xl font-semibold">{screen.label}{routeMarkers[screen.route] && <span className="badge badge-teal font-mono" aria-label={`PRD-04 route marker ${routeMarkers[screen.route]}`}>{routeMarkers[screen.route]}</span>}</h3><p className="mt-[var(--space-xs)] font-mono text-xs text-[var(--text-dim)]">{screen.route}</p><p className="mt-[var(--space-xs)] font-mono text-[0.68rem] text-[var(--text-dim)]">contract {screen.dsId}{screen.prdDsId ? ` / PRD alias ${screen.prdDsId}` : ""}</p><p className="mt-[var(--space-sm)] text-sm text-[var(--text-dim)]">{screen.layout}</p></header>{state !== "default" && state !== "offline" && state !== "partial" && state !== "saving" && screen.group !== "Showcase" ? <StatePanel screen={screen} state={state} onAction={onAction} /> : featured && (screen.group === "Core WebUI" || screen.group === "Showcase") ? <div className="mt-[var(--space-md)] flex flex-col gap-[var(--space-md)]">{renderFeaturedComponent(screen.id, screen.group)}</div> : <section data-ds-id={screen.surfaceId} aria-label={`${screen.label} layout regions`} className="mt-[var(--space-md)] grid gap-[var(--space-sm)] md:grid-cols-2 xl:grid-cols-3">{screen.regions.map((region) => <Region key={region} screen={screen} region={region} onAction={onAction} query={query} setQuery={setQuery} />)}</section>}<aside aria-label={`${screen.label} state and API summary`} className="mt-[var(--space-md)] grid gap-[var(--space-sm)] lg:grid-cols-2"><section className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-[var(--space-sm)]"><h4 className="font-mono text-xs uppercase text-[var(--text-dim)]">States</h4><div className="mt-[var(--space-sm)] flex flex-wrap gap-[var(--space-xs)]">{screen.states.map((item) => <span key={item} data-state={item} className="badge badge-cyan">{item.replace(/[-_]/g, " ")}</span>)}</div></section><section className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-[var(--space-sm)]"><h4 className="font-mono text-xs uppercase text-[var(--text-dim)]">REST data flow</h4>{screen.endpoints.map((endpoint) => <p key={endpoint} className="font-mono text-[0.7rem] text-[var(--text)]">{endpoint}</p>)}<p className="mt-[var(--space-xs)] text-[0.68rem] text-[var(--text-dim)]">{noDirect}</p></section></aside></article>;
}

function Region({ screen, region, onAction, query, setQuery }: { screen: Screen; region: string; onAction: (event: string, target?: string) => void; query: string; setQuery: (value: string) => void }) {
  const accent = region.includes("heatmap") || region.includes("approval") ? "badge-amber" : region.includes("graph") || region.includes("trace") ? "badge-teal" : "badge-cyan";
  return <article data-ds-id={region} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-[var(--space-sm)]"><h4 className="font-mono text-xs text-[var(--accent-teal)]">{region}</h4><div className="mt-[var(--space-sm)]"><RegionContent screen={screen} region={region} onAction={onAction} query={query} setQuery={setQuery} /></div><span className={`badge ${accent} mt-[var(--space-sm)]`}>{screen.label}</span></article>;
}

function RegionContent({ screen, region, onAction, query, setQuery }: { screen: Screen; region: string; onAction: (event: string, target?: string) => void; query: string; setQuery: (value: string) => void }) {
  if (region.includes("search") || region.includes("query") || region.includes("input")) return <form onSubmit={(event) => { event.preventDefault(); onAction("EVENT_SEARCH", query); }} className="grid gap-[var(--space-xs)]"><label className="text-xs text-[var(--text-dim)]">Controlled query<input value={query} onChange={(event) => setQuery(event.target.value)} className={`mt-[var(--space-xs)] w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-[var(--space-sm)] py-[var(--space-xs)] text-xs ${focusRing}`} /></label><button className={`btn-secondary btn-sm ${focusRing}`} type="submit">Run search</button></form>;
  if (region.includes("kanban") || region.includes("columns")) return <div className="kanban-board__columns grid gap-[var(--space-sm)] md:grid-cols-3">{["Ready 4", "Build 6/7", "Review 3"].map((col) => <section key={col} className="kanban-column"><div className="kanban-column__header"><span className="kanban-column__title">{col}</span></div><button type="button" onClick={() => onAction("EVENT_MOVE_CARD", "PUT /api/tasks/:id/status")} className={`mt-[var(--space-sm)] w-full rounded-[var(--radius)] border border-[var(--border)] p-[var(--space-sm)] text-left text-xs ${focusRing}`}>{tasks[col.length % tasks.length]}</button></section>)}</div>;
  if (region.includes("heatmap") || region.includes("coverage")) return <div className="grid grid-cols-4 gap-[var(--space-xs)]">{[75, 50, 100, 25, 75, 75, 50, 100].map((n, i) => <button key={`${n}-${i}`} type="button" aria-label={`${n} percent coverage; open trace`} onClick={() => onAction("EVENT_VIEW_TRACE", `coverage ${n}`)} className={`heatmap-cell heatmap-cell--${n} ${focusRing}`}>{n}<span className="sr-only"> percent covered</span></button>)}</div>;
  if (region.includes("table")) return <table className="data-table w-full text-xs"><thead><tr><th><button type="button" className={focusRing} onClick={() => onAction("EVENT_HASH_NAVIGATE", "sort:id")}>Epic ID</button></th><th>Owner</th><th>Status</th></tr></thead><tbody>{["EPIC-PRD04-17", "EPIC-TRACE-29"].map((id, i) => <tr key={id}><td>{id}</td><td>{people[i]}</td><td><span className={i ? "badge badge-amber" : "badge badge-teal"}>{i ? "Forecast risk" : "On track"}</span></td></tr>)}</tbody></table>;
  if (region.includes("vote")) return <div className="flex flex-wrap gap-[var(--space-xs)]" role="radiogroup" aria-label="PI confidence vote">{[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" aria-label={`Submit confidence vote ${n}`} onClick={() => onAction("EVENT_CONFIDENCE_VOTE", `vote ${n}`)} className={`btn-secondary btn-sm ${focusRing}`}>{n}</button>)}</div>;
  if (region.includes("approval") || region.includes("decision") || region.includes("toggles")) return <div className="approval-panel" data-state="pending"><p className="text-xs"><span className="badge badge-amber">Status: evidence pending</span> 7 checks passed, 1 owner note required.</p><button type="button" onClick={() => onAction("EVENT_APPROVAL_DECISION", "POST /api/approval/:id/decision")} className={`btn-primary btn-sm mt-[var(--space-sm)] ${focusRing}`}>Submit decision</button></div>;
  if (region.includes("graph") || region.includes("viewer") || region.includes("layers")) return <div className="grid gap-[var(--space-sm)]">{["br-prd04-s8", "br-plan-webui", "bd-agent-ralph-stage2-build-components"].map((node, i) => <button type="button" key={node} onClick={() => onAction(i === 1 ? "EVENT_VIEW_TASK" : "EVENT_VIEW_TRACE", node)} className={`graph-node graph-node--${i === 2 ? "commit" : i ? "task" : "prd"} ${focusRing}`}><span className="graph-node__label">{node}</span></button>)}</div>;
  if (region.includes("doc") || region.includes("tree") || region.includes("panel") || region.includes("content") || region.includes("beads")) return <div className="path-tree text-xs"><strong>docs/PRDs/core-gmind/PRD-04</strong><button type="button" onClick={() => onAction("EVENT_VIEW_TRACE", "br-prd04-s8.1A")} className={`badge badge-teal ml-[var(--space-xs)] ${focusRing}`}>br-prd04-s8.1A</button><p className="mt-[var(--space-sm)]">Rendered document sections link to trace routes through REST lookups.</p></div>;
  if (region.includes("terminal") || region.includes("lines") || region.includes("mosaic")) return <div className="terminal terminal--scanline text-xs"><div className="terminal__titlebar">Agent Console, Deploy, Debug, CI/CD</div><p><strong>command</strong> GET /api/agents/sessions --active</p><p><strong>output</strong> GET /api/ci/runs shows deploy train rlp-47 green.</p><p><strong>success</strong> GET /api/tasks/:id/activity linked bd-agent handoff.</p><p><strong>error</strong> API stream /api/log-events?stream=terminal lost one debug frame and resumed through REST polling.</p></div>;
  if (region.includes("file-lease")) return <div className="grid gap-[var(--space-xs)]">{["unlocked", "locked", "expiring", "expired"].map((s) => <span key={s} className={`file-lease file-lease--${s}`}>Status: PRD-04 section lease {s}</span>)}</div>;
  if (region.includes("components") || region.includes("sections")) return <div className="flex flex-wrap gap-[var(--space-xs)]">{["Buttons", "Badges/Status", "Progress", "Avatar Stack", "Modal", "Dropdown", "Accordion", "Tab Panel", "Data Table", "Tooltip", "Code Block", "Cards", "Prompt Card", "Section Labels", "Status Dots", "Skeleton", "Empty State", "Error Banner"].map((x) => <button type="button" key={x} onClick={() => onAction("EVENT_HASH_NAVIGATE", x)} className={`badge badge-cyan ${focusRing}`}>{x}</button>)}</div>;
  if (region.includes("storyboard") || region.includes("flow") || region.includes("guidance") || region.includes("role") || region.includes("related")) return <ol className="space-y-[var(--space-xs)] text-xs"><li>1. PM opens dashboard and selects a Beads gap.</li><li>2. Trace explorer confirms PRD, plan, task, and commit lineage.</li><li><button type="button" onClick={() => onAction("EVENT_VIEW_TRACE", "storyboard-detail-alignment")} className={`btn-secondary btn-sm ${focusRing}`}>Open implementation screen</button></li></ol>;
  if (region.includes("sandbox") || region.includes("scoring") || region.includes("roam")) return <div className="grid gap-[var(--space-xs)] text-xs"><p>Feature capacity: 31.4 points assigned, 6.7 points unplanned.</p><button type="button" onClick={() => onAction("EVENT_PI_PLAN_SAVE", "PUT /api/pi/plan")} className={`btn-secondary btn-sm ${focusRing}`}>Save PI plan</button><span className="badge badge-amber">Status: risk owned by {people[2]}</span></div>;
  return <div className="space-y-[var(--space-sm)] text-xs"><p>{tasks[region.length % tasks.length]}</p><p>Owner: {people[region.length % people.length]}; status: API mapped.</p><button type="button" onClick={() => onAction(region.includes("task") ? "EVENT_VIEW_TASK" : "EVENT_HASH_NAVIGATE", region)} className={`btn-secondary btn-sm ${focusRing}`}>Open linked view</button></div>;
}

function StatePanel({ screen, state, onAction }: { screen: Screen; state: ViewState; onAction: (event: string, target?: string) => void }) {
  if (state === "loading") return <section className="skeleton-group mt-[var(--space-md)] grid gap-[var(--space-sm)] md:grid-cols-2" aria-label={`Loading ${screen.label} skeleton`} aria-busy="true"><div className="md:col-span-2"><div className="skeleton skeleton--text-full" /><div className="skeleton skeleton--text-short mt-[var(--space-xs)]" /></div><div className="skeleton skeleton--card" /><div className="skeleton skeleton--card" /><button type="button" onClick={() => onAction("EVENT_REFRESH")} className={`btn-secondary btn-sm md:col-span-2 ${focusRing}`}>Retry refresh</button></section>;
  const copy: Record<Exclude<ViewState, "loading">, { title: string; body: string; cta: string; event: string; target?: string; tone: string }> = {
    default: { title: "Live data", body: "The route is rendering API-mapped data with active controls.", cta: "Refresh route data", event: "EVENT_REFRESH", tone: "badge-cyan" },
    empty: { title: "No matching records", body: "Clear filters or reindex this route through the Go REST API to populate the workspace.", cta: "Clear filters and refresh", event: "EVENT_REFRESH", tone: "badge-cyan" },
    error: { title: "Evidence request failed", body: "The request did not complete. Retry keeps the user in the same safe route and preserves API boundary traceability.", cta: "Retry route data", event: "EVENT_REFRESH", tone: "badge-rose" },
    offline: { title: "Offline read-only", body: "Cached data remains visible. Writes are queued until health checks recover, then conflict resolution offers keep-local or use-server choices.", cta: "Reconnect and rehydrate", event: "EVENT_RECONNECT", target: "POST /api/sync/rehydrate", tone: "badge-amber" },
    forbidden: { title: "Permission denied", body: "Current role cannot approve this gate or access the route. Return to a safe dashboard route.", cta: "Back to dashboard", event: "EVENT_BACK", tone: "badge-rose" },
    partial: { title: "Partial enrichment", body: "Local graph rows are visible while backend enrichment catches up. Refresh to request missing impact data.", cta: "Refresh enrichment", event: "EVENT_REFRESH", tone: "badge-amber" },
    saving: { title: "Saving optimistic edit", body: "Edited controls are disabled until REST confirmation, rollback, or offline queue response.", cta: "Simulate save success", event: "API_SUCCESS", tone: "badge-teal" },
    "not_found": { title: "Record not found", body: "The requested entity was not returned by the API. Return to the parent route and choose another record.", cta: "Back to parent list", event: "EVENT_BACK", tone: "badge-rose" },
    success: { title: "Update confirmed", body: "The API accepted the transition. Refresh to revalidate route data and dependent evidence.", cta: "Refresh route data", event: "EVENT_REFRESH", tone: "badge-teal" },
  };
  const item = copy[state];
  return <section className="mt-[var(--space-md)] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] p-[var(--space-md)]" aria-live="polite"><span className={`badge ${item.tone}`}>Status: {state.replace(/[-_]/g, " ")}</span><h4 className="mt-[var(--space-sm)] font-semibold">{item.title}</h4><p className="mt-[var(--space-xs)] text-sm text-[var(--text-dim)]">{item.body}</p>{state === "saving" && <fieldset disabled aria-describedby={`${screen.id}-saving-help`} className="mt-[var(--space-sm)] grid gap-[var(--space-xs)] opacity-70"><label className="text-xs text-[var(--text-dim)]">Audit reason<input value="Waiting for REST confirmation" readOnly className="mt-[var(--space-xs)] w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-[var(--space-sm)] py-[var(--space-xs)]" /></label><p id={`${screen.id}-saving-help`} className="text-xs text-[var(--text-dim)]">Controls disabled during optimistic save.</p></fieldset>}<button type="button" onClick={() => onAction(item.event, item.target)} className={`btn-secondary btn-sm mt-[var(--space-md)] ${focusRing}`}>{item.cta}</button></section>;
}
