"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitFinalExamAction, type FinalExamSubmitState } from "@/app/roadmaps/[slug]/actions";
import type { PublicFinalExamQuestion } from "@/lib/types";

const initialState: FinalExamSubmitState = {};

type FinalExamFormProps = {
  slug: string;
  questions: PublicFinalExamQuestion[];
};

export function FinalExamForm({ slug, questions }: FinalExamFormProps) {
  const [state, formAction, pending] = useActionState(submitFinalExamAction, initialState);

  if (state.result) {
    return (
      <div className="rounded-lg border border-neutral-200 p-6 text-center">
        <p className={state.result.passed ? "text-lg font-semibold text-[#0F6E56]" : "text-lg font-semibold text-red-600"}>
          {state.result.passed ? "مبروك! لقد اجتزت الامتحان النهائي" : "لم تجتز الامتحان بعد"}
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          {state.result.correctCount} من {state.result.totalCount} إجابات صحيحة
        </p>
        {state.result.passed && state.result.certificateCode && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <Link
              href={`/certificates/${state.result.certificateCode}`}
              className="inline-block rounded-md bg-[#0F6E56] px-4 py-2 text-sm font-medium text-white"
            >
              عرض الشهادة
            </Link>
            {/* Founder-configured, not per-roadmap content — set once via env, same pattern as
                the Paddle client token. Absent by default, so this only appears once configured. */}
            {process.env.NEXT_PUBLIC_BOOKING_URL && (
              <a
                href={process.env.NEXT_PUBLIC_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#0F6E56] underline"
              >
                احجز محادثة مجانية لمدة ١:١ مع المؤسس
              </a>
            )}
          </div>
        )}
        {!state.result.passed && (
          <p className="mt-2 text-sm text-neutral-500">يمكنك المحاولة مرة أخرى بلا حدود — أعد تحميل الصفحة للمحاولة من جديد.</p>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 rounded-lg border border-neutral-200 p-6">
      <input type="hidden" name="slug" value={slug} />

      <h2 className="text-lg font-semibold text-neutral-900">الامتحان النهائي</h2>

      {questions.map((question) => (
        <fieldset key={question.id} className="flex flex-col gap-2">
          <input type="hidden" name="questionId" value={question.id} />
          <legend className="font-medium text-neutral-800">{question.text.ar}</legend>
          {question.options.map((option) => (
            <label key={option.index} className="flex items-center gap-2 text-sm text-neutral-700">
              <input type="radio" name={`answer-${question.id}`} value={option.index} required />
              {option.text.ar}
            </label>
          ))}
        </fieldset>
      ))}

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-[#0F6E56] px-4 py-2 text-sm font-medium text-white transition active:scale-95 disabled:opacity-50 disabled:active:scale-100"
      >
        {pending ? "جارٍ الإرسال..." : "إرسال الامتحان"}
      </button>
    </form>
  );
}
