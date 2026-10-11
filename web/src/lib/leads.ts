import type { AdminConsultationBooking, AdminWebsiteOrder, LeadStatus } from "./types";

// The admin inbox shows every kind of lead in one list. Each keeps its own API shape; `kind` tells
// the inbox which details to render and which endpoint a status change or delete goes to.
export type LeadKind = "consultation" | "website";

export type InboxLead =
  | ({ kind: "consultation" } & AdminConsultationBooking)
  | ({ kind: "website" } & AdminWebsiteOrder);

// Pipeline order, left to right. Labels are Arabic only, like the rest of the admin panel.
export const LEAD_STATUSES: { value: LeadStatus; label: string; className: string }[] = [
  { value: "New", label: "جديد", className: "bg-accent/10 text-accent" },
  { value: "Contacted", label: "تم التواصل", className: "bg-secondary/10 text-secondary" },
  { value: "Agreed", label: "تم الاتفاق", className: "bg-primary/10 text-primary" },
  { value: "Closed", label: "مغلق", className: "bg-neutral-100 text-neutral-500" },
];

export const LEAD_KIND_LABELS: Record<LeadKind, string> = {
  consultation: "استشارة",
  website: "بناء موقع",
};

export function isLeadStatus(value: string | undefined): value is LeadStatus {
  return LEAD_STATUSES.some((status) => status.value === value);
}

export function leadApiPath(kind: LeadKind, id: string): string {
  return kind === "consultation" ? `/api/admin/consultation-bookings/${id}` : `/api/admin/website-orders/${id}`;
}

// wa.me wants the number in international form with digits only. Numbers typed in local form
// (leading 0) can't be resolved without knowing the country, so those get no WhatsApp link.
export function whatsAppUrl(phone: string): string | null {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8) return null;
  if (trimmed.startsWith("+")) return `https://wa.me/${digits}`;
  if (digits.startsWith("00")) return `https://wa.me/${digits.slice(2)}`;
  return null;
}
