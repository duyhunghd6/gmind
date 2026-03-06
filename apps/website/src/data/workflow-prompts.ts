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

import wfOneShot from "./workflows/XP_OneShot_Coding.json";
import wfVibe from "./workflows/XP_Vibe_Coding.json";
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

import wfGSAFe from "./workflows/SAFe_Agentic_SE.json";

export const aiWorkflows: AITrackingWorkflow[] = [
  wfOneShot as AITrackingWorkflow,
  wfVibe as AITrackingWorkflow,
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
  wfGSAFe as AITrackingWorkflow
];
