"use client";

import { useActionState } from "react";
import { updateCareerQuizQuestionAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { CareerQuizOptionsFieldset } from "@/components/admin/CareerQuizOptionsFieldset";
import type { AdminCareerQuizQuestion, AdminTrack } from "@/lib/types";

const initialState: ActionState = {};

export function EditCareerQuizQuestionForm({ question, tracks }: { question: AdminCareerQuizQuestion; tracks: AdminTrack[] }) {
  const [state, formAction, pending] = useActionState(updateCareerQuizQuestionAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="id" value={question.id} />

      <LocalizedTextInput label="نص السؤال" name="text" defaultValue={question.text} required />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">الترتيب</span>
        <input
          name="orderIndex"
          type="number"
          min="0"
          required
          defaultValue={question.orderIndex}
          dir="ltr"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </label>

      <CareerQuizOptionsFieldset tracks={tracks} existingOptions={question.options} />

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-[#0F6E56] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "جارٍ الحفظ..." : "حفظ التعديلات"}
      </button>
    </form>
  );
}
