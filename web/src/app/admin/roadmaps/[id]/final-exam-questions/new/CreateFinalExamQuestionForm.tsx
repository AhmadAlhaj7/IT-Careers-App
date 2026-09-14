"use client";

import { useActionState, useEffect, useRef } from "react";
import { createFinalExamQuestionAction, type ActionState } from "@/app/admin/actions";
import { LocalizedTextInput } from "@/components/admin/LocalizedTextInput";
import { QuizOptionsFieldset } from "@/components/admin/QuizOptionsFieldset";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const initialState: ActionState = {};

export function CreateFinalExamQuestionForm({
  roadmapId,
  nextOrderIndex,
}: {
  roadmapId: string;
  nextOrderIndex: number;
}) {
  const [state, formAction, pending] = useActionState(createFinalExamQuestionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-5">
      <input type="hidden" name="roadmapId" value={roadmapId} />

      <LocalizedTextInput label="نص السؤال" name="text" required />

      <Input label="الترتيب" name="orderIndex" type="number" min="0" required defaultValue={nextOrderIndex} dir="ltr" />

      <QuizOptionsFieldset />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" loading={pending}>
        {pending ? "جارٍ الحفظ..." : "حفظ"}
      </Button>
    </form>
  );
}
