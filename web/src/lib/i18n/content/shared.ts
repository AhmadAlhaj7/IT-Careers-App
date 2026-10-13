import type { Locale } from "../locale";

// Copy shared by both service pages (consultation + build-website). Each content module declares
// Arabic first and types English as `typeof ar`, so a key added to one language but not the other
// is a compile error rather than a blank string on the live page.
const ar = {
  backToServices: "كل الخدمات",
  sections: {
    whatYouGet: "شو بتحصل عليه",
    process: "كيف تمشي العملية",
    terms: "الشروط",
    faq: "أسئلة متكررة",
  },
  about: {
    title: "مين أنا",
    photoAlt: "صورة أحمد الحاج أحمد",
    name: "أحمد الحاج أحمد",
    bio: "مهندس برمجيات متخرّج بتخصص هندسة البرمجيات، وعندي خبرة عملية في بناء الأنظمة والمواقع الحقيقية.",
    // Rendered as "{instagramLead} @handle{instagramTail}" — the handle is a link to the profile, and the
    // tail starts with its own comma so it sits right against the handle.
    instagramLead: "أنشر محتوى برمجي على إنستغرام في حسابي",
    instagramTail: "، ويتابعني فيه أكثر من 13 ألف شخص.",
    worksLead: "من أعمالي: موقع صالة رياضية بنيته بالكامل",
    videoLabel: "فيديو جولة في موقع صالة إس كيه ستاديوم الرياضية",
  },
};

const en: typeof ar = {
  backToServices: "All services",
  sections: {
    whatYouGet: "What you get",
    process: "How it works",
    terms: "Terms",
    faq: "Frequently asked questions",
  },
  about: {
    title: "Who am I",
    photoAlt: "Photo of Ahmad Alhaj Ahmad",
    name: "Ahmad Alhaj Ahmad",
    bio: "I'm an experienced software engineer with a degree in software engineering and hands-on experience building real systems and websites.",
    instagramLead: "I post programming content on Instagram at",
    instagramTail: ", where more than 13K people follow along.",
    worksLead: "From my work: a gym website I built from scratch",
    videoLabel: "Video tour of the S.K. Stadium gym website",
  },
};

export type SharedContent = typeof ar;
export const sharedContent: Record<Locale, SharedContent> = { ar, en };
