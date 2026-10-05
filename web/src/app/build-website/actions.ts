"use server";

import { getLocale } from "@/lib/i18n/locale";
import { buildWebsiteContent } from "@/lib/i18n/content/buildWebsite";
import { WEBSITE_TYPE_KEYS } from "@/lib/websiteOrderOptions";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

export type WebsiteOrderState = { message?: string; success?: boolean; values?: Record<string, string> };

function snapshotFormValues(formData: FormData): Record<string, string> {
  const snapshot: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      snapshot[key] = value;
    }
  }
  return snapshot;
}

// Public lead-capture form — no auth check, same reasoning as submitConsultationBookingAction.
export async function submitWebsiteOrderAction(_prevState: WebsiteOrderState, formData: FormData): Promise<WebsiteOrderState> {
  const t = buildWebsiteContent[await getLocale()].form;

  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const projectName = String(formData.get("projectName") ?? "").trim();
  const submittedType = String(formData.get("websiteType") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  const preferredContactTime = String(formData.get("preferredContactTime") ?? "").trim();

  if (!fullName || !phone || !email || !projectName || !description) {
    return { message: t.errorRequired, values: snapshotFormValues(formData) };
  }

  // Only ever store a key from the known list, so a tampered request can't write arbitrary text.
  const websiteType = (WEBSITE_TYPE_KEYS as readonly string[]).includes(submittedType) ? submittedType : "other";

  const response = await fetch(`${API_URL}/api/website-orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, phone, email, projectName, websiteType, description, preferredContactTime }),
  });

  if (!response.ok) {
    return { message: t.errorSendFailed.replace("{status}", String(response.status)), values: snapshotFormValues(formData) };
  }

  return { success: true };
}
