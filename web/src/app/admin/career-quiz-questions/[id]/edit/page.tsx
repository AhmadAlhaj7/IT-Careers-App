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
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/admin/career-quiz-questions" label="بوصلة المهنة" />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">تعديل سؤال بوصلة المهنة</h1>
      <EditCareerQuizQuestionForm question={question} tracks={tracks} />
    </div>
  );
}
