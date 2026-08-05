import { notFound } from "next/navigation";
import { getPhase } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { CreateQuizQuestionForm } from "./CreateQuizQuestionForm";

export default async function NewQuizQuestionPage({
  params,
}: {
  params: Promise<{ id: string; phaseId: string }>;
}) {
  const { id, phaseId } = await params;
  const result = await getPhase(phaseId);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  const phase = result.data;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href={`/admin/roadmaps/${id}/phases/${phase.id}`} label={phase.title.ar} />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">سؤال جديد</h1>
      <CreateQuizQuestionForm roadmapId={id} phaseId={phase.id} nextOrderIndex={phase.quizQuestions.length} />
    </div>
  );
}
