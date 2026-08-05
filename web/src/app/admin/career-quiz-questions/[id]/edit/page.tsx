import { notFound } from "next/navigation";
import { listAdminCareerQuizQuestions, listAdminTracks } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { EditCareerQuizQuestionForm } from "./EditCareerQuizQuestionForm";

export default async function EditCareerQuizQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [tracksResult, questionsResult] = await Promise.all([listAdminTracks(), listAdminCareerQuizQuestions()]);

  if (tracksResult.status === "forbidden" || questionsResult.status === "forbidden") {
    return <AdminForbidden />;
  }

  const tracks = tracksResult.status === "ok" ? tracksResult.data : [];
  const question = questionsResult.status === "ok" ? questionsResult.data.find((q) => q.id === id) : undefined;

  if (!question) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href="/admin/career-quiz-questions" label="بوصلة المهنة" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">تعديل سؤال بوصلة المهنة</h1>
      <EditCareerQuizQuestionForm question={question} tracks={tracks} />
    </div>
  );
}
