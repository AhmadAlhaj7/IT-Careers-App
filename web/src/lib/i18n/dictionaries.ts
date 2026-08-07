import type { Locale } from "./locale";

// Grows page-by-page as the rest of the site gets translated — for now it covers the
// shared shell (nav, language switcher) and the home/roadmaps pages.
const dictionaries = {
  ar: {
    nav: {
      home: "الرئيسية",
      roadmaps: "المسارات",
      quiz: "بوصلة المهنة",
      dashboard: "لوحتي",
      admin: "الإدارة",
      signIn: "تسجيل الدخول",
      menu: "القائمة",
    },
    languageSwitcher: {
      trigger: "العربية",
      english: "English",
      arabic: "العربية",
    },
    home: {
      badge: "منصة عربية لتعلّم البرمجة والتقنية",
      titleStart: "ابدأ",
      titleAccent: "مسارك",
      titleEnd: "في عالم التقنية",
      subtitle: "مسارات تعليمية منظمة، مرحلة بمرحلة، تأخذك من الأساسيات إلى الاحتراف.",
      browseCta: "استعرض المسارات",
      quizCta: "لا تعرف من أين تبدأ؟ جرّب بوصلة المهنة",
        techMajorsCta: "استكشف افضل التخصصات التقنية ",
    },
    roadmapsPage: {
      title: "المسارات التعليمية",
      empty: "لا توجد مسارات متاحة حاليًا.",
      buyNow: "اشترِ الآن",
      discoverMore: "اكتشف المزيد",
    },
    techMajorsPage: {
      title: "استكشف التخصصات التقنية",
      intro:
        "ننصح دائمًا من هم جدد على عالم التقنية بالتعرّف على المجال الذي يهمّهم قبل البدء فيه: ما هو هذا التخصص؟ وما هي الوظائف التي قد يعمل بها بعد إتقانه؟ وهل يناسبك فعلًا؟ هذه الصفحة ستساعدك على ذلك، فقط اضغط على التخصص الذي يثير اهتمامك لتتعرف عليه أكثر.",
    },
  },
  en: {
    nav: {
      home: "Home",
      roadmaps: "Roadmaps",
      quiz: "Career Compass",
      dashboard: "Dashboard",
      admin: "Admin",
      signIn: "Sign in",
      menu: "Menu",
    },
    languageSwitcher: {
      trigger: "English",
      english: "English",
      arabic: "العربية",
    },
    home: {
      badge: "An Arabic platform for learning programming and tech",
      titleStart: "Start",
      titleAccent: "your path",
      titleEnd: "in tech",
      subtitle: "Structured, phase-by-phase learning paths that take you from the basics to mastery.",
      browseCta: "Browse roadmaps",
      quizCta: "Not sure where to start? Try the career compass",
      techMajorsCta: "What Tech Programs are there?",
    },
    roadmapsPage: {
      title: "Learning Roadmaps",
      empty: "No roadmaps available right now.",
      buyNow: "Buy now",
      discoverMore: "Discover more",
    },
    techMajorsPage: {
      title: "Explore Tech Majors",
      intro:
        "We always recommend that people new to tech read about what interests them before diving in — what is it, what will you actually work on afterward, is it the right fit for you? This page is here to help: just click on whatever catches your interest and see if it might be a fit.",
    },
  },
} as const satisfies Record<Locale, unknown>;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
