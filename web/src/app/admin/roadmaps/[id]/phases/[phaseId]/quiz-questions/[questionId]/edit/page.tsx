import { notFound } from "next/navigation";
import { getPhase } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { EditQuizQuestionForm } from "./EditQuizQuestionForm";

export default async function EditQuizQuestionPage({
  params,
}: {
  params: Promise<{ id: string; phaseId: string; questionId: string }>;
}) {
  const { id, phaseId, questionId } = await params;
  const result = await getPhase(phaseId);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  const question = result.data.quizQuestions.find((q) => q.id === questionId);

  if (!question) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href={`/admin/roadmaps/${id}/phases/${phaseId}`} label="المرحلة" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">تعديل السؤال</h1>
      <EditQuizQuestionForm question={question} roadmapId={id} phaseId={phaseId} />
    </div>
  );
}
