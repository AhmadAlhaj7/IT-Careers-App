"use client";

import { useActionState, useEffect, useRef } from "react";
import { updateQuizQuestionAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { QuizOptionsFieldset } from "@/components/admin/QuizOptionsFieldset";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { AdminQuizQuestion } from "@/lib/types";

const initialState: ActionState = {};

export function EditQuizQuestionForm({
  question,
  roadmapId,
  phaseId,
}: {
  question: AdminQuizQuestion;
  roadmapId: string;
  phaseId: string;
}) {
  const [state, formAction, pending] = useActionState(updateQuizQuestionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="id" value={question.id} />
      <input type="hidden" name="roadmapId" value={roadmapId} />
      <input type="hidden" name="phaseId" value={phaseId} />

      <LocalizedTextInput label="نص السؤال" name="text" defaultValue={question.text} required />

      <Input label="الترتيب" name="orderIndex" type="number" min="0" required defaultValue={question.orderIndex} dir="ltr" />

      <QuizOptionsFieldset existingOptions={question.options} />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ التعديلات"}
      </Button>
    </form>
  );
}
