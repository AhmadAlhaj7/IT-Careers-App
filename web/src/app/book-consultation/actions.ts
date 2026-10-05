"use server";

import { getLocale } from "@/lib/i18n/locale";
import { consultationContent } from "@/lib/i18n/content/consultation";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

export type ConsultationBookingState = { message?: string; success?: boolean; values?: Record<string, string> };

function snapshotFormValues(formData: FormData): Record<string, string> {
  const snapshot: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      snapshot[key] = value;
    }
  }
  return snapshot;
}

// Deliberately no auth check — same reasoning as submitCareerQuizAction: this is a public
// lead-capture form, open to anyone whether they're signed in or not.
export async function submitConsultationBookingAction(
  _prevState: ConsultationBookingState,
  formData: FormData,
): Promise<ConsultationBookingState> {
  const t = consultationContent[await getLocale()].form;

  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const hasPriorExperience = formData.get("hasPriorExperience") === "yes";
  const websiteIdea = String(formData.get("websiteIdea") ?? "").trim();
  const preferredContactTime = String(formData.get("preferredContactTime") ?? "").trim();

  if (!fullName || !phone || !email) {
    return { message: t.errorRequired, values: snapshotFormValues(formData) };
  }

  const response = await fetch(`${API_URL}/api/consultation-bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName,
      phone,
      email,
      hasPriorExperience,
      websiteIdea,
      preferredContactTime,
    }),
  });

  if (!response.ok) {
    return { message: t.errorSendFailed.replace("{status}", String(response.status)), values: snapshotFormValues(formData) };
  }

  return { success: true };
}
