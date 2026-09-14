"use client";

import { useActionState, useEffect, useRef } from "react";
import { createRoadmapAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import type { TrackSummary } from "@/lib/types";

const initialState: ActionState = {};

export function CreateRoadmapForm({ tracks }: { tracks: TrackSummary[] }) {
  const [state, formAction, pending] = useActionState(createRoadmapAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Same fix as the editors: a failed save (a duplicate slug, a bad price) would otherwise
  // wipe every field the admin just typed, since React resets uncontrolled fields once the
  // action completes regardless of whether it succeeded.
  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <Select label="المسار الرئيسي (Track)" name="trackId" required>
        {tracks.map((track) => (
          <option key={track.id} value={track.id}>
            {track.name.ar}
          </option>
        ))}
      </Select>

      <LocalizedTextInput label="العنوان" name="title" required />

      <Input label="الرابط المختصر (Slug)" name="slug" required dir="ltr" />

      <Input label="السعر" name="price" type="number" step="0.01" min="0" required dir="ltr" />

      <Select label="الحالة" name="status" defaultValue="Draft">
        <option value="Draft">مسودة (Draft)</option>
        <option value="Published">منشور (Published)</option>
      </Select>

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ"}
      </Button>
    </form>
  );
}
