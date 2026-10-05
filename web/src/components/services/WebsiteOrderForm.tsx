"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitWebsiteOrderAction, type WebsiteOrderState } from "@/app/build-website/actions";
import { restoreFormValues } from "@/lib/restoreFormValues";
import { WEBSITE_TYPE_KEYS } from "@/lib/websiteOrderOptions";
import type { BuildWebsiteContent } from "@/lib/i18n/content/buildWebsite";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

const initialState: WebsiteOrderState = {};

// maxLength values mirror the column limits in WebsiteOrderConfiguration, so an over-long entry
// is stopped in the browser instead of failing as a database error after submit.
export function WebsiteOrderForm({ t }: { t: BuildWebsiteContent["form"] }) {
  const [state, formAction, pending] = useActionState(submitWebsiteOrderAction, initialState);
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
      <Input label={t.fullName} name="fullName" maxLength={200} required />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label={t.phone} name="phone" type="tel" dir="ltr" maxLength={40} required />
        <Input label={t.email} name="email" type="email" dir="ltr" maxLength={320} required />
      </div>

      <Input label={t.projectName} name="projectName" maxLength={200} required />

      <Select label={t.websiteType} name="websiteType" defaultValue={WEBSITE_TYPE_KEYS[0]}>
        {WEBSITE_TYPE_KEYS.map((key) => (
          <option key={key} value={key}>
            {t.types[key]}
          </option>
        ))}
      </Select>

      <Textarea label={t.description} name="description" placeholder={t.descriptionPlaceholder} rows={4} maxLength={2000} required />

      <Input label={t.contactTime} name="preferredContactTime" placeholder={t.contactTimePlaceholder} maxLength={200} />

      {state.message && <p className="text-sm text-danger">{state.message}</p>}

      <Button type="submit" variant="accent" size="lg" loading={pending} className="mt-2 w-full">
        {pending ? t.sending : t.submit}
      </Button>

      <p className="text-center text-xs text-neutral-400">{t.privacy}</p>
    </form>
  );
}
