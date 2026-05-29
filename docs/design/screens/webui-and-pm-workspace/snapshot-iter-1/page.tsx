"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WorkspaceComponent, WorkspaceStatePanel } from "./workspace-components";

type SurfaceId = "rtm-dashboard" | "safe-board" | "task-list" | "task-detail" | "trace-explorer" | "doc-viewer" | "approval-gate" | "search-results";
type GlobalState = "default" | "loading" | "offline";
type ViewState = "default" | "loading" | "empty" | "error" | "offline" | "forbidden" | "saving" | "not_found" | "partial" | "insufficient_evidence" | "decision_submitted";
type StatePanelKind = Exclude<ViewState, "default">;

type SurfaceSpec = {
  id: SurfaceId;
  label: string;
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
const commonStates: ViewState[] = ["default", "loading", "empty", "error", "offline", "forbidden", "saving", "not_found", "partial", "insufficient_evidence", "decision_submitted"];

const surfaces: SurfaceSpec[] = [
  { id: "rtm-dashboard", label: "Dashboard", title: "RTM Dashboard", route: "/", hash: "#surface-rtm-dashboard", screenDsId: "ds:screen:rtm-dashboard-001", dsIds: ["ds:rtm-dashboard:kpis", "ds:rtm-dashboard:coverage-heatmap", "ds:rtm-dashboard:task-progress", "ds:rtm-dashboard:knowledge-graph-widget", "ds:rtm-dashboard:gap-analysis"], states: ["default", "loading", "empty", "error"], defaultState: "default" },
  { id: "safe-board", label: "Board", title: "SAFe board", route: "/board", hash: "#surface-safe-board", screenDsId: "ds:screen:kanban-001", dsIds: ["ds:kanban:board-selector", "ds:kanban:stats", "ds:kanban:rte-escalation-badge", "ds:kanban:columns"], states: recoveryStates, defaultState: "default" },
  { id: "task-list", label: "Tasks", title: "Task list", route: "/tasks", hash: "#surface-task-list", screenDsId: "ds:screen:task-list-001", dsIds: ["ds:task-list:filters", "ds:task-list:bulk-actions", "ds:task-list:table"], states: recoveryStates, defaultState: "default" },
  { id: "task-detail", label: "Task Detail", title: "Task detail workspace", route: "/tasks/:id", hash: "#surface-task-detail", screenDsId: "ds:screen:task-detail-001", dsIds: ["ds:task-detail:tabs", "ds:task-detail:editable-fields", "ds:task-detail:activity", "ds:task-detail:graph-widget"], states: [...recoveryStates, "saving", "not_found"], defaultState: "saving" },
  { id: "trace-explorer", label: "Trace", title: "Trace explorer", route: "/trace/:id", hash: "#surface-trace-explorer", screenDsId: "ds:screen:trace-explorer-001", dsIds: ["ds:trace-explorer:toolbar", "ds:trace-explorer:graph-canvas", "ds:trace-explorer:dag-layers", "ds:trace-explorer:detail-panel"], states: [...recoveryStates, "partial"], defaultState: "partial" },
  { id: "doc-viewer", label: "Docs", title: "Document viewer", route: "/docs/:id", hash: "#surface-doc-viewer", screenDsId: "ds:screen:doc-viewer-001", dsIds: ["ds:doc-viewer:tree", "ds:doc-viewer:section-badges", "ds:doc-viewer:content"], states: [...recoveryStates, "not_found"], defaultState: "default" },
  { id: "approval-gate", label: "Approval", title: "Approval Gate", route: "/approval", hash: "#surface-approval-gates", screenDsId: "ds:screen:approval-001", dsIds: ["ds:approval:queue", "ds:approval:evidence-hub", "ds:approval:decision-controls", "ds:approval:rtm-matrix"], states: ["default", "loading", "insufficient_evidence", "empty", "decision_submitted", "error", "offline", "forbidden"], defaultState: "default" },
  { id: "search-results", label: "Search", title: "Search results", route: "/search", hash: "#surface-search-results", screenDsId: "ds:screen:explorer-001", dsIds: ["ds:search-explorer:input", "ds:search-explorer:type-filters", "ds:search-explorer:results"], states: recoveryStates, defaultState: "default" },
];

const hashToSurface = new Map(surfaces.map((surface) => [surface.hash, surface.id]));

export default function WebUIPMWorkspaceLayout({ initialActiveId }: WebUIPMWorkspaceLayoutProps = {}) {
  const initialSurface = initialActiveId?.includes("approval") ? "approval-gate" : "rtm-dashboard";
  const [surface, setSurface] = useState<SurfaceId>(initialSurface);
  const [globalState, setGlobalState] = useState<GlobalState>("default");
  const [surfaceStates, setSurfaceStates] = useState<Record<SurfaceId, ViewState>>(() => Object.fromEntries(surfaces.map((item) => [item.id, item.defaultState])) as Record<SurfaceId, ViewState>);
  const [globalQuery, setGlobalQuery] = useState("approval evidence");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const syncFromHash = () => setSurface(hashToSurface.get(window.location.hash) ?? "rtm-dashboard");
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

  return (
    <main data-screen-id="global-shell" data-ds-id="ds:screen:webui-pm-workspace-001" data-state={globalState} className="min-h-[100dvh] bg-[var(--bg)] text-[var(--text)]" aria-label="WebUI PM Workspace">
      <a href="#workspace-content" className={`sr-only focus:not-sr-only focus:fixed focus:left-[var(--space-md)] focus:top-[var(--space-md)] focus:z-50 focus:rounded-[var(--radius)] focus:bg-[var(--surface)] focus:p-[var(--space-sm)] ${focus}`}>Skip to PM workspace content</a>
      <StatePlaceholders states={[...globalStates, ...commonStates]} />
      <p className="sr-only" role="status" aria-live="polite">{liveMessage}</p>
      <header data-ds-id="ds:component:header" className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 px-[var(--space-md)] py-[var(--space-sm)]">
        <section data-ds-id="ds:global-shell:root" className="mx-auto grid max-w-7xl gap-[var(--space-sm)] lg:grid-cols-[auto_minmax(18rem,1fr)_auto] lg:items-center" aria-label="Header Bar">
          <a href="#surface-rtm-dashboard" data-action="EVENT_HASH_NAVIGATE" className={`font-mono text-sm font-semibold uppercase tracking-[0.16em] ${focus}`}>Gmind PM</a>
          <form data-ds-id="ds:global-shell:header" data-action="EVENT_SEARCH" role="search" onSubmit={(event) => { event.preventDefault(); window.location.hash = "surface-search-results"; setSurface("search-results"); }}>
            <label className="block" htmlFor="global-search">
              <span className="sr-only">Global Search Bar. Press Control K or Command K to focus, Escape to leave search.</span>
              <input ref={searchRef} id="global-search" value={globalQuery} onChange={(event) => setGlobalQuery(event.target.value)} className={`w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-[var(--space-sm)] py-[var(--space-xs)] text-sm ${focus}`} placeholder="Search PRDs, tasks, docs, and traces" />
            </label>
          </form>
          <div data-ds-id="ds:global-shell:sync-banner" className="flex flex-wrap items-center gap-[var(--space-xs)] text-sm">
            <span className="rounded-full border border-[var(--border)] px-[var(--space-sm)] py-[var(--space-xs)] font-mono" aria-live="polite">{globalState === "offline" ? "Offline, read-only" : globalState === "loading" ? "Loading shell" : "Online"}</span>
            <StateSelect label="Shell state" value={globalState} states={globalStates} onChange={(value) => setGlobalState(value as GlobalState)} />
          </div>
        </section>
        <nav className="mx-auto mt-[var(--space-sm)] max-w-7xl overflow-x-auto" aria-label="Workspace surfaces">
          <ul className="flex min-w-max gap-[var(--space-xs)]">
            {surfaces.map((item) => <li key={item.id}><a href={item.hash} data-action="EVENT_HASH_NAVIGATE" onClick={() => setSurface(item.id)} aria-current={surface === item.id ? "page" : undefined} className={`block rounded-[var(--radius)] border border-[var(--border)] px-[var(--space-sm)] py-[var(--space-xs)] text-sm ${animated} hover:-translate-y-0.5 hover:bg-[var(--bg)] ${focus}`}>{item.label}</a></li>)}
          </ul>
        </nav>
      </header>

      <section id="workspace-content" data-ds-id="ds:global-shell:active-surface" className="mx-auto max-w-7xl space-y-[var(--space-md)] px-[var(--space-md)] py-[var(--space-md)]" aria-label="Main Content Area">
        <header className="grid gap-[var(--space-sm)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className={`font-mono text-xs uppercase tracking-[0.14em] ${muted}`}>Route {activeSurface.route}</p>
            <h1>{activeSurface.label}</h1>
            <p className={`mt-[var(--space-xs)] text-sm ${muted}`}>Keyboard: Ctrl+K focuses search. Escape exits search or transient controls.</p>
          </div>
          <StateSelect label="Screen state" value={activeState} states={stateOptions} onChange={(value) => setSurfaceStates((current) => ({ ...current, [surface]: value as ViewState }))} />
        </header>

        {globalState === "offline" ? <WorkspaceStatePanel state="offline" /> : null}
        {globalState === "loading" ? <WorkspaceStatePanel state="loading" /> : null}
        <WorkspaceSurface spec={activeSurface} state={activeState} />
      </section>

      <footer className="border-t border-[var(--border)] px-[var(--space-md)] py-[var(--space-sm)]">
        <section className={`mx-auto max-w-7xl text-sm ${muted}`} aria-label="Footer">Sync status is exposed through the shell; browser actions stay inside route navigation and API-ready component hooks.</section>
      </footer>
    </main>
  );
}

function StateSelect({ label, value, states, onChange }: { label: string; value: string; states: readonly string[]; onChange: (value: string) => void }) {
  return <label className="flex items-center gap-[var(--space-xs)] text-sm"><span className="sr-only">{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)} className={`rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] px-[var(--space-sm)] py-[var(--space-xs)] ${focus}`}>{states.map((state) => <option key={state} value={state}>{state.replaceAll("_", "-")}</option>)}</select></label>;
}

function StatePlaceholders({ states }: { states: readonly string[] }) {
  return <div className="sr-only" aria-hidden="true">{states.map((state) => <span key={state} data-state={state} />)}</div>;
}

function WorkspaceSurface({ spec, state }: { spec: SurfaceSpec; state: ViewState }) {
  const isApproval = spec.id === "approval-gate";
  const screenId = isApproval ? "approval-gate" : spec.id;
  return (
    <section id={spec.hash.slice(1)} data-screen-id={screenId} data-ds-id={spec.screenDsId} data-state={state} className={`space-y-[var(--space-md)] ${animated}`} aria-labelledby={`${spec.id}-title`}>
      <StatePlaceholders states={spec.states} />
      <h2 id={`${spec.id}-title`} className="sr-only">{spec.title}</h2>
      {state !== "default" ? <WorkspaceStatePanel state={state as StatePanelKind} /> : null}
      <section className={gridFor(spec.id)} aria-label={isApproval ? "Approval Data" : spec.id === "rtm-dashboard" ? "Dashboard Panels" : `${spec.title} components`}>
        {spec.dsIds.map((dsId, index) => <article key={dsId} className={`${panel} ${spec.id === "rtm-dashboard" && index === 0 ? "md:col-span-2" : ""}`} aria-label={`${spec.title} panel ${index + 1}`}><WorkspaceComponent dsId={dsId} /></article>)}
      </section>
    </section>
  );
}

function gridFor(surface: SurfaceId) {
  if (surface === "approval-gate") return "grid gap-[var(--space-md)] lg:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.4fr)_minmax(16rem,0.8fr)]";
  if (surface === "rtm-dashboard") return "grid gap-[var(--space-md)] md:grid-cols-2";
  return "grid gap-[var(--space-md)] lg:grid-cols-2";
}
