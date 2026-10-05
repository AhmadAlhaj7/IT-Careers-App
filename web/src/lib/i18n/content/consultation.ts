import type { Locale } from "../locale";

const ar = {
  meta: {
    title: "احجز استشارتك — حلقة",
    description: "تعلّم بناء موقعك الخاص باستخدام Claude، خطوة بخطوة، بدعم مباشر منّي.",
  },
  hero: {
    eyebrow: "استشارة بناء المواقع بالذكاء الاصطناعي",
    titleStart: "أبني معك موقعك الخاص باستخدام",
    titleAccent: "Claude",
    titleEnd: "، خطوة بخطوة",
    subtitle: "استشارة مباشرة معي أعلّمك فيها كيف تحوّل فكرتك إلى موقع حقيقي، حتى لو لم تكتب سطر كود من قبل.",
    seats: "متبقّي 5 مقاعد فقط من الدفعة الأولى",
    cta: "احجز مقعدك",
  },
  video: { heading: "شاهد الفيديو التعريفي", placeholder: "الفيديو التعريفي — يُضاف لاحقًا" },
  features: [
    { title: "جلسة تعارف على فكرتك", body: "نبدأ بفهم فكرة موقعك ومستواك الحالي، لنحدد أفضل نقطة انطلاق." },
    { title: "خطة عمل واضحة", body: "خطوات مرتبة لبناء موقعك، بدل التخبط بين مصادر متفرقة." },
    { title: "تعلّم استخدام Claude فعليًا", body: "تتعلّم كيف تستخدم Claude كأداة برمجة حقيقية، لا مجرد نظري." },
    { title: "موقع حقيقي تطلقه بنفسك", body: "تخرج بموقع فعلي تبنيه بيدك، لا مجرد أمثلة جاهزة." },
    { title: "أسبوع دعم عبر واتساب", body: "بعد آخر جلسة، عندك أسبوع كامل تتواصل معي فيه عبر واتساب لأي عائق يواجهك." },
    { title: "دليل Claude Code الكامل", body: "دليل شامل يشرح كل ما تحتاجه عن Claude Code، يبقى معك بعد انتهاء الجلسات." },
  ],
  pkg: {
    price: "[السعر الخاص بأول 5 عملاء]",
    lines: ["3 جلسات فردية عن بُعد — مدة كل جلسة: [مدة الجلسة]", "أسبوع دعم عبر واتساب بعد آخر جلسة", "دليل Claude Code الكامل"],
  },
  process: [
    { title: "تعبّي النموذج", body: "تسجّل بياناتك وفكرة موقعك في النموذج بالأسفل." },
    { title: "أتواصل معك خلال 24 ساعة", body: "أراجع فكرتك وأتواصل معك لتنسيق التفاصيل." },
    { title: "تأكيد الموعد والدفع", body: "نتفق على موعد الجلسة الأولى ونؤكد التسجيل." },
    { title: "نبدأ نبني موقعك", body: "ندخل الجلسات الثلاث ونبني موقعك خطوة بخطوة." },
  ],
  terms: [
    "الجلسات تُعقد عن بُعد بالكامل.",
    "التواصل معك خلال 24 ساعة من إرسال طلبك.",
    "لا حاجة لأي خبرة برمجية مسبقة.",
    "المحتوى والخطة تُبنى حول فكرة موقعك أنت تحديدًا.",
    "يتطلب اشتراك Claude Pro أو Max، وهو غير مشمول في سعر الاستشارة.",
    "يمكن تأجيل موعد الجلسة إذا تم التواصل قبل 24 ساعة منه.",
    "الموقع ملكك بالكامل بعد انتهاء الجلسات.",
  ],
  faqs: [
    {
      id: "price",
      question: "كم السعر وشو يشمل؟",
      answer: "[السعر الخاص بأول 5 عملاء]. يشمل 3 جلسات فردية، أسبوع دعم عبر واتساب بعد آخر جلسة، ودليل Claude Code الكامل.",
    },
    { id: "subscription", question: "هل اشتراك Claude مشمول بالسعر؟", answer: "لا. اشتراك Claude Pro أو Max مطلوب بشكل منفصل وغير مشمول بسعر الاستشارة." },
    { id: "duration", question: "كم تستغرق مدة بناء الموقع؟", answer: "3 جلسات فردية، بالإضافة لأسبوع دعم عبر واتساب بعد آخر جلسة." },
    { id: "sessions", question: "هل الجلسات فردية أم جماعية؟", answer: "فردية بالكامل، مبنية حول فكرتك ووتيرتك أنت." },
    { id: "experience", question: "هل أحتاج خبرة برمجية مسبقة؟", answer: "لا. البرنامج مصمم ليأخذك من الصفر، باستخدام Claude كأداة تساعدك في الفهم والبناء خطوة بخطوة." },
    { id: "idea", question: "هل يمكنني اختيار فكرة موقعي الخاصة؟", answer: "بالتأكيد — الهدف أن تخرج بموقع حقيقي يخصّك، لا مثالاً عامًا." },
    {
      id: "free-guide",
      question: "شو الفرق بين الجلسات والدليل المجاني؟",
      answer: "الدليل المجاني يعطيك الأساسيات لتبدأ بنفسك. الجلسات هي بناء موقعك الفعلي معي مباشرة، بخطة مخصصة لمشروعك ودعم أول بأول.",
    },
    { id: "reschedule", question: "شو يصير إذا احتجت أغيّر موعد؟", answer: "تقدر تأجل موعدك بدون مشكلة إذا تواصلت معي قبل 24 ساعة من موعد الجلسة." },
  ],
  register: {
    heading: "خطوتك التالية أقرب لك من هذا",
    subtitle: "سجّل بياناتك وسنتواصل معك خلال 24 ساعة لتحديد موعد الاستشارة.",
  },
  form: {
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    websiteIdea: "شو فكرة موقعك؟",
    websiteIdeaPlaceholder: "احكيلي عن فكرة موقعك باختصار",
    experienceLegend: "هل لديك خبرة سابقة في البرمجة؟",
    yes: "نعم",
    no: "لا",
    contactTime: "الوقت المناسب للتواصل معك",
    contactTimePlaceholder: "مثال: مساءً بعد السابعة",
    submit: "تأكيد التسجيل",
    sending: "جارٍ الإرسال...",
    privacy: "بياناتك ما رح تنشارك مع أي جهة.",
    successTitle: "تم استلام طلبك بنجاح",
    successBody: "سنتواصل معك خلال 24 ساعة لتحديد موعد الاستشارة.",
    errorRequired: "الرجاء تعبئة الاسم ورقم الهاتف والبريد الإلكتروني.",
    errorSendFailed: "تعذّر إرسال طلبك ({status}). حاول مرة أخرى.",
  },
};

const en: typeof ar = {
  meta: {
    title: "Book your consultation — Halaqa",
    description: "Learn to build your own website with Claude, step by step, with direct support from me.",
  },
  hero: {
    eyebrow: "AI website-building consultation",
    titleStart: "I'll build your own website with you using",
    titleAccent: "Claude",
    titleEnd: ", step by step",
    subtitle: "A direct consultation where I teach you how to turn your idea into a real website, even if you've never written a line of code.",
    seats: "Only 5 seats left in the first cohort",
    cta: "Book your seat",
  },
  video: { heading: "Watch the intro video", placeholder: "Intro video — added later" },
  features: [
    { title: "An intro session on your idea", body: "We start by understanding your website idea and your current level, so we can pick the best starting point." },
    { title: "A clear action plan", body: "Ordered steps to build your website, instead of bouncing between scattered resources." },
    { title: "Actually learn to use Claude", body: "You learn to use Claude as a real coding tool, not just in theory." },
    { title: "A real website you launch yourself", body: "You leave with an actual website you built with your own hands, not just ready-made examples." },
    { title: "One week of WhatsApp support", body: "After the last session, you get a full week to reach me on WhatsApp for anything that blocks you." },
    { title: "The complete Claude Code guide", body: "A comprehensive guide to everything you need to know about Claude Code, yours to keep after the sessions end." },
  ],
  pkg: {
    price: "[Price for the first 5 customers]",
    lines: [
      "3 one-on-one remote sessions — session length: [Session length]",
      "One week of WhatsApp support after the last session",
      "The complete Claude Code guide",
    ],
  },
  process: [
    { title: "Fill in the form", body: "Leave your details and website idea in the form below." },
    { title: "I contact you within 24 hours", body: "I review your idea and reach out to arrange the details." },
    { title: "Confirm the date and payment", body: "We agree on the first session's date and confirm your booking." },
    { title: "We start building your website", body: "We go through the three sessions and build your website step by step." },
  ],
  terms: [
    "Sessions are held fully remotely.",
    "I'll contact you within 24 hours of your request.",
    "No prior programming experience needed.",
    "The content and plan are built around your own website idea.",
    "A Claude Pro or Max subscription is required and is not included in the consultation price.",
    "A session can be rescheduled if you let me know at least 24 hours before it.",
    "The website is entirely yours once the sessions end.",
  ],
  faqs: [
    {
      id: "price",
      question: "How much does it cost and what's included?",
      answer:
        "[Price for the first 5 customers]. It includes 3 one-on-one sessions, one week of WhatsApp support after the last session, and the complete Claude Code guide.",
    },
    {
      id: "subscription",
      question: "Is a Claude subscription included in the price?",
      answer: "No. A Claude Pro or Max subscription is required separately and is not included in the consultation price.",
    },
    { id: "duration", question: "How long does it take to build the website?", answer: "3 one-on-one sessions, plus one week of WhatsApp support after the last session." },
    { id: "sessions", question: "Are the sessions one-on-one or in a group?", answer: "Fully one-on-one, built around your idea and your pace." },
    {
      id: "experience",
      question: "Do I need programming experience?",
      answer: "No. The program starts from zero, using Claude as a tool that helps you understand and build step by step.",
    },
    {
      id: "idea",
      question: "Can I choose my own website idea?",
      answer: "Absolutely — the goal is for you to leave with a real website that's yours, not a generic example.",
    },
    {
      id: "free-guide",
      question: "What's the difference between the sessions and the free guide?",
      answer:
        "The free guide gives you the basics to get started on your own. The sessions are about building your actual website with me directly, with a plan tailored to your project and support as you go.",
    },
    {
      id: "reschedule",
      question: "What if I need to change my appointment?",
      answer: "No problem — you can reschedule as long as you let me know at least 24 hours before the session.",
    },
  ],
  register: {
    heading: "Your next step is closer than you think",
    subtitle: "Leave your details and I'll contact you within 24 hours to set the consultation date.",
  },
  form: {
    fullName: "Full name",
    phone: "Phone number",
    email: "Email",
    websiteIdea: "What's your website idea?",
    websiteIdeaPlaceholder: "Tell me briefly about your website idea",
    experienceLegend: "Do you have prior programming experience?",
    yes: "Yes",
    no: "No",
    contactTime: "Best time to reach you",
    contactTimePlaceholder: "e.g. evenings after 7",
    submit: "Confirm booking",
    sending: "Sending...",
    privacy: "Your details won't be shared with anyone.",
    successTitle: "Your request was received",
    successBody: "I'll contact you within 24 hours to set the consultation date.",
    errorRequired: "Please fill in your name, phone number and email.",
    errorSendFailed: "Couldn't send your request ({status}). Please try again.",
  },
};

export type ConsultationContent = typeof ar;
export const consultationContent: Record<Locale, ConsultationContent> = { ar, en };
