import { LocalizedTextInput } from "./LocalizedTextInput";
import type { AdminCareerQuizOption, AdminTrack } from "@/lib/types";

type CareerQuizOptionsFieldsetProps = {
  tracks: AdminTrack[];
  existingOptions?: AdminCareerQuizOption[];
};

// Same "always exactly 4 slots" shape as QuizOptionsFieldset, but instead of one radio picking
// the correct answer, each option carries a weight number input per track — picking that
// option nudges the learner's recommendation toward every track with a nonzero weight there.
export function CareerQuizOptionsFieldset({ tracks, existingOptions }: CareerQuizOptionsFieldsetProps) {
  return (
    <fieldset className="flex flex-col gap-4 rounded-md border border-neutral-200 p-4">
      <legend className="px-1 text-sm font-medium text-neutral-700">الخيارات (وزن كل خيار تجاه كل مسار رئيسي)</legend>
      {[0, 1, 2, 3].map((index) => {
        const existingOption = existingOptions?.[index];

        return (
          <div key={index} className="flex flex-col gap-2 border-b border-neutral-100 pb-4 last:border-b-0 last:pb-0">
            <LocalizedTextInput
              label={`الخيار ${index + 1}${index < 2 ? "" : " (اختياري)"}`}
              name={`option${index}`}
              defaultValue={existingOption?.text}
              required={index < 2}
            />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {tracks.map((track) => {
                const existingWeight = existingOption?.trackWeights.find((w) => w.trackId === track.id)?.weight ?? 0;
                return (
                  <label key={track.id} className="flex flex-col gap-1">
                    <span className="text-xs text-neutral-500">{track.name.ar}</span>
                    <input
                      type="number"
                      name={`option${index}Track_${track.id}`}
                      defaultValue={existingWeight}
                      dir="ltr"
                      className="rounded-md border border-neutral-300 px-2 py-1 text-sm"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </fieldset>
  );
}
