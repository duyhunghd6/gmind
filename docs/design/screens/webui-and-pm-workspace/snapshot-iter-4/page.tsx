"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { WorkspaceComponent, WorkspaceStatePanel } from "./workspace-components";

type SurfaceId = "rtm-dashboard" | "safe-board" | "task-list" | "task-detail" | "trace-explorer" | "doc-viewer" | "approval-gate" | "search-results";
type GlobalState = "default" | "loading" | "offline";
type ViewState = "default" | "loading" | "empty" | "error" | "offline" | "forbidden" | "saving" | "not_found" | "partial" | "insufficient_evidence" | "decision_submitted" | "view_drilldown" | "view_trace";
type StatePanelKind = Exclude<ViewState, "default">;

type SurfaceSpec = {
  id: SurfaceId;
  label: string;
  icon: IconName;
  title: string;
  route: string;
  hash: string;
  screenDsId: string;
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

const globalStates: GlobalState[] = ["default", "loading", "offline"];
const recoveryStates: ViewState[] = ["default", "loading", "empty", "error", "offline", "forbidden"];
const taskListStates: ViewState[] = [...recoveryStates, "saving"];
const commonStates: ViewState[] = ["default", "loading", "empty", "error", "offline", "forbidden", "saving", "not_found", "partial", "insufficient_evidence", "decision_submitted", "view_drilldown", "view_trace"];

const surfaces: SurfaceSpec[] = [
  { id: "rtm-dashboard", label: "Dashboard", icon: "dashboard", title: "RTM Dashboard", route: "/", hash: "#surface-rtm-dashboard", screenDsId: "ds:screen:rtm-dashboard", dsIds: ["ds:rtm-dashboard:kpis", "ds:rtm-dashboard:coverage-heatmap", "ds:rtm-dashboard:task-progress", "ds:rtm-dashboard:knowledge-graph-widget", "ds:rtm-dashboard:gap-analysis"], states: ["default", "loading", "empty", "error", "view_drilldown", "view_trace"], defaultState: "default" },
  { id: "safe-board", label: "Board", icon: "board", title: "SAFe board", route: "/board", hash: "#surface-board", screenDsId: "ds:screen:kanban-001", dsIds: ["ds:kanban:board-selector", "ds:kanban:stats", "ds:kanban:rte-escalation-badge", "ds:kanban:columns"], states: recoveryStates, defaultState: "default" },
  { id: "task-list", label: "Tasks", icon: "tasks", title: "Task list", route: "/tasks", hash: "#surface-tasks", screenDsId: "ds:screen:task-list-001", dsIds: ["ds:task-list:filters", "ds:task-list:bulk-actions", "ds:task-list:controls", "ds:task-list:table"], states: taskListStates, defaultState: "default" },
  { id: "task-detail", label: "Task Detail", icon: "detail", title: "Task detail workspace", route: "/tasks/:id", hash: "#surface-task-detail", screenDsId: "ds:screen:task-detail-001", dsIds: ["ds:task-detail:tabs", "ds:task-detail:editable-fields", "ds:task-detail:activity", "ds:task-detail:graph-widget"], states: [...recoveryStates, "saving", "not_found"], defaultState: "saving" },
  { id: "trace-explorer", label: "Trace", icon: "trace", title: "Trace explorer", route: "/trace/:id", hash: "#surface-trace", screenDsId: "ds:screen:trace-explorer-001", dsIds: ["ds:trace-explorer:toolbar", "ds:trace-explorer:graph-canvas", "ds:trace-explorer:dag-layers", "ds:trace-explorer:detail-panel"], states: [...recoveryStates, "partial"], defaultState: "partial" },
  { id: "doc-viewer", label: "Docs", icon: "docs", title: "Document viewer", route: "/docs/:id", hash: "#surface-docs", screenDsId: "ds:screen:doc-viewer-001", dsIds: ["ds:doc-viewer:tree", "ds:doc-viewer:section-badges", "ds:doc-viewer:content"], states: [...recoveryStates, "not_found"], defaultState: "default" },
  { id: "approval-gate", label: "Approval", icon: "approval", title: "Approval Gate", route: "/approval", hash: "#surface-approval", screenDsId: "ds:screen:approval-001", dsIds: ["ds:approval:queue", "ds:approval:evidence-hub", "ds:approval:decision-controls", "ds:approval:rtm-matrix"], states: ["default", "loading", "insufficient_evidence", "empty", "decision_submitted", "error", "offline", "forbidden"], defaultState: "default" },
  { id: "search-results", label: "Search", icon: "search", title: "Search results", route: "/search", hash: "#surface-search", screenDsId: "ds:screen:explorer-001", dsIds: ["ds:search-explorer:input", "ds:search-explorer:type-filters", "ds:search-explorer:results"], states: recoveryStates, defaultState: "default" },
];


type IconName = "dashboard" | "board" | "tasks" | "detail" | "trace" | "docs" | "approval" | "search" | "hide" | "show" | "online" | "offline" | "loading" | "state" | "drill" | "approve" | "reject" | "changes";
const iconPaths: Record<IconName, ReactNode> = {
  dashboard: <><path d="M4 13h6V4H4z" /><path d="M14 20h6V4h-6z" /><path d="M4 20h6v-3H4z" /></>, board: <><path d="M4 5h16" /><path d="M8 5v15" /><path d="M16 5v15" /><path d="M5 9h2M13 13h2M17 9h2" /></>, tasks: <><path d="M8 7h12M8 12h12M8 17h12" /><path d="m3.5 7 1 1 2-2M3.5 12l1 1 2-2M3.5 17l1 1 2-2" /></>, detail: <><path d="M5 4h10l4 4v12H5z" /><path d="M14 4v5h5M8 13h8M8 17h6" /></>, trace: <><circle cx="5" cy="12" r="2" /><circle cx="12" cy="6" r="2" /><circle cx="19" cy="12" r="2" /><circle cx="12" cy="18" r="2" /><path d="m7 11 3.5-3M13.5 7 17 11M17 13l-3.5 3M10.5 17 7 13" /></>, docs: <><path d="M6 3h9l3 3v15H6z" /><path d="M14 3v4h4M9 11h6M9 15h6" /></>, approval: <><path d="M4 12l5 5L20 6" /><path d="M4 20h16" /></>, search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>, hide: <><path d="M4 5h16M4 19h16M4 12h10" /><path d="m17 9 3 3-3 3" /></>, show: <><path d="M4 5h16M4 19h16M10 12h10" /><path d="m7 9-3 3 3 3" /></>, online: <><circle cx="12" cy="12" r="8" /><path d="m8.5 12 2.5 2.5L16 9" /></>, offline: <><circle cx="12" cy="12" r="8" /><path d="M8 8l8 8M16 8l-8 8" /></>, loading: <><path d="M12 4v4M12 16v4M4 12h4M16 12h4" /><path d="m6.3 6.3 2.8 2.8M14.9 14.9l2.8 2.8" /></>, state: <><path d="M5 7h14M5 12h14M5 17h14" /><circle cx="9" cy="7" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="11" cy="17" r="1.5" /></>, drill: <><path d="M5 5h6v6H5z" /><path d="M13 13h6v6h-6z" /><path d="M11 8h4a2 2 0 0 1 2 2v3" /></>, approve: <path d="m4 12 5 5L20 6" />, reject: <path d="M6 6l12 12M18 6 6 18" />, changes: <><path d="M4 7h10M4 12h16M4 17h10" /><path d="m16 5 3 2-3 2M16 15l3 2-3 2" /></>,
};
function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name]}</svg>;
}

const surfaceAliases: Record<string, SurfaceId> = {
  "/": "rtm-dashboard",
  "/board": "safe-board",
  "/tasks": "task-list",
  "/tasks/:id": "task-detail",
  "/trace/:id": "trace-explorer",
  "/docs/:id": "doc-viewer",
  "/approval": "approval-gate",
  "/search": "search-results",
  "#surface-safe-board": "safe-board",
  "#surface-task-list": "task-list",
  "#surface-trace-explorer": "trace-explorer",
  "#surface-doc-viewer": "doc-viewer",
  "#surface-approval-gates": "approval-gate",
  "#surface-search-results": "search-results",
  "#approval": "approval-gate",
  "#panels": "approval-gate",
  "#rtm": "approval-gate",
  "#tasks": "task-list",
  "#task-detail": "task-detail",
  "#trace": "trace-explorer",
  "#docs": "doc-viewer",
  "#search": "search-results",
};
const hashToSurface = new Map< string, SurfaceId>([
  ...surfaces.map((surface) => [surface.hash, surface.id] as [string, SurfaceId]),
  ...Object.entries(surfaceAliases).filter(([key]) => key.startsWith("#")),
]);

function resolveInitialSurface(initialActiveId?: string): SurfaceId {
  if (!initialActiveId) return "rtm-dashboard";
  const lower = initialActiveId.toLowerCase();
  const direct = surfaceAliases[lower] ?? hashToSurface.get(lower);
  if (direct) return direct;
  return surfaces.find((item) => lower.includes(item.id) || lower.includes(item.screenDsId.toLowerCase()) || item.dsIds.some((dsId) => lower.includes(dsId.toLowerCase())))?.id ?? "rtm-dashboard";
}

export default function WebUIPMWorkspaceLayout({ initialActiveId }: WebUIPMWorkspaceLayoutProps = {}) {
  const initialSurface = resolveInitialSurface(initialActiveId);
  const [surface, setSurface] = useState<SurfaceId>(initialSurface);
  const [globalState, setGlobalState] = useState<GlobalState>("default");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [surfaceStates, setSurfaceStates] = useState<Record<SurfaceId, ViewState>>(() => Object.fromEntries(surfaces.map((item) => [item.id, item.defaultState])) as Record<SurfaceId, ViewState>);
  const [decisionFeedback, setDecisionFeedback] = useState("Awaiting approval decision.");
  const [globalQuery, setGlobalQuery] = useState("approval evidence");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const scrollToHash = (hash: string) => {
      if (!hashToSurface.has(hash)) return;
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
      });
    };
    const syncFromHash = () => {
      const hash = window.location.hash || "#surface-rtm-dashboard";
      setSurface(hashToSurface.get(hash) ?? "rtm-dashboard");
      scrollToHash(hash);
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
  const liveMessage = globalState === "offline" ? "Workspace is offline and read-only" : `${activeSurface.title} state is ${activeState.replaceAll("_", " ")}`;
  const stateOptions = useMemo(() => activeSurface.states, [activeSurface]);

  const setSurfaceState = (target: SurfaceId, state: ViewState) => setSurfaceStates((current) => ({ ...current, [target]: state }));
  const navigateSurface = (target: SurfaceId, hash: string) => {
    setSurface(target);
    if (window.location.hash === hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
    } else {
      window.location.hash = hash;
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
    setSurfaceState("approval-gate", "decision_submitted");
    setDecisionFeedback(`Approval decision submitted: ${decision.replace("-", " ")}.`);
    navigateSurface("approval-gate", "#surface-approval");
  };
  const handleGlobalAction = (event: MouseEvent<HTMLElement>) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-action]");
    const action = target?.dataset.action;
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
    if (action === "EVENT_REFRESH") { event.preventDefault(); setGlobalState("default"); setSurfaceState(surface, "default"); return; }
    if (action === "EVENT_BACK") { event.preventDefault(); navigateSurface(surface === "approval-gate" ? "rtm-dashboard" : "task-list", surface === "approval-gate" ? "#surface-rtm-dashboard" : "#surface-tasks"); return; }
    if (action === "EVENT_VIEW_TASK" || action === "EVENT_FIELD_EDIT") { event.preventDefault(); setSurfaceState("task-detail", action === "EVENT_FIELD_EDIT" ? "saving" : "default"); navigateSurface("task-detail", "#surface-task-detail"); return; }
    if (action === "EVENT_VIEW_DOC" || action === "EVENT_BEADS_ID_CLICK") { event.preventDefault(); setSurfaceState("doc-viewer", "default"); navigateSurface("doc-viewer", "#surface-docs"); return; }
    if (action === "EVENT_DRILL_DOWN" || action === "EVENT_HEATMAP_CLICK") { event.preventDefault(); handleDashboardAction("view_drilldown"); return; }
    if (action === "EVENT_VIEW_TRACE") { event.preventDefault(); surface === "rtm-dashboard" ? handleDashboardAction("view_trace") : navigateSurface("trace-explorer", "#surface-trace"); return; }
    if (action === "EVENT_APPROVAL_DECISION" || action === "EVENT_REQUEST_CHANGES") { event.preventDefault(); handleApprovalDecision((target.dataset.decision as "approved" | "rejected" | "changes-requested" | undefined) ?? "approved"); }
  };

  return (
    <main data-screen-id="global-shell" data-ds-id="ds:global_shell" data-state={globalState} onClickCapture={handleGlobalAction} className="min-h-[100dvh] bg-[var(--bg)] text-[var(--text)]" aria-label="WebUI PM Workspace">
      <a href="#workspace-content" className={`sr-only focus:not-sr-only focus:fixed focus:left-[var(--space-md)] focus:top-[var(--space-md)] focus:z-50 focus:rounded-[var(--radius)] focus:bg-[var(--surface)] focus:p-[var(--space-sm)] ${focus}`}>Skip to PM workspace content</a>
      <StatePlaceholders group="global" states={[...globalStates, ...commonStates]} />
      <p className="sr-only" role="status" aria-live="polite">{liveMessage}</p>
      <header data-ds-id="ds:component:header" className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 px-[var(--space-md)] py-[var(--space-sm)]">
        <section data-ds-id="ds:global-shell:header" className="mx-auto grid max-w-7xl gap-[var(--space-sm)] lg:grid-cols-[auto_minmax(18rem,1fr)_auto] lg:items-center" aria-label="Header Bar">
          <div className="flex items-center gap-[var(--space-sm)]">
            <button type="button" aria-controls="workspace-sidebar" aria-expanded={sidebarOpen} data-action="EVENT_TOGGLE_SIDEBAR" onClick={() => setSidebarOpen((open) => !open)} className={`btn-secondary btn-sm ${focus}`}><Icon name={sidebarOpen ? "hide" : "show"} />{sidebarOpen ? "Hide sidebar" : "Show sidebar"}</button>
            <a href="#surface-rtm-dashboard" data-action="EVENT_HASH_NAVIGATE" onClick={(event) => handleSurfaceLink(event, "rtm-dashboard", "#surface-rtm-dashboard")} className={`inline-flex items-center gap-[var(--space-xs)] font-mono text-sm font-semibold uppercase tracking-[0.16em] ${focus}`}><Icon name="dashboard" />Gmind PM</a>
          </div>
          <form data-ds-id="ds:global-shell:search" data-action="EVENT_SEARCH" role="search" onSubmit={(event) => { event.preventDefault(); navigateSurface("search-results", "#surface-search"); }}>
            <label className="relative block" htmlFor="global-search">
              <span className="sr-only">Global Search Bar. Press Control K or Command K to focus, Escape to leave search.</span>
              <span className="pointer-events-none absolute ml-[var(--space-sm)] mt-[0.55rem] text-[var(--text-dim)]"><Icon name="search" /></span><input ref={searchRef} id="global-search" value={globalQuery} onChange={(event) => setGlobalQuery(event.target.value)} className={`w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-[var(--space-sm)] py-[var(--space-xs)] pl-[2.1rem] text-sm ${focus}`} placeholder="Search PRDs, tasks, docs, and traces" />
            </label>
          </form>
          <div data-ds-id="ds:global-shell:sync-banner" className="flex flex-wrap items-center gap-[var(--space-xs)] text-sm">
            <span className="inline-flex items-center gap-[var(--space-xs)] rounded-full border border-[var(--border)] px-[var(--space-sm)] py-[var(--space-xs)] font-mono" aria-label="Online Status" aria-live="polite"><Icon name={globalState === "offline" ? "offline" : globalState === "loading" ? "loading" : "online"} /><span className="sr-only">Online Status: </span>{globalState === "offline" ? "Offline, read-only" : globalState === "loading" ? "Loading shell" : "Online"}</span>
            <StateSelect label="Shell state" icon="state" value={globalState} states={globalStates} onChange={(value) => setGlobalState(value as GlobalState)} />
          </div>
        </section>
        <nav className="mx-auto mt-[var(--space-sm)] max-w-7xl overflow-x-auto" aria-label="Workspace surfaces quick navigation">
          <ul className="flex min-w-max gap-[var(--space-xs)]">
            {surfaces.map((item) => <li key={item.id}><a href={item.hash} data-action="EVENT_HASH_NAVIGATE" onClick={(event) => handleSurfaceLink(event, item.id, item.hash)} aria-current={surface === item.id ? "page" : undefined} className={`inline-flex items-center gap-[var(--space-xs)] rounded-[var(--radius)] border border-[var(--border)] px-[var(--space-sm)] py-[var(--space-xs)] text-sm ${animated} hover:-translate-y-0.5 hover:bg-[var(--bg)] ${focus}`}><Icon name={item.icon} />{item.label}</a></li>)}
          </ul>
        </nav>
      </header>

      <div data-ds-id="ds:global-shell:root" className={`mx-auto grid max-w-7xl gap-[var(--space-md)] px-[var(--space-md)] py-[var(--space-md)] ${sidebarOpen ? "lg:grid-cols-[16rem_minmax(0,1fr)]" : "lg:grid-cols-[4.75rem_minmax(0,1fr)]"}`}>
        <aside id="workspace-sidebar" data-ds-id="ds:component:sidebar" data-state={sidebarOpen ? "expanded" : "collapsed"} className={`${sidebarOpen ? "block" : "hidden lg:block"} rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[var(--space-sm)]`} aria-label="Sidebar">
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

        <section id="workspace-content" data-ds-id="ds:global-shell:active-surface" className="space-y-[var(--space-md)]" aria-label="Main Content Area">
          <header className="grid gap-[var(--space-sm)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className={`font-mono text-xs uppercase tracking-[0.14em] ${muted}`}>Route {activeSurface.route}</p>
              <h1>{activeSurface.label}</h1>
              <p className={`mt-[var(--space-xs)] text-sm ${muted}`}>Keyboard: Ctrl+K focuses search. Escape exits search or transient controls.</p>
            </div>
            <StateSelect label="Screen state" icon={activeState === "loading" ? "loading" : "state"} value={activeState} states={stateOptions} onChange={(value) => setSurfaceState(surface, value as ViewState)} />
          </header>

          {globalState === "offline" ? <WorkspaceStatePanel state="offline" /> : null}
          {globalState === "loading" ? <WorkspaceStatePanel state="loading" /> : null}
          <WorkspaceSurface key={activeSurface.id} spec={activeSurface} state={activeState} active decisionFeedback={decisionFeedback} onDashboardAction={handleDashboardAction} onApprovalDecision={handleApprovalDecision} />
        </section>
      </div>

      <footer className="border-t border-[var(--border)] px-[var(--space-md)] py-[var(--space-sm)]">
        <section className={`mx-auto max-w-7xl text-sm ${muted}`} aria-label="Footer">Sync status is exposed through the shell; browser actions stay inside route navigation and API-ready component hooks.</section>
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
  const isApproval = spec.id === "approval-gate";
  const rootDsId = `ds:${rootPrefix(spec.id)}:root`;
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-action]");
    const action = target?.dataset.action;
    if (spec.id === "rtm-dashboard" && (action === "EVENT_DRILL_DOWN" || action === "EVENT_HEATMAP_CLICK")) {
      event.preventDefault();
      onDashboardAction("view_drilldown");
    }
    if (spec.id === "rtm-dashboard" && action === "EVENT_VIEW_TRACE") {
      event.preventDefault();
      onDashboardAction("view_trace");
    }
    if (spec.id === "approval-gate" && (action === "EVENT_APPROVAL_DECISION" || action === "EVENT_REQUEST_CHANGES")) {
      event.preventDefault();
      onApprovalDecision((target?.dataset.decision as "approved" | "rejected" | "changes-requested" | undefined) ?? "approved");
    }
  };
  return (
    <section id={spec.hash.slice(1)} data-screen-id={screenIdFor(spec.id)} data-ds-id={spec.screenDsId} data-state={state} onClick={handleClick} className={`space-y-[var(--space-md)] ${animated}`} aria-labelledby={`${spec.id}-title`} hidden={!active}>
      <SurfaceAliasMarker surface={spec.id} />
      {spec.id === "rtm-dashboard" ? <span className="sr-only" data-ds-id="ds:screen:rtm-dashboard-001" aria-hidden="true" /> : null}
      {spec.id === "approval-gate" ? <><span className="sr-only" id="panels" data-ds-id="ds:screen:approval-gates" aria-hidden="true" /><span className="sr-only" id="rtm" aria-hidden="true" /></> : null}
      <StatePlaceholders group={spec.id} states={spec.states} />
      <h2 id={`${spec.id}-title`} className="sr-only">{spec.title}</h2>
      {state !== "default" ? <WorkspaceStatePanel state={state as StatePanelKind} /> : null}
      {spec.id === "rtm-dashboard" ? <DashboardActionBar /> : null}
      {isApproval ? <ApprovalDecisionBar feedback={decisionFeedback} /> : null}
      <section data-ds-id={rootDsId} className={gridFor(spec.id)} aria-label={isApproval ? "Approval Data" : spec.id === "rtm-dashboard" ? "Dashboard Panels" : `${spec.title} components`}>
        {spec.dsIds.map((dsId, index) => {
          const exactLabel = panelLabel(spec.id, dsId, index);
          return <article key={dsId} className={`${panel} ${spec.id === "rtm-dashboard" && index === 0 ? "md:col-span-2" : ""}`} aria-label={exactLabel}><WorkspaceComponent dsId={dsId} /></article>;
        })}
      </section>
    </section>
  );
}

function DashboardActionBar() {
  return (
    <section className={`${panel} flex flex-wrap items-center gap-[var(--space-xs)]`} aria-label="Dashboard storyboard actions">
      <h3 className="sr-only">Dashboard actions</h3>
      <button type="button" data-action="EVENT_DRILL_DOWN" className={`btn-primary btn-sm ${focus}`}><Icon name="drill" />Drill-down</button>
      <button type="button" data-action="EVENT_VIEW_TRACE" className={`btn-secondary btn-sm ${focus}`}><Icon name="trace" />View Trace</button>
    </section>
  );
}

function ApprovalDecisionBar({ feedback }: { feedback: string }) {
  return (
    <section className={`${panel} space-y-[var(--space-xs)]`} aria-label="Approval decision actions">
      <h3 className="font-semibold">Approval decision</h3>
      <p className={`text-sm ${muted}`} role="status" aria-live="polite">{feedback}</p>
      <div className="flex flex-wrap gap-[var(--space-xs)]">
        <button type="button" data-action="EVENT_APPROVAL_DECISION" data-decision="approved" className={`btn-primary btn-sm ${focus}`}><Icon name="approve" />Approve</button>
        <button type="button" data-action="EVENT_APPROVAL_DECISION" data-decision="rejected" className={`btn-danger btn-sm ${focus}`}><Icon name="reject" />Reject</button>
        <button type="button" data-action="EVENT_REQUEST_CHANGES" data-decision="changes-requested" className={`btn-secondary btn-sm ${focus}`}><Icon name="changes" />Request Changes</button>
      </div>
    </section>
  );
}

function SurfaceAliasMarker({ surface }: { surface: SurfaceId }) {
  const aliases = surface === "task-list" ? ["screen:task-list", "screen:tasks"] : surface === "doc-viewer" ? ["screen:doc-viewer", "screen:docs"] : [];
  if (aliases.length === 0) return null;
  return <>{aliases.map((alias) => <span key={alias} data-screen-id={alias} data-screen-alias-for={screenIdFor(surface)} aria-hidden="true" className="absolute h-px w-px overflow-hidden whitespace-nowrap">{alias}</span>)}</>;
}

function screenIdFor(surface: SurfaceId) {
  if (surface === "approval-gate") return "screen:approval-gates";
  return `screen:${surface}`;
}

function panelLabel(surface: SurfaceId, dsId: string, index: number) {
  const labels: Partial<Record<string, string>> = {
    "ds:rtm-dashboard:kpis": "Dashboard KPIs",
    "ds:rtm-dashboard:coverage-heatmap": "Panel 1: Coverage Heatmap",
    "ds:rtm-dashboard:task-progress": "Panel 2: Task Progress",
    "ds:rtm-dashboard:knowledge-graph-widget": "Panel 3: Knowledge Graph",
    "ds:rtm-dashboard:gap-analysis": "Panel 4: Gap Analysis",
    "ds:approval:queue": "Queue Panel",
    "ds:approval:evidence-hub": "Evidence Hub",
    "ds:approval:decision-controls": "Decision Box",
  };
  return labels[dsId] ?? `${surface} panel ${index + 1}`;
}

function rootPrefix(surface: SurfaceId) {
  if (surface === "safe-board") return "kanban";
  if (surface === "search-results") return "search-explorer";
  return surface;
}

function gridFor(surface: SurfaceId) {
  if (surface === "approval-gate") return "grid gap-[var(--space-md)] lg:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.4fr)_minmax(16rem,0.8fr)]";
  if (surface === "rtm-dashboard") return "grid gap-[var(--space-md)] md:grid-cols-2";
  return "grid gap-[var(--space-md)] lg:grid-cols-2";
}
