"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitFinalExamAction, type FinalExamSubmitState } from "@/app/roadmaps/[slug]/actions";
import { Card, cardVariants } from "@/components/ui/Card";
import { Button, buttonVariants } from "@/components/ui/Button";
import { RadioCard } from "@/components/ui/RadioCard";
import type { Locale } from "@/lib/i18n/locale";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { PublicFinalExamQuestion } from "@/lib/types";

const initialState: FinalExamSubmitState = {};

type FinalExamFormProps = {
  slug: string;
  questions: PublicFinalExamQuestion[];
  locale: Locale;
  dict: Dictionary;
};

export function FinalExamForm({ slug, questions, locale, dict }: FinalExamFormProps) {
  const [state, formAction, pending] = useActionState(submitFinalExamAction, initialState);
  const t = dict.finalExamForm;
  const common = dict.quizCommon;

  if (state.result) {
    return (
      <Card padding="lg" shadow="subtle" radius="panel" className="text-center">
        <p className={state.result.passed ? "text-lg font-semibold text-primary" : "text-lg font-semibold text-danger"}>
          {state.result.passed ? t.passedTitle : t.failedTitle}
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          {state.result.correctCount} {common.ofLabel} {state.result.totalCount} {common.correctAnswersSuffix}
        </p>
        {state.result.passed && state.result.certificateCode && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <Link href={`/certificates/${state.result.certificateCode}`} className={buttonVariants()}>
              {t.viewCertificateCta}
            </Link>
            {/* Founder-configured, not per-roadmap content — set once via env, same pattern as
                the Paddle client token. Absent by default, so this only appears once configured. */}
            {process.env.NEXT_PUBLIC_BOOKING_URL && (
              <a
                href={process.env.NEXT_PUBLIC_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline"
              >
                {t.bookCallCta}
              </a>
            )}
          </div>
        )}
        {!state.result.passed && <p className="mt-2 text-sm text-neutral-500">{common.retryNote}</p>}
      </Card>
    );
  }

  return (
    <form action={formAction} className={cardVariants({ padding: "lg", shadow: "subtle", radius: "panel", className: "flex flex-col gap-6" })}>
      <input type="hidden" name="slug" value={slug} />

      <h2 className="text-lg font-semibold text-neutral-900">{t.title}</h2>

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
        {pending ? common.submitting : t.submitCta}
      </Button>
    </form>
  );
}
