"use client";

import { useActionState } from "react";
import { createPhaseAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";

const initialState: ActionState = {};

export function CreatePhaseForm({ roadmapId, nextOrderIndex }: { roadmapId: string; nextOrderIndex: number }) {
  const [state, formAction, pending] = useActionState(createPhaseAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="roadmapId" value={roadmapId} />

      <LocalizedTextInput label="العنوان" name="title" required />

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

      <LocalizedTextInput label="الشرح" name="explanation" multiline required />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">رابط PDF (اختياري)</span>
        <input name="pdfUrl" dir="ltr" className="rounded-md border border-neutral-300 px-3 py-2 text-sm" />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">نوع المرحلة</span>
        <select
          name="phaseType"
          defaultValue="Standard"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        >
          <option value="Standard">عادية (Standard)</option>
          <option value="FindAJob">البحث عن عمل (Find a Job)</option>
        </select>
      </label>

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
