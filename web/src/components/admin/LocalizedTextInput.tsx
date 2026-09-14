import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

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
  const Field = multiline ? Textarea : Input;

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-neutral-700">{label}</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field name={`${name}Ar`} defaultValue={defaultValue?.ar} required={required} dir="rtl" label={<span className="text-xs text-neutral-500">عربي</span>} />
        <Field name={`${name}En`} defaultValue={defaultValue?.en} required={required} dir="ltr" label={<span className="text-xs text-neutral-500">English</span>} />
      </div>
    </fieldset>
  );
}
