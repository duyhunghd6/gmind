import WebUIPMWorkspacePage from "../../../webui-pm-workspace/page";
import { usecases, USECASE_MAP } from "@/data/usecase-data";
import { notFound } from "next/navigation";

/* Static params for SSG */
export function generateStaticParams() {
  return usecases.map((uc) => ({ id: uc.id }));
}

export default async function UsecaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const uc = USECASE_MAP[id];
  if (!uc) return notFound();

  return <WebUIPMWorkspacePage initialActiveId="screen:ds-storyboard-detail" storyboardId={id} />;
}
