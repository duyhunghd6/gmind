/**
 * Diagrams Registry — Re-export tất cả 32 W/WO sequence diagrams
 * Mỗi diagram file export 1 `DiagramEntry` gồm:
 *   - 2 mermaid codes (with/without)
 *   - 1 quiz object
 */

/* ──────── Types ──────── */
export interface QuizEntry {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  theory: string;
}

export interface DiagramEntry {
  id: string;
  group: DiagramGroup;
  groupLabel: string;
  title: string;
  description: string;
  accent: "cyan" | "teal" | "amber" | "rose";
  withLabel: string;
  withoutLabel: string;
  withMermaid: string;
  withoutMermaid: string;
  quiz: QuizEntry;
}

export type DiagramGroup =
  | "toolcall"
  | "bash"
  | "code"
  | "mcp"
  | "skill"
  | "workflow"
  | "subagent";

export const GROUP_META: Record<DiagramGroup, { label: string; accent: "cyan" | "teal" | "amber" | "rose"; description: string }> = {
  toolcall: { label: "Tool Call cơ bản", accent: "cyan", description: "LLM mở rộng năng lực bằng cách gọi công cụ bên ngoài" },
  bash:     { label: "Bash Shell", accent: "amber", description: "LLM thực thi lệnh hệ thống để chẩn đoán và sửa lỗi" },
  code:     { label: "Code & Debugging", accent: "teal", description: "LLM đọc, sửa, và kiểm thử code trực tiếp" },
  mcp:      { label: "MCP Server", accent: "rose", description: "Model Context Protocol kết nối LLM với dịch vụ ngoài" },
  skill:    { label: "Agent Skills", accent: "cyan", description: "Đóng gói tri thức chuyên biệt để LLM tái sử dụng" },
  workflow: { label: "Workflows", accent: "amber", description: "Quy trình đa bước tự động hoá bằng /slash-command" },
  subagent: { label: "SubAgent / Task", accent: "rose", description: "Chia nhỏ công việc phức tạp thành Task riêng — mỗi Task có Context Window riêng, tránh loãng context và hallucination" },
};

/* ──────── Lazy imports ──────── */
// Each diagram is loaded on-demand to keep bundle size small.
// We use dynamic imports wrapped in a registry.

const diagramModules = {
  "01": () => import("./01_toolcall_multiply_calculator"),
  "02": () => import("./02_toolcall_weather_api"),
  "03": () => import("./03_toolcall_goldprice_api"),
  "04": () => import("./04_toolcall_google_search"),
  "05": () => import("./05_toolcall_exchange_rate_forex"),
  "06": () => import("./06_bash_debug_service_docker"),
  "07": () => import("./07_bash_diskspace_analysis"),
  "08": () => import("./08_bash_remote_ssh_debug"),
  "09": () => import("./09_toolcall_cargo_build_fix"),
  "10": () => import("./10_toolcall_debug_typescript_grep"),
  "11": () => import("./11_toolcall_fix_failing_test"),
  "12": () => import("./12_toolcall_refactor_function"),
  "13": () => import("./13_mcp_figma_ui_code"),
  "14": () => import("./14_mcp_context7_api_reference"),
  "15": () => import("./15_mcp_librarian_code_snippets"),
  "16": () => import("./16_skill_excel_parser"),
  "17": () => import("./17_skill_binance_api_trading"),
  "18": () => import("./18_skill_self_writing_improvement"),
  "19": () => import("./19_skill_database_migration"),
  "20": () => import("./20_skill_docker_compose_debug"),
  "21": () => import("./21_skill_performance_profiling"),
  "22": () => import("./22_skill_security_audit"),
  "23": () => import("./23_skill_i18n_extraction"),
  "24": () => import("./24_skill_api_client_generation"),
  "25": () => import("./25_skill_git_conflict_resolution"),
  "26": () => import("./26_workflow_init_project"),
  "27": () => import("./27_workflow_code_test_commit"),
  "28": () => import("./28_workflow_handover_report"),
  "29": () => import("./29_subagent_convert_go_to_rust"),
  "30": () => import("./30_subagent_refactor_monorepo"),
  "31": () => import("./31_subagent_e2e_multi_browser"),
  "32": () => import("./32_subagent_code_review_parallel"),
} as const;

export type DiagramKey = keyof typeof diagramModules;

/** Load a single diagram by key */
export async function loadDiagram(key: DiagramKey): Promise<DiagramEntry> {
  const mod = await diagramModules[key]();
  return mod.diagram;
}

/** Load all diagrams for a group */
export async function loadGroupDiagrams(group: DiagramGroup): Promise<DiagramEntry[]> {
  const all = await loadAllDiagrams();
  return all.filter((d) => d.group === group);
}

/** Load all 32 diagrams */
export async function loadAllDiagrams(): Promise<DiagramEntry[]> {
  const keys = Object.keys(diagramModules) as DiagramKey[];
  const mods = await Promise.all(keys.map((k) => diagramModules[k]()));
  return mods.map((m) => m.diagram);
}

/** Static list of diagram keys grouped */
export const DIAGRAM_KEYS_BY_GROUP: Record<DiagramGroup, DiagramKey[]> = {
  toolcall: ["01", "02", "03", "04", "05"],
  bash:     ["06", "07", "08"],
  code:     ["09", "10", "11", "12"],
  mcp:      ["13", "14", "15"],
  skill:    ["16", "17", "18", "19", "20", "21", "22", "23", "24", "25"],
  workflow: ["26", "27", "28"],
  subagent: ["29", "30", "31", "32"],
};
