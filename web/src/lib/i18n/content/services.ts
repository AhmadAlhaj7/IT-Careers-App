import type { Locale } from "../locale";

const ar = {
  meta: {
    title: "الخدمات — حلقة",
    description: "اختر بين استشارة تتعلّم فيها بناء موقعك بنفسك، أو خدمة أبني فيها موقعك لك.",
  },
  titleStart: "كيف أقدر",
  titleAccent: "أخدمك",
  titleEnd: "؟",
  subtitle: "اختر الباقة اللي تناسبك.",
  // Order matches PACKAGE_LINKS in the page: consultation first, website second.
  packages: [
    {
      eyebrow: "لمن يبي يتعلّم",
      title: "استشارة: أعلّمك تبني موقعك بنفسك",
      description: "جلسات فردية أعلّمك فيها استخدام Claude لتبني موقعك خطوة بخطوة.",
      points: ["3 جلسات فردية عن بُعد", "أسبوع دعم عبر واتساب بعد آخر جلسة", "لا حاجة لأي خبرة برمجية"],
      cta: "شوف تفاصيل الاستشارة",
    },
    {
      eyebrow: "لمن يبي موقعه جاهز",
      title: "موقع: أبنيه لك بالكامل",
      description: "تعطيني فكرتك ومحتواك، وأسلّمك موقعًا جاهزًا للنشر.",
      points: ["أنا أبني وأنت تركّز على مشروعك", "مراجعة وتعديلات قبل التسليم", "الموقع ملكك بالكامل"],
      cta: "شوف تفاصيل الخدمة",
    },
  ],
};

const en: typeof ar = {
  meta: {
    title: "Services — Halaqa",
    description: "Choose between a consultation where you learn to build your website yourself, or a service where I build it for you.",
  },
  titleStart: "How can I",
  titleAccent: "help you",
  titleEnd: "?",
  subtitle: "Choose the package that fits you.",
  packages: [
    {
      eyebrow: "For those who want to learn",
      title: "Consultation: I teach you to build your own website",
      description: "One-on-one sessions where I teach you to use Claude to build your website, step by step.",
      points: ["3 one-on-one remote sessions", "One week of WhatsApp support after the last session", "No programming experience needed"],
      cta: "See consultation details",
    },
    {
      eyebrow: "For those who want it done for them",
      title: "Website: I build it for you, end to end",
      description: "You give me your idea and content, and I hand you a website ready to publish.",
      points: ["I build, you focus on your project", "Review and revisions before delivery", "The website is entirely yours"],
      cta: "See service details",
    },
  ],
};

export const servicesContent: Record<Locale, typeof ar> = { ar, en };
