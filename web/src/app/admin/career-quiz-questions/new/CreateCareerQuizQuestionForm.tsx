"use client";

import { useActionState, useEffect, useRef } from "react";
import { createCareerQuizQuestionAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { CareerQuizOptionsFieldset } from "@/components/admin/CareerQuizOptionsFieldset";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { AdminTrack } from "@/lib/types";

const initialState: ActionState = {};

export function CreateCareerQuizQuestionForm({ tracks, nextOrderIndex }: { tracks: AdminTrack[]; nextOrderIndex: number }) {
  const [state, formAction, pending] = useActionState(createCareerQuizQuestionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <LocalizedTextInput label="نص السؤال" name="text" required />

      <Input label="الترتيب" name="orderIndex" type="number" min="0" required defaultValue={nextOrderIndex} dir="ltr" />

      <CareerQuizOptionsFieldset tracks={tracks} />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ"}
      </Button>
    </form>
  );
}
