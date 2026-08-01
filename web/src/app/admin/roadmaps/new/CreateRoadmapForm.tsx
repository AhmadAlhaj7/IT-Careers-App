"use client";

import { useActionState } from "react";
import { createRoadmapAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import type { TrackSummary } from "@/lib/types";

const initialState: ActionState = {};

export function CreateRoadmapForm({ tracks }: { tracks: TrackSummary[] }) {
  const [state, formAction, pending] = useActionState(createRoadmapAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-5">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">المسار الرئيسي (Track)</span>
        <select name="trackId" required className="rounded-md border border-neutral-300 px-3 py-2 text-sm">
          {tracks.map((track) => (
            <option key={track.id} value={track.id}>
              {track.name.ar}
            </option>
          ))}
        </select>
      </label>

      <LocalizedTextInput label="العنوان" name="title" required />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">الرابط المختصر (Slug)</span>
        <input name="slug" required dir="ltr" className="rounded-md border border-neutral-300 px-3 py-2 text-sm" />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">السعر</span>
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          required
          dir="ltr"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-neutral-700">الحالة</span>
        <select name="status" defaultValue="Draft" className="rounded-md border border-neutral-300 px-3 py-2 text-sm">
          <option value="Draft">مسودة (Draft)</option>
          <option value="Published">منشور (Published)</option>
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
