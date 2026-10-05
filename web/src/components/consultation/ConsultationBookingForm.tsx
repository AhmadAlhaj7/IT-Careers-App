"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitConsultationBookingAction, type ConsultationBookingState } from "@/app/book-consultation/actions";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { RadioCard } from "@/components/ui/RadioCard";
import { Button } from "@/components/ui/Button";

const initialState: ConsultationBookingState = {};

export function ConsultationBookingForm() {
  const [state, formAction, pending] = useActionState(submitConsultationBookingAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.values) {
      restoreFormValues(formRef.current, state.values);
    }
  }, [state]);

  if (state.success) {
    return (
      <div className="rounded-panel border border-primary/30 bg-primary-subtle p-6 text-center">
        <p className="text-lg font-bold text-primary">تم استلام طلبك بنجاح</p>
        <p className="mt-2 text-sm text-neutral-600">سنتواصل معك خلال 24 ساعة لتحديد موعد الاستشارة.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <Input label="الاسم الكامل" name="fullName" required />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="رقم الهاتف" name="phone" type="tel" dir="ltr" required />
        <Input label="البريد الإلكتروني" name="email" type="email" dir="ltr" required />
      </div>

      <Textarea label="شو فكرة موقعك؟" name="websiteIdea" placeholder="احكيلي عن فكرة موقعك باختصار" rows={3} />

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-neutral-700">هل لديك خبرة سابقة في البرمجة؟</legend>
        <div className="grid grid-cols-2 gap-3">
          <RadioCard name="hasPriorExperience" value="yes" label="نعم" />
          <RadioCard name="hasPriorExperience" value="no" label="لا" defaultChecked />
        </div>
      </fieldset>

      <Input label="الوقت المناسب للتواصل معك" name="preferredContactTime" placeholder="مثال: مساءً بعد السابعة" />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" variant="accent" size="lg" loading={pending} className="mt-2 w-full">
        {pending ? "جارٍ الإرسال..." : "تأكيد التسجيل"}
      </Button>

      <p className="text-center text-xs text-neutral-400">بياناتك ما رح تنشارك مع أي جهة.</p>
    </form>
  );
}
