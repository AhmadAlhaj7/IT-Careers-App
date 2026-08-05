"use client";

import { useActionState } from "react";
import { createQuizQuestionAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { QuizOptionsFieldset } from "@/components/admin/QuizOptionsFieldset";

const initialState: ActionState = {};

export function CreateQuizQuestionForm({
  roadmapId,
  phaseId,
  nextOrderIndex,
}: {
  roadmapId: string;
  phaseId: string;
  nextOrderIndex: number;
}) {
  const [state, formAction, pending] = useActionState(createQuizQuestionAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="roadmapId" value={roadmapId} />
      <input type="hidden" name="phaseId" value={phaseId} />

      <LocalizedTextInput label="نص السؤال" name="text" required />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">الترتيب</span>
        <input
          name="orderIndex"
          type="number"
          min="0"
          required
          defaultValue={nextOrderIndex}
          dir="ltr"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </label>

      <QuizOptionsFieldset />

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-[#0F6E56] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "جارٍ الحفظ..." : "حفظ"}
      </button>
    </form>
  );
}
