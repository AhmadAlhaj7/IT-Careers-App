"use client";

import { useActionState } from "react";
import { createResourceAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";

const initialState: ActionState = {};

export function CreateResourceForm({ roadmapId, phaseId }: { roadmapId: string; phaseId: string }) {
  const [state, formAction, pending] = useActionState(createResourceAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="roadmapId" value={roadmapId} />
      <input type="hidden" name="phaseId" value={phaseId} />

      <LocalizedTextInput label="العنوان" name="title" required />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">الرابط</span>
        <input
          name="url"
          type="url"
          required
          dir="ltr"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">نوع المورد</span>
        <select
          name="resourceType"
          defaultValue="Article"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        >
          <option value="Video">فيديو (Video)</option>
          <option value="Article">مقال (Article)</option>
          <option value="Documentation">توثيق (Documentation)</option>
          <option value="Course">دورة (Course)</option>
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">نوع الوصول</span>
        <select
          name="accessType"
          defaultValue="Free"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        >
          <option value="Free">مجاني (Free)</option>
          <option value="Paid">مدفوع (Paid)</option>
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
