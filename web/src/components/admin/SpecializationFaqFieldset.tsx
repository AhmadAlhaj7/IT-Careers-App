import { LocalizedTextInput } from "./LocalizedTextInput";
import { MAX_FAQS } from "@/lib/specializationSections";
import type { AdminSpecializationDetail } from "@/lib/types";

// Same fixed-slot idea as OutcomesFieldset — up to MAX_FAQS rows, empty ones dropped by
// parseSpecializationFaqs on save.
export function SpecializationFaqFieldset({ specialization, pending }: { specialization: AdminSpecializationDetail; pending: boolean }) {
  return (
    <fieldset disabled={pending} className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm shadow-neutral-900/5">
      <h2 className="text-lg font-bold text-neutral-900">الأسئلة الشائعة</h2>
      <p className="mt-1 mb-4 text-sm text-neutral-500">أسئلة الزائر الحقيقية قبل أن يقرّر. ثلاثة إلى ستة أسئلة كافية.</p>

      <div className="flex flex-col gap-4">
        {Array.from({ length: MAX_FAQS }, (_, index) => {
          const faq = specialization.faqs[index];
          return (
            <div key={index} className="rounded-xl border border-neutral-200 p-4">
              <LocalizedTextInput label={`سؤال ${index + 1}`} name={`faq${index}Q`} defaultValue={faq?.question} />
              <div className="mt-2">
                <LocalizedTextInput label="الإجابة" name={`faq${index}A`} defaultValue={faq?.answer} multiline />
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
