"use client";

import { useActionState } from "react";
import Link from "next/link";
import { submitCareerQuizAction, type CareerQuizSubmitState } from "@/app/quiz/actions";
import type { PublicCareerQuizQuestion } from "@/lib/types";

const initialState: CareerQuizSubmitState = {};

export function CareerQuizForm({ questions }: { questions: PublicCareerQuizQuestion[] }) {
  const [state, formAction, pending] = useActionState(submitCareerQuizAction, initialState);

  if (state.result) {
    const [top, second] = state.result.recommendations;

    return (
      <div className="rounded-lg border border-neutral-200 p-6 text-center">
        <p className="text-sm text-neutral-500">المسار الأنسب لك</p>
        {top ? (
          <>
            <h2 className="mt-2 text-xl font-semibold text-[#0F6E56]">{top.name.ar}</h2>
            <Link href={`/tracks/${top.slug}`} className="mt-3 inline-block text-sm text-[#0F6E56] underline">
              لماذا هذا المسار يناسبك؟
            </Link>
          </>
        ) : (
          <p className="mt-2 text-neutral-600">لم نتمكن من تحديد توصية.</p>
        )}
        {second && (
          <p className="mt-6 text-sm text-neutral-500">
            وقد يناسبك أيضًا:{" "}
            <Link href={`/tracks/${second.slug}`} className="text-[#0F6E56] underline">
              {second.name.ar}
            </Link>
          </p>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 rounded-lg border border-neutral-200 p-6">
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

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">البريد الإلكتروني (اختياري)</span>
        <input
          name="email"
          type="email"
          dir="ltr"
          placeholder="لإرسال النتيجة إليك — غير إلزامي"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </label>

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-[#0F6E56] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "جارٍ الإرسال..." : "عرض النتيجة"}
      </button>
    </form>
  );
}
