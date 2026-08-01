type LocalizedTextInputProps = {
  label: string;
  name: string;
  defaultValue?: { ar: string; en: string };
  multiline?: boolean;
  required?: boolean;
};

// Every authored entity has at least one bilingual field, so every create form needs this
// same Arabic/English pair. Field names come out as `${name}Ar` / `${name}En` in the
// submitted FormData — the Server Action reassembles them into { ar, en } for the API.
export function LocalizedTextInput({
  label,
  name,
  defaultValue,
  multiline = false,
  required = false,
}: LocalizedTextInputProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-neutral-700">{label}</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-neutral-500">عربي</span>
          {multiline ? (
            <textarea
              name={`${name}Ar`}
              defaultValue={defaultValue?.ar}
              required={required}
              dir="rtl"
              rows={3}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          ) : (
            <input
              name={`${name}Ar`}
              defaultValue={defaultValue?.ar}
              required={required}
              dir="rtl"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          )}
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-neutral-500">English</span>
          {multiline ? (
            <textarea
              name={`${name}En`}
              defaultValue={defaultValue?.en}
              required={required}
              dir="ltr"
              rows={3}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          ) : (
            <input
              name={`${name}En`}
              defaultValue={defaultValue?.en}
              required={required}
              dir="ltr"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm"
            />
          )}
        </label>
      </div>
    </fieldset>
  );
}
