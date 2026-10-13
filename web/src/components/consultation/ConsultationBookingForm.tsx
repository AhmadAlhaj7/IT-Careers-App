"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitConsultationBookingAction, type ConsultationBookingState } from "@/app/book-consultation/actions";
import { restoreFormValues } from "@/lib/restoreFormValues";
import type { ConsultationContent } from "@/lib/i18n/content/consultation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { RadioCard } from "@/components/ui/RadioCard";
import { Button } from "@/components/ui/Button";

const initialState: ConsultationBookingState = {};

export function ConsultationBookingForm({ t }: { t: ConsultationContent["form"] }) {
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
        <p className="text-lg font-bold text-primary">{t.successTitle}</p>
        <p className="mt-2 text-sm text-neutral-600">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <Input label={t.fullName} name="fullName" placeholder={t.fullNamePlaceholder} maxLength={200} required />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label={t.phone} name="phone" type="tel" placeholder={t.phonePlaceholder} dir="ltr" maxLength={40} required />
        <Input label={t.email} name="email" type="email" placeholder={t.emailPlaceholder} dir="ltr" maxLength={320} required />
      </div>

      <Textarea label={t.websiteIdea} name="websiteIdea" placeholder={t.websiteIdeaPlaceholder} rows={3} maxLength={2000} />

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-neutral-700">{t.experienceLegend}</legend>
        <div className="grid grid-cols-2 gap-3">
          <RadioCard name="hasPriorExperience" value="yes" label={t.yes} />
          <RadioCard name="hasPriorExperience" value="no" label={t.no} defaultChecked />
        </div>
      </fieldset>

      <Input label={t.contactTime} name="preferredContactTime" placeholder={t.contactTimePlaceholder} maxLength={200} />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" variant="accent" size="lg" loading={pending} className="mt-2 w-full">
        {pending ? t.sending : t.submit}
      </Button>

      <p className="text-center text-xs text-neutral-400">{t.privacy}</p>
    </form>
  );
}
