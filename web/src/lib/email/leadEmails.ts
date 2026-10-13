import type { Locale } from "@/lib/i18n/locale";
import { leadEmailsContent } from "@/lib/i18n/content/leadEmails";
import { websiteTypeLabel } from "@/lib/websiteOrderOptions";
import { LEAD_KIND_LABELS } from "@/lib/leads";
import { OWNER_EMAIL, sendEmail, type OutgoingEmail } from "./mailer";

// What a public form hands over once the API has saved the lead.
export type NewLead =
  | {
      kind: "consultation";
      fullName: string;
      email: string;
      phone: string;
      preferredContactTime: string;
      hasPriorExperience: boolean;
      isStudent: boolean;
      websiteIdea: string;
    }
  | {
      kind: "website";
      fullName: string;
      email: string;
      phone: string;
      preferredContactTime: string;
      projectName: string;
      websiteType: string;
      description: string;
    };

// `ltr` keeps phone numbers and addresses in reading order inside an Arabic (RTL) email; every other
// value is dir="auto", since visitors may type Arabic on the English site and vice versa.
type Row = { label: string; value: string; ltr?: boolean };

// Where the "open inbox" button in your notification points. Taken from configuration, never from the
// request's Host header (which a visitor controls). On Vercel, VERCEL_PROJECT_PRODUCTION_URL is set
// automatically to the production domain.
const SITE_URL =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3001");

// Sends both emails for a new lead: the visitor's confirmation and your notification. Never throws —
// it runs after the visitor already saw "request received", so a mail failure is only logged.
export async function notifyNewLead(lead: NewLead, locale: Locale): Promise<void> {
  const results = await Promise.allSettled([
    sendEmail(visitorConfirmation(lead, locale)),
    OWNER_EMAIL ? sendEmail(ownerNotification(lead, OWNER_EMAIL)) : Promise.resolve(),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[email] failed to send a lead email:", result.reason);
    }
  }
}

function visitorConfirmation(lead: NewLead, locale: Locale): OutgoingEmail {
  const t = leadEmailsContent[locale];
  const service = t.services[lead.kind];

  const rows: Row[] = [
    { label: t.fields.phone, value: lead.phone, ltr: true },
    ...(lead.kind === "consultation"
      ? [
          { label: t.fields.idea, value: lead.websiteIdea },
          ...(lead.isStudent ? [{ label: t.fields.studentDiscount, value: t.studentDiscountRequested }] : []),
        ]
      : [
          { label: t.fields.projectName, value: lead.projectName },
          { label: t.fields.description, value: lead.description },
        ]),
    { label: t.fields.contactTime, value: lead.preferredContactTime },
  ].filter((row) => row.value);

  const paragraphs = [t.intro.replace("{service}", service), t.nextStep];

  return {
    to: lead.email,
    subject: t.subject.replace("{service}", service),
    // Replies land in your inbox (the sending account), so "just reply" in the email works.
    replyTo: OWNER_EMAIL,
    html: layout({
      dir: locale === "ar" ? "rtl" : "ltr",
      lang: locale,
      heading: t.greeting.replace("{name}", lead.fullName),
      paragraphs,
      tableTitle: t.summaryTitle,
      rows,
      footer: [t.replyHint, t.signoff],
    }),
    text: [
      t.greeting.replace("{name}", lead.fullName),
      "",
      ...paragraphs,
      "",
      `${t.summaryTitle}:`,
      ...rows.map((row) => `- ${row.label}: ${row.value}`),
      "",
      t.replyHint,
      t.signoff,
    ].join("\n"),
  };
}

// Always Arabic, like the admin panel it links to.
function ownerNotification(lead: NewLead, ownerEmail: string): OutgoingEmail {
  const kindLabel = LEAD_KIND_LABELS[lead.kind];
  const inboxUrl = `${SITE_URL}/admin/inbox?type=${lead.kind}`;

  const rows: Row[] = [
    { label: "الاسم", value: lead.fullName },
    { label: "البريد", value: lead.email, ltr: true },
    { label: "الهاتف", value: lead.phone, ltr: true },
    ...(lead.kind === "consultation"
      ? [
          { label: "خبرة سابقة", value: lead.hasPriorExperience ? "نعم" : "لا" },
          { label: "طالب", value: lead.isStudent ? "نعم — طلب خصم الطلاب" : "لا" },
          { label: "فكرة الموقع", value: lead.websiteIdea },
        ]
      : [
          { label: "اسم المشروع", value: lead.projectName },
          { label: "نوع الموقع", value: websiteTypeLabel(lead.websiteType) },
          { label: "الوصف", value: lead.description },
        ]),
    { label: "الوقت المناسب للتواصل", value: lead.preferredContactTime },
  ].filter((row) => row.value);

  return {
    to: ownerEmail,
    subject: `طلب ${kindLabel} جديد — ${lead.fullName}`,
    // Hitting reply answers the visitor directly.
    replyTo: lead.email,
    html: layout({
      dir: "rtl",
      lang: "ar",
      heading: `طلب ${kindLabel} جديد`,
      paragraphs: ["وصل طلب جديد من الموقع. التفاصيل بالأسفل، ويمكنك الرد على هذا البريد للتواصل مع صاحب الطلب مباشرة."],
      tableTitle: "تفاصيل الطلب",
      rows,
      button: { label: "افتح صندوق الطلبات", href: inboxUrl },
      footer: [],
    }),
    text: [`طلب ${kindLabel} جديد`, "", ...rows.map((row) => `- ${row.label}: ${row.value}`), "", inboxUrl].join("\n"),
  };
}

// Every value here comes from a public form, so it's escaped before it goes anywhere near HTML.
function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function multiline(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

// Email clients ignore <style> blocks and CSS variables, so everything is inline and table-based.
// Colours are the site's brand teal (#0f6e56) and accent (#a21f4a).
function layout(opts: {
  dir: "rtl" | "ltr";
  lang: string;
  heading: string;
  paragraphs: string[];
  tableTitle: string;
  rows: Row[];
  button?: { label: string; href: string };
  footer: string[];
}): string {
  const align = opts.dir === "rtl" ? "right" : "left";
  const font = "'IBM Plex Sans Arabic', Tahoma, Arial, sans-serif";

  const rowsHtml = opts.rows
    .map(
      (row) => `
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;vertical-align:top;width:38%;">${escapeHtml(row.label)}</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;vertical-align:top;">${row.ltr ? `<span dir="ltr" style="unicode-bidi:isolate;">${multiline(row.value)}</span>` : `<span dir="auto">${multiline(row.value)}</span>`}</td>
        </tr>`,
    )
    .join("");

  const buttonHtml = opts.button
    ? `<p style="margin:24px 0 0;"><a href="${escapeHtml(opts.button.href)}" style="display:inline-block;background:#a21f4a;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 22px;border-radius:10px;">${escapeHtml(opts.button.label)}</a></p>`
    : "";

  const footerHtml = opts.footer.map((line) => `<p style="margin:0 0 6px;color:#6b7280;font-size:13px;">${escapeHtml(line)}</p>`).join("");

  return `<!doctype html>
<html lang="${opts.lang}" dir="${opts.dir}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f5f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f0;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" dir="${opts.dir}" style="max-width:560px;background:#ffffff;border-radius:16px;border:1px solid #eeeeee;font-family:${font};text-align:${align};">
        <tr><td style="padding:20px 28px;border-bottom:3px solid #0f6e56;">
          <span style="font-size:22px;font-weight:bold;color:#0f6e56;">حلقة</span>
        </td></tr>
        <tr><td style="padding:28px;">
          <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">${escapeHtml(opts.heading)}</h1>
          ${opts.paragraphs.map((p) => `<p style="margin:0 0 12px;font-size:15px;line-height:1.8;color:#374151;">${escapeHtml(p)}</p>`).join("")}
          <p style="margin:24px 0 4px;font-size:13px;font-weight:bold;color:#0f6e56;">${escapeHtml(opts.tableTitle)}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eeeeee;">${rowsHtml}
          </table>
          ${buttonHtml}
        </td></tr>
        ${footerHtml ? `<tr><td style="padding:0 28px 24px;">${footerHtml}</td></tr>` : ""}
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
