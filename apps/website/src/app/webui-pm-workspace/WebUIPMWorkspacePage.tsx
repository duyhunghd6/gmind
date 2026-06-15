"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { ActionCatalogMarkers, WorkspaceComponent, WorkspaceStatePanel } from "./workspace-components";

type SurfaceId = "rtm-dashboard" | "safe-board" | "task-list" | "task-detail" | "trace-explorer" | "document-viewer" | "approval-gates" | "search-results" | "terminal-console" | "timeline-file-leases" | "git-graph-explorer" | "knowledge-graph" | "portfolio-view" | "pi-planning" | "storyboards-overview" | "storyboard-detail" | "components-catalog";
type GlobalState = "default" | "loading" | "offline" | "forbidden" | "sync_conflict";
type ViewState = "default" | "loading" | "empty" | "error" | "offline" | "forbidden" | "saving" | "not_found" | "partial" | "insufficient_evidence" | "decision_submitted" | "view_drilldown" | "view_trace";
type StatePanelKind = Exclude<ViewState, "default"> | "sync_conflict";

type SurfaceSpec = {
  id: SurfaceId;
  label: string;
  icon: IconName;
  title: string;
  route: string;
  hash: string;
  rootDsId: string;
  dsIds: string[];
  states: ViewState[];
  defaultState: ViewState;
};

interface WebUIPMWorkspaceLayoutProps {
  initialActiveId?: string;
  storyboardId?: string;
}

const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";
const panel = "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[var(--space-md)]";
const muted = "text-[var(--text-dim)]";
const animated = "transition-[opacity,transform] duration-[var(--duration-normal)] ease-[var(--ease-out)] motion-reduce:transition-none";

const globalStates: GlobalState[] = ["default", "loading", "offline", "forbidden", "sync_conflict"];
const recoveryStates: ViewState[] = ["default", "loading", "empty", "error", "offline", "forbidden"];
const taskListStates: ViewState[] = [...recoveryStates, "saving"];
const commonStates: ViewState[] = ["default", "loading", "empty", "error", "offline", "forbidden", "saving", "not_found", "partial", "insufficient_evidence", "decision_submitted", "view_drilldown", "view_trace"];

const surfaces: SurfaceSpec[] = [
  { id: "rtm-dashboard", label: "Dashboard", icon: "dashboard", title: "RTM Dashboard", route: "/", hash: "#surface-rtm-dashboard", rootDsId: "ds:webui.rtm.root", dsIds: ["ds:webui.rtm.kpi-row", "ds:webui.rtm.coverage-heatmap", "ds:webui.rtm.task-progress", "ds:webui.rtm.knowledge-graph-widget", "ds:webui.rtm.gap-analysis"], states: ["default", "loading", "empty", "error", "view_drilldown", "view_trace"], defaultState: "default" },
  { id: "safe-board", label: "Board", icon: "board", title: "SAFe board", route: "/board", hash: "#surface-board", rootDsId: "ds:webui.board.root", dsIds: ["ds:webui.board.selector", "ds:webui.board.stats-strip", "ds:webui.board.columns"], states: [...recoveryStates, "saving"], defaultState: "default" },
  { id: "task-list", label: "Tasks", icon: "tasks", title: "Task list", route: "/tasks", hash: "#surface-tasks", rootDsId: "ds:webui.tasks.root", dsIds: ["ds:webui.tasks.view-toggle", "ds:webui.tasks.filter-bar", "ds:webui.tasks.table", "ds:webui.tasks.bulk-actions"], states: taskListStates, defaultState: "default" },
  { id: "task-detail", label: "Task Detail", icon: "detail", title: "Task detail workspace", route: "/tasks/:id", hash: "#surface-task-detail", rootDsId: "ds:webui.task-detail.root", dsIds: ["ds:webui.task-detail.summary-header", "ds:webui.task-detail.tabs", "ds:webui.task-detail.activity", "ds:webui.task-detail.graph-widget", "ds:webui.task-detail.approval-embed"], states: [...recoveryStates, "saving", "not_found"], defaultState: "default" },
  { id: "trace-explorer", label: "Trace", icon: "trace", title: "Trace explorer", route: "/trace/:id", hash: "#surface-trace", rootDsId: "ds:webui.trace.root", dsIds: ["ds:webui.trace.toolbar", "ds:webui.trace.canvas", "ds:webui.trace.detail-panel", "ds:webui.trace.legend-stats"], states: [...recoveryStates, "partial"], defaultState: "default" },
  { id: "document-viewer", label: "Docs", icon: "docs", title: "Document viewer", route: "/docs/:id", hash: "#surface-docs", rootDsId: "ds:webui.docs.root", dsIds: ["ds:webui.docs.tree", "ds:webui.docs.content", "ds:webui.docs.section-badges"], states: [...recoveryStates, "not_found"], defaultState: "default" },
  { id: "approval-gates", label: "Approval", icon: "approval", title: "Approval Gate", route: "/approval", hash: "#surface-approval", rootDsId: "ds:webui.approval.root", dsIds: ["ds:webui.approval.queue", "ds:webui.approval.evidence-hub", "ds:webui.approval.rtm-matrix", "ds:webui.approval.coverage-heatmap", "ds:webui.approval.decision-box"], states: ["default", "loading", "insufficient_evidence", "empty", "decision_submitted", "error", "offline", "forbidden"], defaultState: "default" },
  { id: "search-results", label: "Search", icon: "search", title: "Search results", route: "/search", hash: "#surface-search", rootDsId: "ds:webui.search.root", dsIds: ["ds:webui.search.query-input", "ds:webui.search.type-filters", "ds:webui.search.results-list", "ds:webui.search.detail-sidebar"], states: recoveryStates, defaultState: "default" },
  { id: "terminal-console", label: "Terminal", icon: "terminal", title: "Terminal console", route: "/terminal", hash: "#surface-terminal", rootDsId: "ds:webui.terminal.root", dsIds: ["ds:webui.terminal.tabs", "ds:webui.terminal.mosaic"], states: recoveryStates, defaultState: "default" },
  { id: "timeline-file-leases", label: "Timeline", icon: "timeline", title: "Timeline and file leases", route: "/timeline", hash: "#surface-timeline", rootDsId: "ds:webui.timeline.root", dsIds: ["ds:webui.timeline.file-leases", "ds:webui.timeline.activity-feed", "ds:webui.timeline.sprint-day"], states: recoveryStates, defaultState: "default" },
  { id: "git-graph-explorer", label: "Git Graph", icon: "git", title: "Git graph explorer", route: "/git-graph", hash: "#surface-git-graph", rootDsId: "ds:webui.git-graph.root", dsIds: ["ds:webui.git-graph.scenario-list", "ds:webui.git-graph.canvas", "ds:webui.git-graph.commit-detail"], states: recoveryStates, defaultState: "default" },
  { id: "knowledge-graph", label: "Knowledge", icon: "knowledge", title: "Knowledge graph", route: "/knowledge-graph", hash: "#surface-knowledge-graph", rootDsId: "ds:webui.knowledge-graph.root", dsIds: ["ds:webui.knowledge-graph.preset-list", "ds:webui.knowledge-graph.canvas", "ds:webui.knowledge-graph.node-banner"], states: recoveryStates, defaultState: "default" },
  { id: "portfolio-view", label: "Portfolio", icon: "portfolio", title: "Portfolio view", route: "/portfolio", hash: "#surface-portfolio", rootDsId: "ds:webui.portfolio.root", dsIds: ["ds:webui.portfolio.table", "ds:webui.portfolio.roadmap"], states: recoveryStates, defaultState: "default" },
  { id: "pi-planning", label: "PI Planning", icon: "planning", title: "PI planning", route: "/pi-planning", hash: "#surface-pi-planning", rootDsId: "ds:webui.pi-planning.root", dsIds: ["ds:webui.pi-planning.strategic-sandbox", "ds:webui.pi-planning.capacity-plan", "ds:webui.pi-planning.value-scoring", "ds:webui.pi-planning.confidence-vote", "ds:webui.pi-planning.roam-board"], states: [...recoveryStates, "saving"], defaultState: "default" },
  { id: "storyboards-overview", label: "Storyboards", icon: "story", title: "Storyboards overview", route: "/storyboards", hash: "#surface-storyboards", rootDsId: "ds:webui.storyboards.root", dsIds: ["ds:webui.storyboards.filter", "ds:webui.storyboards.flow", "ds:webui.storyboards.guidance-panel"], states: recoveryStates, defaultState: "default" },
  { id: "storyboard-detail", label: "Storyboard Detail", icon: "story", title: "Storyboard detail", route: "/storyboards/:id", hash: "#surface-storyboard-detail", rootDsId: "ds:webui.storyboard-detail.root", dsIds: ["ds:webui.storyboard-detail.summary", "ds:webui.storyboard-detail.timeline", "ds:webui.storyboard-detail.related-usecases"], states: [...recoveryStates, "not_found"], defaultState: "default" },
  { id: "components-catalog", label: "Components", icon: "components", title: "Components catalog", route: "/components", hash: "#surface-components", rootDsId: "ds:webui.components.root", dsIds: ["ds:webui.components.section-nav", "ds:webui.components.examples", "ds:webui.components.tokens"], states: ["default", "loading", "empty", "error"], defaultState: "default" },
];

type IconName = "dashboard" | "board" | "tasks" | "detail" | "trace" | "docs" | "approval" | "search" | "terminal" | "timeline" | "git" | "knowledge" | "portfolio" | "planning" | "story" | "components" | "hide" | "show" | "online" | "offline" | "loading" | "state" | "drill" | "approve" | "reject" | "changes";
const iconPaths: Record<IconName, ReactNode> = {
  dashboard: <><path d="M4 13h6V4H4z" /><path d="M14 20h6V4h-6z" /><path d="M4 20h6v-3H4z" /></>, board: <><path d="M4 5h16" /><path d="M8 5v15" /><path d="M16 5v15" /><path d="M5 9h2M13 13h2M17 9h2" /></>, tasks: <><path d="M8 7h12M8 12h12M8 17h12" /><path d="m3.5 7 1 1 2-2M3.5 12l1 1 2-2M3.5 17l1 1 2-2" /></>, detail: <><path d="M5 4h10l4 4v12H5z" /><path d="M14 4v5h5M8 13h8M8 17h6" /></>, trace: <><circle cx="5" cy="12" r="2" /><circle cx="12" cy="6" r="2" /><circle cx="19" cy="12" r="2" /><circle cx="12" cy="18" r="2" /><path d="m7 11 3.5-3M13.5 7 17 11M17 13l-3.5 3M10.5 17 7 13" /></>, docs: <><path d="M6 3h9l3 3v15H6z" /><path d="M14 3v4h4M9 11h6M9 15h6" /></>, approval: <><path d="M4 12l5 5L20 6" /><path d="M4 20h16" /></>, search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>, terminal: <><path d="M4 6h16v12H4z" /><path d="m8 10 3 2-3 2M13 15h4" /></>, timeline: <><path d="M12 4v16" /><circle cx="12" cy="7" r="2" /><circle cx="12" cy="13" r="2" /><circle cx="12" cy="19" r="2" /></>, git: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><circle cx="6" cy="18" r="2" /><path d="M6 8v8M8 6c5 0 10 5 10 10" /></>, knowledge: <><circle cx="12" cy="12" r="3" /><circle cx="5" cy="7" r="2" /><circle cx="19" cy="7" r="2" /><circle cx="5" cy="17" r="2" /><circle cx="19" cy="17" r="2" /><path d="M7 8l3 2M17 8l-3 2M7 16l3-2M17 16l-3-2" /></>, portfolio: <><path d="M4 7h16M6 7v13h12V7" /><path d="M9 7V4h6v3M8 12h8M8 16h5" /></>, planning: <><path d="M4 19V5h16v14" /><path d="M8 9h3v3H8zM13 13h3v3h-3z" /></>, story: <><path d="M5 5h14v14H5z" /><path d="M8 9h8M8 13h5" /></>, components: <><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" /></>, hide: <><path d="M4 5h16M4 19h16M4 12h10" /><path d="m17 9 3 3-3 3" /></>, show: <><path d="M4 5h16M4 19h16M10 12h10" /><path d="m7 9-3 3 3 3" /></>, online: <><circle cx="12" cy="12" r="8" /><path d="m8.5 12 2.5 2.5L16 9" /></>, offline: <><circle cx="12" cy="12" r="8" /><path d="M8 8l8 8M16 8l-8 8" /></>, loading: <><path d="M12 4v4M12 16v4M4 12h4M16 12h4" /><path d="m6.3 6.3 2.8 2.8M14.9 14.9l2.8 2.8" /></>, state: <><path d="M5 7h14M5 12h14M5 17h14" /><circle cx="9" cy="7" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="11" cy="17" r="1.5" /></>, drill: <><path d="M5 5h6v6H5z" /><path d="M13 13h6v6h-6z" /><path d="M11 8h4a2 2 0 0 1 2 2v3" /></>, approve: <path d="m4 12 5 5L20 6" />, reject: <path d="M6 6l12 12M18 6 6 18" />, changes: <><path d="M4 7h10M4 12h16M4 17h10" /><path d="m16 5 3 2-3 2M16 15l3 2-3 2" /></>,
};

function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name]}</svg>;
}

const surfaceAliases: Record<string, SurfaceId> = {
  "/": "rtm-dashboard",
  "/board": "safe-board",
  "/tasks": "task-list",
  "/tasks/:id": "task-detail",
  "/trace": "trace-explorer",
  "/trace/:id": "trace-explorer",
  "/docs": "document-viewer",
  "/docs/:id": "document-viewer",
  "/approval": "approval-gates",
  "/search": "search-results",
  "/terminal": "terminal-console",
  "/timeline": "timeline-file-leases",
  "/git-graph": "git-graph-explorer",
  "/knowledge-graph": "knowledge-graph",
  "/portfolio": "portfolio-view",
  "/pi-planning": "pi-planning",
  "/storyboards": "storyboards-overview",
  "/storyboards/:id": "storyboard-detail",
  "/components": "components-catalog",
  "#surface-safe-board": "safe-board",
  "#surface-task-list": "task-list",
  "#surface-trace-explorer": "trace-explorer",
  "#surface-doc-viewer": "document-viewer",
  "#surface-approval-gates": "approval-gates",
  "#surface-search-results": "search-results",
  "#approval": "approval-gates",
  "#panels": "approval-gates",
  "#rtm": "approval-gates",
  "#tasks": "task-list",
  "#task-detail": "task-detail",
  "#trace": "trace-explorer",
  "#docs": "document-viewer",
  "#search": "search-results",
  "#terminal": "terminal-console",
  "#timeline": "timeline-file-leases",
  "#git-graph": "git-graph-explorer",
  "#knowledge-graph": "knowledge-graph",
  "#portfolio": "portfolio-view",
  "#pi-planning": "pi-planning",
  "#storyboards": "storyboards-overview",
  "#storyboard-detail": "storyboard-detail",
  "#components": "components-catalog",
};

const hashToSurface = new Map<string, SurfaceId>([
  ...surfaces.map((surface) => [surface.hash, surface.id] as [string, SurfaceId]),
  ...Object.entries(surfaceAliases).filter(([key]) => key.startsWith("#")),
]);

function resolveInitialSurface(initialActiveId?: string): SurfaceId {
  if (!initialActiveId) return "rtm-dashboard";
  const lower = initialActiveId.toLowerCase();
  const direct = surfaceAliases[lower] ?? hashToSurface.get(lower);
  if (direct) return direct;
  return surfaces.find((item) => lower.includes(item.id) || item.dsIds.some((dsId) => lower.includes(dsId.toLowerCase())))?.id ?? "rtm-dashboard";
}

export default function WebUIPMWorkspaceLayout({ initialActiveId }: WebUIPMWorkspaceLayoutProps = {}) {
  const initialSurface = resolveInitialSurface(initialActiveId);
  const [surface, setSurface] = useState<SurfaceId>(initialSurface);
  const [globalState, setGlobalState] = useState<GlobalState>("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [surfaceStates, setSurfaceStates] = useState<Record<SurfaceId, ViewState>>(() => Object.fromEntries(surfaces.map((item) => [item.id, item.defaultState])) as Record<SurfaceId, ViewState>);
  const [decisionFeedback, setDecisionFeedback] = useState("Awaiting approval decision.");
  const [globalQuery, setGlobalQuery] = useState("approval evidence");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash || "#surface-rtm-dashboard";
      setSurface(hashToSurface.get(hash) ?? "rtm-dashboard");
    };
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") searchRef.current?.blur();
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const activeSurface = surfaces.find((item) => item.id === surface) ?? surfaces[0];
  const activeState = surfaceStates[surface];
  const liveMessage = globalState === "offline" ? "Workspace is offline and read-only" : globalState === "forbidden" ? "Workspace permission is required" : globalState === "sync_conflict" ? "Sync conflict needs review" : `${activeSurface.title} state is ${activeState.replaceAll("_", " ")}`;
  const stateOptions = useMemo(() => activeSurface.states, [activeSurface]);

  const setSurfaceState = (target: SurfaceId, state: ViewState) => setSurfaceStates((current) => ({ ...current, [target]: state }));
  const navigateSurface = (target: SurfaceId, hash: string) => {
    setSurface(target);
    if (window.location.hash !== hash) {
      history.pushState(null, '', hash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  };
  const handleSurfaceLink = (event: MouseEvent<HTMLAnchorElement>, target: SurfaceId, hash: string) => {
    event.preventDefault();
    navigateSurface(target, hash);
  };
  const handleDashboardAction = (nextState: "view_drilldown" | "view_trace") => {
    setSurfaceState("rtm-dashboard", nextState);
    navigateSurface("rtm-dashboard", "#surface-rtm-dashboard");
  };
  const handleApprovalDecision = (decision: "approved" | "rejected" | "changes-requested") => {
    setSurfaceState("approval-gates", "decision_submitted");
    setDecisionFeedback(`Approval decision submitted: ${decision.replace("-", " ")}.`);
    navigateSurface("approval-gates", "#surface-approval");
  };
  const handleGlobalAction = (event: MouseEvent<HTMLElement>) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-action], [data-event], [data-action-id]");
    const action = target?.dataset.event ?? target?.dataset.action;
    if (!action) return;
    const href = target instanceof HTMLAnchorElement ? target.getAttribute("href") : null;
    const hashTarget = href && href.startsWith("#") ? hashToSurface.get(href) : null;
    if (hashTarget && href) {
      event.preventDefault();
      setSurfaceState(hashTarget, "default");
      navigateSurface(hashTarget, href);
      return;
    }
    if (action === "EVENT_DISCONNECT") { event.preventDefault(); setGlobalState("offline"); return; }
    if (action === "EVENT_RECONNECT") { event.preventDefault(); setGlobalState("default"); return; }
    if (action === "EVENT_KEEP_MINE_OR_USE_SERVER") { event.preventDefault(); setGlobalState("default"); return; }
    if (action === "EVENT_MOVE_CARD" || action === "EVENT_BOARD_DRAG_CARD") { event.preventDefault(); setSurfaceState("safe-board", "saving"); navigateSurface("safe-board", "#surface-board"); return; }
    if (action === "EVENT_REFRESH") { event.preventDefault(); setGlobalState("default"); setSurfaceState(surface, "default"); return; }
    if (action === "EVENT_BACK") { event.preventDefault(); navigateSurface(surface === "approval-gates" ? "rtm-dashboard" : "task-list", surface === "approval-gates" ? "#surface-rtm-dashboard" : "#surface-tasks"); return; }
    if (action === "EVENT_VIEW_TASK" || action === "EVENT_TASKS_OPEN_DETAIL" || action === "EVENT_SEARCH_OPEN_RESULT_TASK" || action === "EVENT_FIELD_EDIT" || action === "EVENT_TASK_SAVE_STATUS" || action === "EVENT_TASK_SAVE_ASSIGNEE") { event.preventDefault(); setSurfaceState("task-detail", action === "EVENT_FIELD_EDIT" ? "saving" : "default"); navigateSurface("task-detail", "#surface-task-detail"); return; }
    if (action === "EVENT_VIEW_DOC" || action === "EVENT_DOCS_SELECT_DOCUMENT" || action === "EVENT_BEADS_ID_CLICK") { event.preventDefault(); setSurfaceState("document-viewer", "default"); navigateSurface("document-viewer", "#surface-docs"); return; }
    if (action === "EVENT_DRILL_DOWN" || action === "EVENT_RTM_CREATE_GAP_PLAN" || action === "EVENT_RTM_FILTER_TASKS" || action === "EVENT_HEATMAP_CLICK") { event.preventDefault(); handleDashboardAction("view_drilldown"); return; }
    if (action === "EVENT_VIEW_TRACE" || action === "EVENT_RTM_OPEN_TRACE" || action === "EVENT_DOCS_OPEN_TRACE") { event.preventDefault(); surface === "rtm-dashboard" ? handleDashboardAction("view_trace") : navigateSurface("trace-explorer", "#surface-trace"); return; }
    if (action === "EVENT_APPROVAL_DECISION" || action === "EVENT_APPROVAL_APPROVE" || action === "EVENT_APPROVAL_REJECT" || action === "EVENT_REQUEST_CHANGES") { event.preventDefault(); handleApprovalDecision((target?.dataset.decision as "approved" | "rejected" | "changes-requested" | undefined) ?? "approved"); }
  };

  return (
    <main data-screen-id="global-shell" data-ds-id="ds:webui.shell.root" data-state={globalState} onClickCapture={handleGlobalAction} className="min-h-[100dvh] overflow-x-hidden bg-[var(--bg)] text-[var(--text)]" aria-label="WebUI PM Workspace">
      <a href="#workspace-content" className={`sr-only focus:not-sr-only focus:fixed focus:left-[var(--space-md)] focus:top-[var(--space-md)] focus:z-50 focus:rounded-[var(--radius)] focus:bg-[var(--surface)] focus:p-[var(--space-sm)] ${focus}`}>Skip to PM workspace content</a>
      <StatePlaceholders group="global" states={[...globalStates, ...commonStates]} />
      <ActionCatalogMarkers />
      <p className="sr-only" role="status" aria-live="polite">{liveMessage}</p>
      <header data-ds-id="ds:webui.shell.header" className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 px-[var(--space-md)] py-[var(--space-sm)]">
        <section data-ds-id="ds:webui.header.top-level" data-shell-header-id="ds:global-shell:header" className="mx-auto grid max-w-7xl gap-[var(--space-sm)] lg:grid-cols-[auto_minmax(18rem,1fr)_auto] lg:items-center" aria-label="Header Bar">
          <div className="flex items-center gap-[var(--space-sm)]">
            <button type="button" aria-controls="workspace-sidebar" aria-expanded={sidebarOpen} data-action="EVENT_TOGGLE_SIDEBAR" data-action-id="action-shell-toggle-nav" data-event="EVENT_SHELL_TOGGLE_NAV" onClick={() => setSidebarOpen((open) => !open)} className={`btn-secondary btn-sm ${focus}`}><Icon name={sidebarOpen ? "hide" : "show"} />{sidebarOpen ? "Hide sidebar" : "Show sidebar"}</button>
            <a href="#surface-rtm-dashboard" data-action="EVENT_HASH_NAVIGATE" data-action-id="action-shell-header-pm-space" data-event="EVENT_SHELL_HEADER_PM_SPACE" onClick={(event) => handleSurfaceLink(event, "rtm-dashboard", "#surface-rtm-dashboard")} className={`inline-flex items-center gap-[var(--space-xs)] font-mono text-sm font-semibold uppercase tracking-[0.16em] ${focus}`}><Icon name="dashboard" />Gmind PM</a>
          </div>
          <form data-ds-id="ds:webui.shell.global-search" data-action="EVENT_SEARCH" data-action-id="action-shell-open-search" data-event="EVENT_SHELL_OPEN_SEARCH" role="search" onSubmit={(event) => { event.preventDefault(); navigateSurface("search-results", "#surface-search"); }}>
            <label className="relative block" htmlFor="global-search">
              <span className="sr-only">Global Search Bar. Press Control K or Command K to focus, Escape to leave search.</span>
              <span className="pointer-events-none absolute ml-[var(--space-sm)] mt-[0.55rem] text-[var(--text-dim)]"><Icon name="search" /></span><input ref={searchRef} id="global-search" value={globalQuery} onChange={(event) => setGlobalQuery(event.target.value)} className={`w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-[var(--space-sm)] py-[var(--space-xs)] pl-[2.1rem] text-sm ${focus}`} placeholder="Search PRDs, tasks, docs, and traces" />
            </label>
          </form>
          <div data-ds-id="ds:webui.shell.sync-banner" className="flex flex-wrap items-center gap-[var(--space-xs)] text-sm">
            <span className="inline-flex items-center gap-[var(--space-xs)] rounded-full border border-[var(--border)] px-[var(--space-sm)] py-[var(--space-xs)] font-mono" aria-label="Online Status" aria-live="polite"><Icon name={globalState === "offline" || globalState === "forbidden" || globalState === "sync_conflict" ? "offline" : globalState === "loading" ? "loading" : "online"} /><span className="sr-only">Online Status: </span>{globalState === "offline" ? "Offline, read-only" : globalState === "loading" ? "Loading shell" : globalState === "forbidden" ? "Permission required" : globalState === "sync_conflict" ? "Sync conflict" : "Online"}</span>
            <StateSelect label="Shell state" icon="state" value={globalState} states={globalStates} onChange={(value) => setGlobalState(value as GlobalState)} />
          </div>
        </section>
      </header>

      <div data-ds-id="ds:webui.shell.main-region" className={`mx-auto grid min-w-0 max-w-7xl gap-[var(--space-md)] px-[var(--space-md)] py-[var(--space-md)] ${sidebarOpen ? "lg:grid-cols-[16rem_minmax(0,1fr)]" : "lg:grid-cols-[4.75rem_minmax(0,1fr)]"}`}>
        <aside id="workspace-sidebar" data-ds-id="ds:webui.shell.pm-nav.sidebar" data-state={sidebarOpen ? "expanded" : "collapsed"} className={`${sidebarOpen ? "block" : "hidden lg:block"} rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[var(--space-sm)]`} aria-label="Sidebar">
          <nav aria-label="Workspace sidebar surfaces">
            <p className={`px-[var(--space-xs)] pb-[var(--space-xs)] font-mono text-xs uppercase tracking-[0.14em] ${muted}`}>{sidebarOpen ? "PM surfaces" : "PM"}</p>
            <ul className="grid gap-[var(--space-xs)]">
              {surfaces.filter((item) => item.id !== "task-detail").map((item) => (
                <li key={item.id}>
                  <a href={item.hash} data-action="EVENT_HASH_NAVIGATE" onClick={(event) => handleSurfaceLink(event, item.id, item.hash)} aria-label={item.label} aria-current={surface === item.id ? "page" : undefined} className={`flex items-center gap-[var(--space-xs)] rounded-[var(--radius)] border border-[var(--border)] px-[var(--space-sm)] py-[var(--space-xs)] text-sm ${surface === item.id ? "bg-[var(--bg)]" : ""} ${focus}`}>
                    <Icon name={item.icon} />{sidebarOpen ? <span>{item.label}</span> : <span className="sr-only">{item.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <section id="workspace-content" data-ds-id="ds:webui.shell.active-surface" className="min-w-0 space-y-[var(--space-md)]" aria-label="Main Content Area">
          <header className="grid gap-[var(--space-sm)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className={`font-mono text-xs uppercase tracking-[0.14em] ${muted}`}>Route {activeSurface.route}</p>
              <h1>{activeSurface.label}</h1>
              <p className={`mt-[var(--space-xs)] text-sm ${muted}`}>Keyboard: Ctrl+K focuses search. Escape exits search or transient controls.</p>
            </div>
            <StateSelect label="Screen state" icon={activeState === "loading" ? "loading" : "state"} value={activeState} states={stateOptions} onChange={(value) => setSurfaceState(surface, value as ViewState)} />
          </header>

          {globalState !== "default" ? <WorkspaceStatePanel state={globalState} /> : null}
          <WorkspaceSurface key={activeSurface.id} spec={activeSurface} state={activeState} active decisionFeedback={decisionFeedback} onDashboardAction={handleDashboardAction} onApprovalDecision={handleApprovalDecision} />
        </section>
      </div>

      <footer className="border-t border-[var(--border)] px-[var(--space-md)] py-[var(--space-sm)]">
        <section data-ds-id="ds:webui.shell.footer" className={`mx-auto max-w-7xl text-sm ${muted}`} aria-label="Footer">Sync status is exposed through the shell; browser actions stay inside route navigation and API-ready component hooks.</section>
      </footer>
    </main>
  );
}

function StateSelect({ label, icon = "state", value, states, onChange }: { label: string; icon?: IconName; value: string; states: readonly string[]; onChange: (value: string) => void }) {
  return <label className="flex items-center gap-[var(--space-xs)] text-sm"><Icon name={icon} /><span className="sr-only">{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className={`rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-[var(--space-sm)] py-[var(--space-xs)] ${focus}`}>{states.map((state) => <option key={state} value={state}>{state.replaceAll("_", "-")}</option>)}</select></label>;
}

function StatePlaceholders({ states, group }: { states: readonly string[]; group: string }) {
  return <div className="sr-only" aria-hidden="true">{[...new Set(states)].map((state) => <span key={`${group}:${state}`} data-state={state} />)}</div>;
}

function WorkspaceSurface({ spec, state, active, decisionFeedback, onDashboardAction, onApprovalDecision }: { spec: SurfaceSpec; state: ViewState; active: boolean; decisionFeedback: string; onDashboardAction: (nextState: "view_drilldown" | "view_trace") => void; onApprovalDecision: (decision: "approved" | "rejected" | "changes-requested") => void }) {
  const isApproval = spec.id === "approval-gates";
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-action], [data-event], [data-action-id]");
    const action = target?.dataset.event ?? target?.dataset.action;
    if (spec.id === "rtm-dashboard" && (action === "EVENT_DRILL_DOWN" || action === "EVENT_HEATMAP_CLICK")) {
      event.preventDefault();
      onDashboardAction("view_drilldown");
    }
    if (spec.id === "rtm-dashboard" && action === "EVENT_VIEW_TRACE") {
      event.preventDefault();
      onDashboardAction("view_trace");
    }
    if (spec.id === "approval-gates" && (action === "EVENT_APPROVAL_DECISION" || action === "EVENT_REQUEST_CHANGES")) {
      event.preventDefault();
      onApprovalDecision((target?.dataset.decision as "approved" | "rejected" | "changes-requested" | undefined) ?? "approved");
    }
  };
  return (
    <section data-screen-id={screenIdFor(spec.id)} data-ds-id={spec.rootDsId} data-state={state} onClick={handleClick} className={`space-y-[var(--space-md)] ${animated}`} aria-labelledby={`${spec.id}-title`} hidden={!active}>
      <SurfaceAliasMarker surface={spec.id} />
      {spec.id === "approval-gates" ? <><span className="sr-only" id="panels" data-ds-id="ds:screen:approval-gates" aria-hidden="true" /><span className="sr-only" id="rtm" aria-hidden="true" /></> : null}
      <StatePlaceholders group={spec.id} states={spec.states} />
      <h2 id={`${spec.id}-title`} className="sr-only">{spec.title}</h2>
      {state !== "default" ? <WorkspaceStatePanel state={state as StatePanelKind} /> : null}
      {spec.id === "rtm-dashboard" ? <DashboardActionBar /> : null}
      {isApproval ? <ApprovalDecisionBar feedback={decisionFeedback} /> : null}
      <section data-ds-id={`${spec.rootDsId}:components`} className={gridFor(spec.id)} aria-label={isApproval ? "Approval Data" : spec.id === "rtm-dashboard" ? "Dashboard Panels" : `${spec.title} components`}>
        {spec.dsIds.map((dsId, index) => {
          const exactLabel = panelLabel(spec.id, dsId, index);
          return <article key={dsId} className={`${panel} min-w-0 ${colSpanFor(spec.id, dsId, index)}`} aria-label={exactLabel}><WorkspaceComponent dsId={dsId} /></article>;
        })}
      </section>
    </section>
  );
}

function DashboardActionBar() {
  return (
    <section className={`${panel} flex flex-wrap items-center gap-[var(--space-xs)]`} aria-label="Dashboard storyboard actions">
      <h3 className="sr-only">Dashboard actions</h3>
      <button type="button" data-action="EVENT_DRILL_DOWN" data-action-id="action-rtm-create-gap-plan" data-event="EVENT_RTM_CREATE_GAP_PLAN" className={`btn-primary btn-sm ${focus}`}><Icon name="drill" />Drill-down</button>
      <button type="button" data-action="EVENT_VIEW_TRACE" data-action-id="action-rtm-open-trace" data-event="EVENT_RTM_OPEN_TRACE" className={`btn-secondary btn-sm ${focus}`}><Icon name="trace" />View Trace</button>
    </section>
  );
}

function ApprovalDecisionBar({ feedback }: { feedback: string }) {
  return (
    <section className={`${panel} space-y-[var(--space-xs)]`} aria-label="Approval decision actions">
      <h3 className="font-semibold">Approval decision</h3>
      <p className={`text-sm ${muted}`} role="status" aria-live="polite">{feedback}</p>
      <div className="flex flex-wrap gap-[var(--space-xs)]">
        <button type="button" data-action="EVENT_APPROVAL_DECISION" data-action-id="action-approval-approve" data-event="EVENT_APPROVAL_APPROVE" data-decision="approved" className={`btn-primary btn-sm ${focus}`}><Icon name="approve" />Approve</button>
        <button type="button" data-action="EVENT_APPROVAL_DECISION" data-action-id="action-approval-reject" data-event="EVENT_APPROVAL_REJECT" data-decision="rejected" className={`btn-danger btn-sm ${focus}`}><Icon name="reject" />Reject</button>
        <button type="button" data-action="EVENT_REQUEST_CHANGES" data-action-id="action-approval-request-changes" data-event="EVENT_APPROVAL_REQUEST_CHANGES" data-decision="changes-requested" className={`btn-secondary btn-sm ${focus}`}><Icon name="changes" />Request Changes</button>
      </div>
    </section>
  );
}

function SurfaceAliasMarker({ surface }: { surface: SurfaceId }) {
  const aliases = surface === "task-list" ? ["screen:task-list", "screen:tasks"] : surface === "document-viewer" ? ["screen:doc-viewer", "screen:docs"] : [];
  if (aliases.length === 0) return null;
  return <>{aliases.map((alias) => <span key={alias} data-screen-id={alias} data-screen-alias-for={screenIdFor(surface)} aria-hidden="true" className="absolute h-px w-px overflow-hidden whitespace-nowrap">{alias}</span>)}</>;
}

function screenIdFor(surface: SurfaceId) {
  if (surface === "approval-gates") return "approval-gates";
  return surface;
}

function panelLabel(surface: SurfaceId, dsId: string, index: number) {
  const labels: Partial<Record<string, string>> = {
    "ds:webui.rtm.kpi-row": "Dashboard KPIs",
    "ds:webui.rtm.coverage-heatmap": "Panel 1: Coverage Heatmap",
    "ds:webui.rtm.task-progress": "Panel 2: Task Progress",
    "ds:webui.rtm.knowledge-graph-widget": "Panel 3: Knowledge Graph",
    "ds:webui.rtm.gap-analysis": "Panel 4: Gap Analysis",
    "ds:webui.approval.queue": "Queue Panel",
    "ds:webui.approval.evidence-hub": "Evidence Hub",
    "ds:webui.approval.decision-box": "Decision Box",
  };
  return labels[dsId] ?? `${surface} panel ${index + 1}`;
}

// Layout Decision: colSpanFor specifies which panels should span 2 columns on larger screens.
// Wide widgets (e.g. data tables, kanban boards, visual canvases, terminal mosaic) are given full width
// to prevent them from being compressed into a single 50% grid column which causes text overlap and layout breakage.
function colSpanFor(surface: SurfaceId, dsId: string, index: number): string {
  if (surface === "rtm-dashboard" && index === 0) return "md:col-span-2";
  if (surface === "task-list" && (dsId === "ds:webui.tasks.table" || dsId === "ds:webui.tasks.bulk-actions")) {
    return "lg:col-span-2";
  }
  if (surface === "safe-board" && dsId === "ds:webui.board.columns") {
    return "lg:col-span-2";
  }
  if (surface === "terminal-console") {
    return "lg:col-span-2";
  }
  if (surface === "git-graph-explorer" && dsId === "ds:webui.git-graph.canvas") {
    return "lg:col-span-2";
  }
  if (surface === "knowledge-graph" && dsId === "ds:webui.knowledge-graph.canvas") {
    return "lg:col-span-2";
  }
  if (surface === "portfolio-view") {
    return "lg:col-span-2";
  }
  return "";
}

// Layout Decision: Added `items-start` to grid container layouts.
// Aligning items to start of the row prevents shorter cards (e.g. TaskProgress or MiniGraph) from stretching
// vertically to match taller cards in the same row, resolving empty/blank spacing inside cards.
function gridFor(surface: SurfaceId) {
  if (surface === "approval-gates") return "grid gap-[var(--space-md)] lg:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.4fr)_minmax(16rem,0.8fr)] items-start";
  if (surface === "rtm-dashboard") return "grid gap-[var(--space-md)] md:grid-cols-2 items-start";
  return "grid gap-[var(--space-md)] lg:grid-cols-2 items-start";
}
