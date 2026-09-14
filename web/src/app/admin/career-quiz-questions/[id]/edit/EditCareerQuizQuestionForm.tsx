"use client";

import { useActionState, useEffect, useRef } from "react";
import { updateCareerQuizQuestionAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { CareerQuizOptionsFieldset } from "@/components/admin/CareerQuizOptionsFieldset";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { AdminCareerQuizQuestion, AdminTrack } from "@/lib/types";

const initialState: ActionState = {};

export function EditCareerQuizQuestionForm({ question, tracks }: { question: AdminCareerQuizQuestion; tracks: AdminTrack[] }) {
  const [state, formAction, pending] = useActionState(updateCareerQuizQuestionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="id" value={question.id} />

      <LocalizedTextInput label="نص السؤال" name="text" defaultValue={question.text} required />

      <Input label="الترتيب" name="orderIndex" type="number" min="0" required defaultValue={question.orderIndex} dir="ltr" />

      <CareerQuizOptionsFieldset tracks={tracks} existingOptions={question.options} />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ التعديلات"}
      </Button>
    </form>
  );
}
