"use client";

import { useActionState } from "react";
import { updateResourceAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import type { AdminResource } from "@/lib/types";

const initialState: ActionState = {};

export function EditResourceForm({
  resource,
  roadmapId,
  phaseId,
}: {
  resource: AdminResource;
  roadmapId: string;
  phaseId: string;
}) {
  const [state, formAction, pending] = useActionState(updateResourceAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="id" value={resource.id} />
      <input type="hidden" name="roadmapId" value={roadmapId} />
      <input type="hidden" name="phaseId" value={phaseId} />

      <LocalizedTextInput label="العنوان" name="title" defaultValue={resource.title} required />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">الرابط</span>
        <input
          name="url"
          type="url"
          required
          dir="ltr"
          defaultValue={resource.url}
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">نوع المورد</span>
        <select
          name="resourceType"
          defaultValue={resource.resourceType}
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
          defaultValue={resource.accessType}
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
        {pending ? "جارٍ الحفظ..." : "حفظ التعديلات"}
      </button>
    </form>
  );
}
