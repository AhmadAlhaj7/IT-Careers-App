import type { Locale } from "../locale";

// The confirmation email a visitor gets after submitting a consultation or website request — sent in
// the language they used on the site. `{name}` is replaced with their name.
const ar = {
  greeting: "مرحبًا {name}،",
  services: {
    consultation: "استشارة بناء موقعك باستخدام Claude",
    website: "بناء موقعك",
  },
  subject: "وصلنا طلبك — {service}",
  intro: "شكرًا لتواصلك! وصلنا طلبك بخصوص «{service}» بنجاح.",
  nextStep: "سأراجع طلبك وأتواصل معك خلال 24 ساعة لنتفق على التفاصيل.",
  summaryTitle: "ملخص ما أرسلته",
  fields: {
    phone: "رقم الهاتف",
    contactTime: "الوقت المناسب للتواصل",
    idea: "فكرة الموقع",
    projectName: "اسم المشروع",
    description: "وصف الموقع",
  },
  replyHint: "إذا أردت إضافة أي تفاصيل، يمكنك الرد على هذا البريد مباشرة.",
  signoff: "أحمد الحاج — حلقة",
};

const en: typeof ar = {
  greeting: "Hi {name},",
  services: {
    consultation: "Build-your-website-with-Claude consultation",
    website: "Website build",
  },
  subject: "We received your request — {service}",
  intro: "Thanks for reaching out! Your “{service}” request came through successfully.",
  nextStep: "I'll review it and contact you within 24 hours to go over the details.",
  summaryTitle: "What you sent",
  fields: {
    phone: "Phone",
    contactTime: "Best time to contact you",
    idea: "Website idea",
    projectName: "Project name",
    description: "Website description",
  },
  replyHint: "If you'd like to add anything, just reply to this email.",
  signoff: "Ahmad Alhaj — Halaqa",
};

export const leadEmailsContent: Record<Locale, typeof ar> = { ar, en };
