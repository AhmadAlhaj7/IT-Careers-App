// After a failed Server Action submission, React resets every uncontrolled form field back to
// its original defaultValue (the last-saved server data) — even though the action itself never
// touched the database. Without this, any save error (a blob upload failure, a slug conflict,
// a dropped connection) wipes out everything the admin just typed and they have to redo it all.
// Call this from a useEffect keyed on the action's returned state: it walks the live form and
// re-applies exactly what was submitted, so only the field that actually caused the failure
// needs fixing.
export function restoreFormValues(form: HTMLFormElement | null, values: Record<string, string>): void {
  if (!form) return;

  for (const element of Array.from(form.elements)) {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
      continue;
    }

    const name = element.name;
    if (!name) continue;

    if (element instanceof HTMLInputElement && element.type === "checkbox") {
      element.checked = values[name] === "on";
      continue;
    }

    // File inputs can't be restored programmatically (browser security restriction) — the
    // admin has to re-pick the file, but that's the one field that's expected to need it.
    if (element instanceof HTMLInputElement && element.type === "file") {
      continue;
    }

    if (name in values) {
      element.value = values[name];
    }
  }
}
