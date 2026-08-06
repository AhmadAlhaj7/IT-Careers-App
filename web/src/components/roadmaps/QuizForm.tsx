"use client";

import { useActionState } from "react";
import { submitQuizAction, type QuizSubmitState } from "@/app/roadmaps/[slug]/phases/[orderIndex]/actions";
import type { PublicQuizQuestion } from "@/lib/types";

const initialState: QuizSubmitState = {};

type QuizFormProps = {
  slug: string;
  orderIndex: number;
  questions: PublicQuizQuestion[];
};

export function QuizForm({ slug, orderIndex, questions }: QuizFormProps) {
  const [state, formAction, pending] = useActionState(submitQuizAction, initialState);

  if (state.result) {
    return (
      <div className="rounded-lg border border-neutral-200 p-6 text-center">
        <p className={state.result.passed ? "text-lg font-semibold text-[#0F6E56]" : "text-lg font-semibold text-red-600"}>
          {state.result.passed ? "أحسنت! لقد اجتزت الاختبار" : "لم تجتز الاختبار بعد"}
        </p>
        <p className="mt-2 text-sm text-neutral-600">
          {state.result.correctCount} من {state.result.totalCount} إجابات صحيحة
        </p>
        {!state.result.passed && (
          <p className="mt-2 text-sm text-neutral-500">يمكنك المحاولة مرة أخرى بلا حدود — أعد تحميل الصفحة للمحاولة من جديد.</p>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 rounded-lg border border-neutral-200 p-6">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="orderIndex" value={orderIndex} />

      <h2 className="text-lg font-semibold text-neutral-900">اختبار المرحلة</h2>

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
        {pending ? "جارٍ الإرسال..." : "إرسال الإجابات"}
      </button>
    </form>
  );
}
