export interface WorkflowStep {
  id: string;
  title: string;
  role: "User" | "Agent" | "System" | "PMO / Architect" | "RTE" | "Dev Teams" | "Execution";
  description: string;
  input: string;
  output: string;
  loopGroup?: "Planning" | "Execution" | "None";
  promptText?: string;
  projectStateScenario?: string;
  loopCondition?: string;
  icon?: string;
  nextSteps?: { conditionLabel?: string; nextNodeId: string; isLoopBack?: boolean }[];
  guidanceContext?: string;
  exampleDetails?: string;
}

export interface AITrackingWorkflow {
  id: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
}

export interface WorkflowCategory {
  id: string;
  label: string;
  icon: string;
  workflows: AITrackingWorkflow[];
}

// === Category A: Khởi tạo Projects ===
import wfOneShotInit from "./workflows/XP_OneShot_InitProject.json";
import wfOneShotSkills from "./workflows/XP_OneShot_CreateSkills.json";
import wfOneShotRules from "./workflows/XP_OneShot_CreateRules.json";
import wfOneShotWorkflows from "./workflows/XP_OneShot_CreateWorkflows.json";

// === Category B: One-shot AI Coding ===
import wfOneShot from "./workflows/XP_OneShot_Coding.json";
import wfVibe from "./workflows/XP_Vibe_Coding.json";

// === Category C: XP Agentic Coding ===
import wfGreenfield from "./workflows/XP_Agentic_Greenfield.json";
import wfBrownfield from "./workflows/XP_Agentic_Brownfield.json";
import wfXP from "./workflows/XP_Continuous_Refactoring_Engine.json";
import wfTDD from "./workflows/XP_TDD_Red_Green_Refactor.json";
import wfPair from "./workflows/XP_Pair_Programming_Copilot.json";
import wfCustomer from "./workflows/XP_OnSite_Customer_Proxy.json";
import wfPlanning from "./workflows/XP_Planning_Game_Estimator.json";
import wfRelease from "./workflows/XP_Small_Releases_Shipper.json";
import wfYagni from "./workflows/XP_Simple_Design_YAGNI.json";
import wfCI from "./workflows/XP_Continuous_Integration_Bot.json";
import wfCollective from "./workflows/XP_Collective_Ownership_Reviewer.json";
import wfStandards from "./workflows/XP_Coding_Standards_Enforcer.json";
import wfPace from "./workflows/XP_Sustainable_Pace_Tracker.json";

// === Category D: SAFe 6.0 AgenticSE ===
import wfGSAFe from "./workflows/SAFe_Agentic_SE.json";

export const workflowCategories: WorkflowCategory[] = [
  {
    id: "cat-init",
    label: "A. Khởi tạo Projects",
    icon: "🚀",
    workflows: [
      wfOneShotInit as AITrackingWorkflow,
      wfOneShotSkills as AITrackingWorkflow,
      wfOneShotRules as AITrackingWorkflow,
      wfOneShotWorkflows as AITrackingWorkflow,
    ],
  },
  {
    id: "cat-oneshot",
    label: "B. One-shot AI Coding",
    icon: "⚡",
    workflows: [
      wfOneShot as AITrackingWorkflow,
      wfVibe as AITrackingWorkflow,
    ],
  },
  {
    id: "cat-xp",
    label: "C. XP Agentic Coding",
    icon: "🤖",
    workflows: [
      wfGreenfield as AITrackingWorkflow,
      wfBrownfield as AITrackingWorkflow,
      wfXP as AITrackingWorkflow,
      wfTDD as AITrackingWorkflow,
      wfPair as AITrackingWorkflow,
      wfCustomer as AITrackingWorkflow,
      wfPlanning as AITrackingWorkflow,
      wfRelease as AITrackingWorkflow,
      wfYagni as AITrackingWorkflow,
      wfCI as AITrackingWorkflow,
      wfCollective as AITrackingWorkflow,
      wfStandards as AITrackingWorkflow,
      wfPace as AITrackingWorkflow,
    ],
  },
  {
    id: "cat-safe",
    label: "D. SAFe 6.0 AgenticSE",
    icon: "🏢",
    workflows: [
      wfGSAFe as AITrackingWorkflow,
    ],
  },
];

// Flat list for backward compatibility (hash routing, etc.)
export const aiWorkflows: AITrackingWorkflow[] = workflowCategories.flatMap(c => c.workflows);
