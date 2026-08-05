"use client";

import { useActionState } from "react";
import { updateTrackAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import type { AdminTrack } from "@/lib/types";

const initialState: ActionState = {};

export function EditTrackForm({ track }: { track: AdminTrack }) {
  const [state, formAction, pending] = useActionState(updateTrackAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="id" value={track.id} />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">الرابط المختصر (Slug)</span>
        <input
          name="slug"
          defaultValue={track.slug}
          required
          dir="ltr"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </label>

      <LocalizedTextInput label="الاسم" name="name" defaultValue={track.name} required />
      <LocalizedTextInput label="الوصف" name="description" defaultValue={track.description} multiline required />

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input name="published" type="checkbox" defaultChecked={track.published} className="h-4 w-4" />
        منشور
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
