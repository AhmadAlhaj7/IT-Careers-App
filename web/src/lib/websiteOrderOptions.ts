import { buildWebsiteContent } from "@/lib/i18n/content/buildWebsite";

// Stable keys are what the form submits and the database stores; the display labels live in the
// page's bilingual content (form.types). Deliberately no "online store" key — that's a much bigger
// build than the website package covers, so it falls under "other" and gets scoped in conversation.
export const WEBSITE_TYPE_KEYS = ["business", "personal", "landing", "other"] as const;

// The admin panel is Arabic-only, so its list always labels types from the Arabic copy.
export function websiteTypeLabel(key: string): string {
  return (buildWebsiteContent.ar.form.types as Record<string, string>)[key] ?? key;
}
