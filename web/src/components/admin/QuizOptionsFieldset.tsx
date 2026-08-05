import { LocalizedTextInput } from "./LocalizedTextInput";
import type { AdminQuizOption } from "@/lib/types";

type QuizOptionsFieldsetProps = {
  existingOptions?: AdminQuizOption[];
};

// Always exactly 4 slots (only the first 2 required) rather than a dynamic add/remove list —
// covers every real multiple-choice question without needing client-side array state.
export function QuizOptionsFieldset({ existingOptions }: QuizOptionsFieldsetProps) {
  const correctIndex = existingOptions?.findIndex((option) => option.isCorrect) ?? -1;

  return (
    <fieldset className="flex flex-col gap-4 rounded-md border border-neutral-200 p-4">
      <legend className="px-1 text-sm font-medium text-neutral-700">الخيارات (اختر الإجابة الصحيحة)</legend>
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="flex items-start gap-3">
          <input
            type="radio"
            name="correctOptionIndex"
            value={index}
            required={index === 0}
            defaultChecked={index === (correctIndex >= 0 ? correctIndex : 0)}
            className="mt-3 h-4 w-4"
          />
          <div className="flex-1">
            <LocalizedTextInput
              label={`الخيار ${index + 1}${index < 2 ? "" : " (اختياري)"}`}
              name={`option${index}`}
              defaultValue={existingOptions?.[index]?.text}
              required={index < 2}
            />
          </div>
        </div>
      ))}
    </fieldset>
  );
}
