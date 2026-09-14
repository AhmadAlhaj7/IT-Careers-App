"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitCareerQuizAction, type CareerQuizSubmitState } from "@/app/quiz/actions";
import { Card, cardVariants } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RadioCard } from "@/components/ui/RadioCard";
import { Input } from "@/components/ui/Input";
import type { Locale } from "@/lib/i18n/locale";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { PublicCareerQuizQuestion } from "@/lib/types";

const initialState: CareerQuizSubmitState = {};

type CareerQuizFormProps = {
  questions: PublicCareerQuizQuestion[];
  locale: Locale;
  dict: Dictionary;
};

export function CareerQuizForm({ questions, locale, dict }: CareerQuizFormProps) {
  const [state, formAction, pending] = useActionState(submitCareerQuizAction, initialState);
  const t = dict.careerQuizPage;
  const common = dict.quizCommon;

  if (state.result) {
    const [top, second] = state.result.recommendations;

    return (
      <Card padding="lg" shadow="subtle" radius="panel" className="text-center">
        <p className="text-sm text-neutral-500">{t.resultEyebrow}</p>
        {top ? (
          <>
            <h2 className="mt-2 text-xl font-semibold text-primary">{top.name[locale]}</h2>
            <Link href={`/tracks/${top.slug}`} className="mt-3 inline-block text-sm text-primary underline">
              {t.whyThisFits}
            </Link>
          </>
        ) : (
          <p className="mt-2 text-neutral-600">{t.noRecommendation}</p>
        )}
        {second && (
          <p className="mt-6 text-sm text-neutral-500">
            {t.alsoConsider}{" "}
            <Link href={`/tracks/${second.slug}`} className="text-primary underline">
              {second.name[locale]}
            </Link>
          </p>
        )}
      </Card>
    );
  }

  return (
    <form action={formAction} className={cardVariants({ padding: "lg", shadow: "subtle", radius: "panel", className: "flex flex-col gap-6" })}>
      {questions.map((question) => (
        <fieldset key={question.id} className="flex flex-col gap-2">
          <input type="hidden" name="questionId" value={question.id} />
          <legend className="mb-1 font-medium text-neutral-800">{question.text[locale]}</legend>
          <div className="flex flex-col gap-2">
            {question.options.map((option) => (
              <RadioCard
                key={option.index}
                name={`answer-${question.id}`}
                value={String(option.index)}
                label={option.text[locale]}
                required
              />
            ))}
          </div>
        </fieldset>
      ))}

      <Input name="email" type="email" dir="ltr" label={t.emailLabel} placeholder={t.emailPlaceholder} />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? common.submitting : t.submitCta}
      </Button>
    </form>
  );
}
