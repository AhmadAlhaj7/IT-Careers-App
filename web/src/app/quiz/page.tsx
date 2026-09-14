import { listCareerQuizQuestions } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/locale";
import { BackLink } from "@/components/layout/BackLink";
import { CareerQuizForm } from "@/components/quiz/CareerQuizForm";

export default async function QuizPage() {
  const [locale, questions] = await Promise.all([getLocale(), listCareerQuizQuestions()]);
  const dict = getDictionary(locale);
  const t = dict.careerQuizPage;

  return (
    <div className="mx-auto w-full max-w-2xl px-3 py-10 sm:px-6 sm:py-16">
      <BackLink href="/" label={dict.nav.home} />
      <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">{t.title}</h1>
      <p className="mt-3 text-sm leading-[1.8] text-neutral-600 sm:text-base">{t.intro}</p>

      {questions.length === 0 ? (
        <p className="mt-6 text-sm text-neutral-500">{t.empty}</p>
      ) : (
        <div className="mt-6">
          <CareerQuizForm questions={questions} locale={locale} dict={dict} />
        </div>
      )}
    </div>
  );
}
