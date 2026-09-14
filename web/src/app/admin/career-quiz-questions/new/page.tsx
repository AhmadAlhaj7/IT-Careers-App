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
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/admin/career-quiz-questions" label="بوصلة المهنة" />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">سؤال جديد لبوصلة المهنة</h1>
      <CreateCareerQuizQuestionForm tracks={tracks} nextOrderIndex={nextOrderIndex} />
    </div>
  );
}
