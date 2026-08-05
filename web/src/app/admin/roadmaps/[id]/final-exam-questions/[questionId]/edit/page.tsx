import { notFound } from "next/navigation";
import { getRoadmap } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { EditFinalExamQuestionForm } from "./EditFinalExamQuestionForm";

export default async function EditFinalExamQuestionPage({
  params,
}: {
  params: Promise<{ id: string; questionId: string }>;
}) {
  const { id, questionId } = await params;
  const result = await getRoadmap(id);

  if (result.status === "forbidden") {
    return <AdminForbidden />;
  }

  if (result.status === "not_found") {
    notFound();
  }

  const question = result.data.finalExamQuestions.find((q) => q.id === questionId);

  if (!question) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href={`/admin/roadmaps/${id}`} label="المسار" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">تعديل سؤال الامتحان النهائي</h1>
      <EditFinalExamQuestionForm question={question} roadmapId={id} />
    </div>
  );
}
