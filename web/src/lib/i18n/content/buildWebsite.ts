import type { Locale } from "../locale";

const ar = {
  meta: {
    title: "أبني لك موقعك — حلقة",
    description: "تعطيني فكرتك ومحتواك، وأبني لك موقعًا كاملًا جاهزًا للنشر بالذكاء الاصطناعي.",
  },
  hero: {
    eyebrow: "خدمة بناء المواقع",
    titleStart: "أبني لك موقعك",
    titleAccent: "بالكامل",
    titleEnd: "، جاهز للنشر",
    subtitle: "تعطيني فكرتك ومحتواك، وأبني لك موقعًا حقيقيًا بالذكاء الاصطناعي — وتستلمه ملكك بالكامل.",
    cta: "اطلب موقعك",
  },
  features: [
    { title: "جلسة فهم لمشروعك", body: "نحدد الهدف والصفحات والمحتوى قبل ما أبدأ، عشان نبني الشي الصح من أول مرة." },
    { title: "موقع مبني على فكرتك", body: "أبني موقعك كامل حسب فكرتك أنت، مو نسخة جاهزة مكررة." },
    { title: "يشتغل على الجوال والكمبيوتر", body: "الموقع يظهر بشكل سليم على كل الشاشات." },
    { title: "مراجعة وتعديلات", body: "تراجع الموقع معي وأعدّل عليه قبل التسليم النهائي." },
    { title: "مساعدة بالنشر والتسليم", body: "أساعدك تنشر الموقع على رابطك الخاص وأسلّمك كل شي جاهز." },
    { title: "ملكية كاملة", body: "الموقع وكل ملفاته ملكك بالكامل بعد التسليم." },
  ],
  pkg: {
    price: "[سعر الباقة]",
    lines: ["مدة التسليم: [مدة التسليم]", "جولات التعديل: [عدد جولات التعديل]", "الدومين والاستضافة: [مشمولان / غير مشمولين]"],
  },
  process: [
    { title: "تعبّي النموذج", body: "تحكيلي عن موقعك وفكرته في النموذج بالأسفل." },
    { title: "أتواصل معك خلال 24 ساعة", body: "أراجع طلبك وأتواصل معك لنحدد التفاصيل." },
    { title: "نتفق على النطاق والسعر", body: "نحدد الصفحات والمزايا ونؤكد الطلب والدفع." },
    { title: "أبني موقعك وأسلّمه", body: "أبنيه، تراجعه معي، ثم أسلّمك النسخة النهائية." },
  ],
  terms: [
    "التواصل معك خلال 24 ساعة من إرسال طلبك.",
    "نحدد صفحات الموقع ومزاياه بالاتفاق قبل البدء، وأي إضافة خارج الاتفاق تُناقش وتُسعَّر بشكل منفصل.",
    "تزوّدني بالمحتوى (النصوص والشعار والصور) في الوقت المتفق عليه، وتأخّره يؤخّر موعد التسليم.",
    "الدومين والاستضافة: [حدّد: مشمولان في السعر / على العميل].",
    "الموقع ملكك بالكامل بعد التسليم.",
    "لا حاجة لأي خبرة تقنية من جهتك.",
  ],
  faqs: [
    {
      id: "price",
      question: "كم السعر وشو يشمل؟",
      answer: "[سعر الباقة]. يشمل جلسة فهم المشروع، بناء الموقع، جولات التعديل المتفق عليها، والمساعدة في النشر والتسليم.",
    },
    { id: "duration", question: "كم تستغرق مدة التسليم؟", answer: "[مدة التسليم] من تأكيد الطلب واستلام المحتوى." },
    { id: "content", question: "هل لازم يكون عندي محتوى جاهز؟", answer: "يفيدك لو عندك نصوص وشعار وصور. وإذا ما عندك، نناقش الخيارات في أول تواصل." },
    { id: "revisions", question: "هل أقدر أطلب تعديلات؟", answer: "أكيد — جولات التعديل المتفق عليها مشمولة، وأي شي خارجها نتفق عليه بشكل منفصل." },
    { id: "vs-consultation", question: "شو الفرق بينها وبين الاستشارة؟", answer: "في الاستشارة أعلّمك تبني موقعك بنفسك خطوة بخطوة. هنا أنا اللي أبنيه لك وتستلمه جاهز." },
    { id: "ownership", question: "هل الموقع يكون ملكي؟", answer: "نعم، الموقع وملفاته ملكك بالكامل بعد التسليم." },
  ],
  order: {
    heading: "جاهز تبدأ موقعك؟",
    subtitle: "عبّي بياناتك وسنتواصل معك خلال 24 ساعة لمناقشة تفاصيل موقعك.",
  },
  form: {
    fullName: "الاسم الكامل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    projectName: "اسم مشروعك أو نشاطك",
    websiteType: "نوع الموقع",
    // Deliberately no "online store" — a much bigger build than this package covers, so it falls
    // under "other" and gets scoped in conversation instead of being promised here.
    types: {
      business: "موقع شركة أو نشاط تجاري",
      personal: "موقع شخصي أو معرض أعمال",
      landing: "صفحة هبوط لمنتج أو خدمة",
      other: "شيء آخر",
    },
    description: "شو تبي موقعك يسوي؟",
    descriptionPlaceholder: "احكيلي عن فكرة الموقع، لمن هو، وشو أهم الأشياء اللي تبيها فيه",
    contactTime: "الوقت المناسب للتواصل معك",
    contactTimePlaceholder: "مثال: مساءً بعد السابعة",
    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال...",
    privacy: "بياناتك ما رح تنشارك مع أي جهة.",
    successTitle: "تم استلام طلبك بنجاح",
    successBody: "سنتواصل معك خلال 24 ساعة لمناقشة تفاصيل موقعك.",
    errorRequired: "الرجاء تعبئة الاسم ورقم الهاتف والبريد الإلكتروني واسم المشروع ووصف الموقع.",
    errorSendFailed: "تعذّر إرسال طلبك ({status}). حاول مرة أخرى.",
  },
};

const en: typeof ar = {
  meta: {
    title: "I'll build your website — Halaqa",
    description: "Give me your idea and content, and I'll build you a complete website, ready to publish, with AI.",
  },
  hero: {
    eyebrow: "Website building service",
    titleStart: "I build your website",
    titleAccent: "end to end",
    titleEnd: ", ready to publish",
    subtitle: "You give me your idea and content, and I build you a real website with AI — and you receive it fully yours.",
    cta: "Order your website",
  },
  features: [
    { title: "A session to understand your project", body: "We define the goal, pages and content before I start, so we build the right thing the first time." },
    { title: "A website built around your idea", body: "I build your whole website around your idea, not a generic copy-paste." },
    { title: "Works on mobile and desktop", body: "The website displays properly on every screen." },
    { title: "Review and revisions", body: "You review the website with me and I make changes before the final delivery." },
    { title: "Help with publishing and delivery", body: "I help you publish the website on your own link and hand everything over, ready to go." },
    { title: "Full ownership", body: "The website and all its files are entirely yours after delivery." },
  ],
  pkg: {
    price: "[Package price]",
    lines: ["Delivery time: [Delivery time]", "Revision rounds: [Number of revision rounds]", "Domain and hosting: [Included / not included]"],
  },
  process: [
    { title: "Fill in the form", body: "Tell me about your website and its idea in the form below." },
    { title: "I contact you within 24 hours", body: "I review your request and reach out to nail down the details." },
    { title: "We agree on scope and price", body: "We define the pages and features, then confirm the order and payment." },
    { title: "I build and deliver your website", body: "I build it, you review it with me, then I hand you the final version." },
  ],
  terms: [
    "I'll contact you within 24 hours of your request.",
    "We agree on the website's pages and features before starting, and anything beyond the agreement is discussed and priced separately.",
    "You provide the content (text, logo, images) by the agreed time; late content delays delivery.",
    "Domain and hosting: [Specify: included in the price / paid by the client].",
    "The website is entirely yours after delivery.",
    "No technical experience needed on your side.",
  ],
  faqs: [
    {
      id: "price",
      question: "How much does it cost and what's included?",
      answer:
        "[Package price]. It includes a project-understanding session, building the website, the agreed revision rounds, and help with publishing and delivery.",
    },
    { id: "duration", question: "How long does delivery take?", answer: "[Delivery time] from confirming the order and receiving your content." },
    {
      id: "content",
      question: "Do I need to have my content ready?",
      answer: "It helps if you have text, a logo and images. If you don't, we'll discuss the options when we first talk.",
    },
    {
      id: "revisions",
      question: "Can I ask for changes?",
      answer: "Of course — the agreed revision rounds are included, and anything beyond them we agree on separately.",
    },
    {
      id: "vs-consultation",
      question: "How is this different from the consultation?",
      answer: "In the consultation I teach you to build your website yourself, step by step. Here, I build it and you receive it ready.",
    },
    { id: "ownership", question: "Will the website be mine?", answer: "Yes, the website and its files are entirely yours after delivery." },
  ],
  order: {
    heading: "Ready to start your website?",
    subtitle: "Fill in your details and I'll contact you within 24 hours to discuss your website.",
  },
  form: {
    fullName: "Full name",
    phone: "Phone number",
    email: "Email",
    projectName: "Your project or business name",
    websiteType: "Website type",
    types: {
      business: "Business or company website",
      personal: "Personal website or portfolio",
      landing: "Landing page for a product or service",
      other: "Something else",
    },
    description: "What should your website do?",
    descriptionPlaceholder: "Tell me about the idea, who it's for, and the most important things you want in it",
    contactTime: "Best time to reach you",
    contactTimePlaceholder: "e.g. evenings after 7",
    submit: "Send request",
    sending: "Sending...",
    privacy: "Your details won't be shared with anyone.",
    successTitle: "Your request was received",
    successBody: "I'll contact you within 24 hours to discuss your website.",
    errorRequired: "Please fill in your name, phone number, email, project name and website description.",
    errorSendFailed: "Couldn't send your request ({status}). Please try again.",
  },
};

export type BuildWebsiteContent = typeof ar;
export const buildWebsiteContent: Record<Locale, BuildWebsiteContent> = { ar, en };
