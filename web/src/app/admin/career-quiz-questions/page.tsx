import Link from "next/link";
import { listAdminCareerQuizQuestions, listAdminTracks } from "@/lib/admin-api";
import { deleteCareerQuizQuestionAction } from "@/app/admin/actions";
import { AdminForbidden } from "@/components/admin/AdminForbidden";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminCareerQuizQuestionsPage() {
  const [questionsResult, tracksResult] = await Promise.all([listAdminCareerQuizQuestions(), listAdminTracks()]);

  if (questionsResult.status === "forbidden" || tracksResult.status === "forbidden") {
    return <AdminForbidden />;
  }

  const questions = questionsResult.status === "ok" ? questionsResult.data : [];
  const tracks = tracksResult.status === "ok" ? tracksResult.data : [];
  const trackNameById = new Map(tracks.map((track) => [track.id, track.name.ar]));

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">أسئلة بوصلة المهنة</h1>
        <Link href="/admin/career-quiz-questions/new" className="text-sm text-[#0F6E56]">
          + سؤال جديد
        </Link>
      </div>
      <p className="mt-1 text-sm text-neutral-500">
        هذا اختبار قصير مجاني يوصي الزائر بمسار رئيسي مناسب — لا علاقة له بأسئلة اختبارات المراحل.
      </p>

      <div className="mt-6 flex flex-col gap-2">
        {questions.length === 0 && <p className="text-sm text-neutral-500">لا توجد أسئلة بعد.</p>}
        {questions.map((question) => (
          <div key={question.id} className="rounded-lg border border-neutral-200 px-4 py-3">
            <span className="font-medium text-neutral-900">{question.text.ar}</span>
            <ul className="mt-2 flex flex-col gap-1">
              {question.options.map((option, index) => {
                const weights = option.trackWeights
                  .filter((w) => w.weight !== 0)
                  .map((w) => `${trackNameById.get(w.trackId) ?? "?"} (${w.weight})`)
                  .join("، ");
                return (
                  <li key={index} className="text-sm text-neutral-600">
                    {option.text.ar}
                    {weights && <span className="text-xs text-neutral-400"> — {weights}</span>}
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 flex items-center gap-3">
              <Link href={`/admin/career-quiz-questions/${question.id}/edit`} className="text-xs text-[#0F6E56]">
                تعديل
              </Link>
              <DeleteButton
                action={deleteCareerQuizQuestionAction}
                hiddenFields={{ id: question.id }}
                confirmMessage="سيتم حذف هذا السؤال نهائيًا. هل أنت متأكد؟"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
