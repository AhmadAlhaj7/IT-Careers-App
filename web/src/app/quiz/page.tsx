import { listCareerQuizQuestions } from "@/lib/api";
import { BackLink } from "@/components/layout/BackLink";
import { CareerQuizForm } from "@/components/quiz/CareerQuizForm";

export default async function QuizPage() {
  const questions = await listCareerQuizQuestions();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <BackLink href="/" label="الرئيسية" />
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">بوصلة المهنة</h1>
      <p className="mt-2 text-sm leading-[1.7] text-neutral-600">
        أجب عن هذه الأسئلة القصيرة لتحصل على توصية بالمسار الرئيسي الأنسب لك — بلا تسجيل دخول أو بريد إلكتروني.
      </p>

      {questions.length === 0 ? (
        <p className="mt-6 text-sm text-neutral-500">الاختبار غير متاح حاليًا.</p>
      ) : (
        <div className="mt-6">
          <CareerQuizForm questions={questions} />
        </div>
      )}
    </div>
  );
}
