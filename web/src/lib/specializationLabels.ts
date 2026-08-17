import type { LocalizedText, SpecializationCategory, SpecializationDemandLevel } from "./types";

// Display strings for the two enums — the admin panel is Arabic-only so it hardcodes its own
// labels (see SpecializationBasicsFields.tsx), but this public page is bilingual, so these
// need a real ar/en pair each.
export const CATEGORY_LABELS: Record<SpecializationCategory, LocalizedText> = {
  Development: { ar: "تطوير", en: "Development" },
  Data: { ar: "بيانات", en: "Data" },
  Security: { ar: "أمن", en: "Security" },
  Infrastructure: { ar: "بنية تحتية", en: "Infrastructure" },
};

export const DEMAND_LABELS: Record<SpecializationDemandLevel, LocalizedText> = {
  High: { ar: "طلب مرتفع", en: "High demand" },
  Good: { ar: "طلب جيد", en: "Good demand" },
  Stable: { ar: "طلب مستقر", en: "Stable demand" },
};
