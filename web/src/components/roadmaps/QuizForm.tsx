"use client";

import { useActionState } from "react";
import { submitQuizAction, type QuizSubmitState } from "@/app/roadmaps/[slug]/phases/[orderIndex]/actions";
import { Card, cardVariants } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { RadioCard } from "@/components/ui/RadioCard";
import type { Locale } from "@/lib/i18n/locale";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { PublicQuizQuestion } from "@/lib/types";

const initialState: QuizSubmitState = {};

type QuizFormProps = {
  slug: string;
  orderIndex: number;
  questions: PublicQuizQuestion[];
  locale: Locale;
  dict: Dictionary;
};

export function QuizForm({ slug, orderIndex, questions, locale, dict }: QuizFormProps) {
  const [state, formAction, pending] = useActionState(submitQuizAction, initialState);
  const t = dict.phaseDetailPage;
  const common = dict.quizCommon;

  if (state.result) {
    return (
      <Card padding="lg" shadow="subtle" radius="panel" className="text-center">
        <p className={state.result.passed ? "text-lg font-semibold text-primary" : "text-lg font-semibold text-danger"}>
          {state.result.passed ? t.quizPassedTitle : t.quizFailedTitle}
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          {state.result.correctCount} {common.ofLabel} {state.result.totalCount} {common.correctAnswersSuffix}
        </p>
        {!state.result.passed && <p className="mt-2 text-sm text-neutral-500">{common.retryNote}</p>}
      </Card>
    );
  }

  return (
    <form action={formAction} className={cardVariants({ padding: "lg", shadow: "subtle", radius: "panel", className: "flex flex-col gap-6" })}>
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="orderIndex" value={orderIndex} />

      <h2 className="text-lg font-semibold text-neutral-900">{t.quizTitle}</h2>

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

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? common.submitting : t.quizSubmitCta}
      </Button>
    </form>
  );
}
