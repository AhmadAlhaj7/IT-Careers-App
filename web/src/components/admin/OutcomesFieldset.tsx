import { LocalizedTextInput } from "./LocalizedTextInput";
import type { LocalizedText } from "@/lib/types";

const MAX_OUTCOMES = 6;

// Same "fixed slots, all optional" shape as CareerQuizOptionsFieldset — the Server Action
// filters out any slot left blank in both languages, so the admin can fill as few or as many
// as they want without needing a dynamic add/remove list.
export function OutcomesFieldset({ existingOutcomes }: { existingOutcomes?: LocalizedText[] }) {
  return (
    <fieldset className="flex flex-col gap-4 rounded-md border border-neutral-200 p-4">
      <legend className="px-1 text-sm font-medium text-neutral-700">ماذا سيتعلم المشترك؟ (اختياري)</legend>
      {Array.from({ length: MAX_OUTCOMES }, (_, index) => (
        <LocalizedTextInput
          key={index}
          label={`نقطة ${index + 1}`}
          name={`outcome${index}`}
          defaultValue={existingOutcomes?.[index]}
        />
      ))}
    </fieldset>
  );
}
