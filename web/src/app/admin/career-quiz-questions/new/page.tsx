import { listAdminCareerQuizQuestions, listAdminTracks } from "@/lib/admin-api";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { BackLink } from "@/components/layout/BackLink";
import { CreateCareerQuizQuestionForm } from "./CreateCareerQuizQuestionForm";

export default async function NewCareerQuizQuestionPage() {
  const [tracksResult, questionsResult] = await Promise.all([listAdminTracks(), listAdminCareerQuizQuestions()]);

  if (tracksResult.status === "forbidden" || questionsResult.status === "forbidden") {
    return <AdminForbidden />;
  }

  const tracks = tracksResult.status === "ok" ? tracksResult.data : [];
  const nextOrderIndex = questionsResult.status === "ok" ? questionsResult.data.length : 0;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href="/admin/career-quiz-questions" label="بوصلة المهنة" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">سؤال جديد لبوصلة المهنة</h1>
      <CreateCareerQuizQuestionForm tracks={tracks} nextOrderIndex={nextOrderIndex} />
    </div>
  );
}
