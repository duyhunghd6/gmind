import WebUIPMWorkspacePage from "../../../webui-pm-workspace/WebUIPMWorkspacePage";

export function generateStaticParams() {
  return [
    { id: "default" },
    { id: "prd-04" },
    { id: "spike-beads-knowledge-graph" }
  ];
}

export default async function DocDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <WebUIPMWorkspacePage initialActiveId="screen:ds-doc-viewer" />;
}
