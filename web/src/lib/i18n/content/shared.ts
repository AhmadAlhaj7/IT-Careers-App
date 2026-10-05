import type { Locale } from "../locale";

// Copy shared by both service pages (consultation + build-website). Each content module declares
// Arabic first and types English as `typeof ar`, so a key added to one language but not the other
// is a compile error rather than a blank string on the live page.
const ar = {
  backToServices: "كل الخدمات",
  sections: {
    whatYouGet: "شو بتحصل عليه",
    packageLabel: "الباقة والسعر",
    process: "كيف تمشي العملية",
    terms: "الشروط",
    faq: "أسئلة متكررة",
  },
  about: {
    title: "مين أنا",
    photoLabel: "صورتك",
    name: "أحمد الحاج",
    bio: "مطوّر أنظمة أستخدم الذكاء الاصطناعي — وتحديدًا Claude — في شغلي الحقيقي يوميًا، مو بس أشرح إمكانياته نظريًا. أشارك رحلتي في تعلّم البرمجة والذكاء الاصطناعي مع أكثر من 11.6 ألف متابع على إنستغرام.",
    worksLead: "من أعمالي: موقع صالة رياضية بنيته بالكامل بنفس الأدوات اللي أستخدمها",
    screenshotLabel: "لقطة من موقع الصالة الرياضية — تُضاف لاحقًا",
  },
};

const en: typeof ar = {
  backToServices: "All services",
  sections: {
    whatYouGet: "What you get",
    packageLabel: "Package & price",
    process: "How it works",
    terms: "Terms",
    faq: "Frequently asked questions",
  },
  about: {
    title: "Who am I",
    photoLabel: "Your photo",
    name: "Ahmad Alhaj",
    bio: "I'm an AI systems developer who uses AI — Claude in particular — in my real daily work, not just explaining what it can do in theory. I share my journey learning programming and AI with more than 11.6K followers on Instagram.",
    worksLead: "From my work: a gym website I built entirely with the same tools I use",
    screenshotLabel: "Screenshot of the gym website — added later",
  },
};

export type SharedContent = typeof ar;
export const sharedContent: Record<Locale, SharedContent> = { ar, en };
