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

import wfOneShot from "./workflows/General_OneShot_Coding.json";
import wfVibe from "./workflows/General_Vibe_Coding.json";
import wfGreenfield from "./workflows/General_Agentic_Greenfield.json";
import wfBrownfield from "./workflows/General_Agentic_Brownfield.json";
import wfGSAFe from "./workflows/SAFe_Agentic_SE.json";
import wfScrum from "./workflows/Scrum_Daily_Standup_Synthesis.json";
import wfKanban from "./workflows/Kanban_WIP_Limit_Optimizer.json";
import wfXP from "./workflows/XP_Continuous_Refactoring_Engine.json";
import wfAUP from "./workflows/AUP_DAD_Architecture_Model_Generator.json";
import wfDSDM from "./workflows/DSDM_MoSCoW_Prioritization.json";
import wfFDD from "./workflows/FDD_Domain_Model_Synthesizer.json";
import wfTDD from "./workflows/TDD_Test_Cases_Bootstrap.json";
import wfRAD from "./workflows/RAD_UI_Prototype_Sketcher.json";

export const aiWorkflows: AITrackingWorkflow[] = [
  wfOneShot as AITrackingWorkflow,
  wfVibe as AITrackingWorkflow,
  wfGreenfield as AITrackingWorkflow,
  wfBrownfield as AITrackingWorkflow,
  wfGSAFe as AITrackingWorkflow,
  wfScrum as AITrackingWorkflow,
  wfKanban as AITrackingWorkflow,
  wfXP as AITrackingWorkflow,
  wfAUP as AITrackingWorkflow,
  wfDSDM as AITrackingWorkflow,
  wfFDD as AITrackingWorkflow,
  wfTDD as AITrackingWorkflow,
  wfRAD as AITrackingWorkflow
];
