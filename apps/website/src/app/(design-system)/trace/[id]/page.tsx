import WebUIPMWorkspacePage from "../../../webui-pm-workspace/WebUIPMWorkspacePage";

export function generateStaticParams() {
  return [
    { id: "default" },
    { id: "br-prd04-s5" },
    { id: "bd-approval-178" }
  ];
}

export default async function TraceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <WebUIPMWorkspacePage initialActiveId="screen:ds-beads-traversal" />;
}
