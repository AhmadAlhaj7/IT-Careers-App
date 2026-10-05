import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { MediaPlaceholder } from "@/components/consultation/MediaPlaceholder";
import { ConsultationBookingForm } from "@/components/consultation/ConsultationBookingForm";

export const metadata: Metadata = {
  title: "احجز استشارتك — حلقة",
  description: "تعلّم بناء موقعك الخاص باستخدام Claude، خطوة بخطوة، بدعم مباشر منّي.",
};

const FEATURES = [
  { title: "جلسة تعارف على فكرتك", body: "نبدأ بفهم فكرة موقعك ومستواك الحالي، لنحدد أفضل نقطة انطلاق." },
  { title: "خطة عمل واضحة", body: "خطوات مرتبة لبناء موقعك، بدل التخبط بين مصادر متفرقة." },
  { title: "تعلّم استخدام Claude فعليًا", body: "تتعلّم كيف تستخدم Claude كأداة برمجة حقيقية، لا مجرد نظري." },
  { title: "موقع حقيقي تطلقه بنفسك", body: "تخرج بموقع فعلي تبنيه بيدك، لا مجرد أمثلة جاهزة." },
  { title: "أسبوع دعم عبر واتساب", body: "بعد آخر جلسة، عندك أسبوع كامل تتواصل معي فيه عبر واتساب لأي عائق يواجهك." },
  { title: "دليل Claude Code الكامل", body: "دليل شامل يشرح كل ما تحتاجه عن Claude Code، يبقى معك بعد انتهاء الجلسات." },
];

const PROCESS_STEPS = [
  { title: "تعبّي النموذج", body: "تسجّل بياناتك وفكرة موقعك في النموذج بالأسفل." },
  { title: "أتواصل معك خلال 24 ساعة", body: "أراجع فكرتك وأتواصل معك لتنسيق التفاصيل." },
  { title: "تأكيد الموعد والدفع", body: "نتفق على موعد الجلسة الأولى ونؤكد التسجيل." },
  { title: "نبدأ نبني موقعك", body: "ندخل الجلسات الثلاث ونبني موقعك خطوة بخطوة." },
];

const TERMS = [
  "الجلسات تُعقد عن بُعد بالكامل.",
  "التواصل معك خلال 24 ساعة من إرسال طلبك.",
  "لا حاجة لأي خبرة برمجية مسبقة.",
  "المحتوى والخطة تُبنى حول فكرة موقعك أنت تحديدًا.",
  "يتطلب اشتراك Claude Pro أو Max، وهو غير مشمول في سعر الاستشارة.",
  "يمكن تأجيل موعد الجلسة إذا تم التواصل قبل 24 ساعة منه.",
  "الموقع ملكك بالكامل بعد انتهاء الجلسات.",
];

const FAQS = [
  { id: "price", question: "كم السعر وشو يشمل؟", answer: "[السعر الخاص بأول 5 عملاء]. يشمل 3 جلسات فردية، أسبوع دعم عبر واتساب بعد آخر جلسة، ودليل Claude Code الكامل." },
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
];

export default function BookConsultationPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-3 py-10 sm:px-6 sm:py-16">
      {/* Hero */}
      <section className="text-center">
        <span className="inline-block rounded-tag border border-neutral-200 bg-white px-4 py-1.5 text-xs text-neutral-600 shadow-subtle">
          استشارة بناء المواقع بالذكاء الاصطناعي
        </span>
        <h1 className="mt-6 text-3xl leading-tight font-bold text-neutral-900 sm:text-4xl">
          أبني معك موقعك الخاص باستخدام <span className="text-accent">Claude</span>، خطوة بخطوة
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-[1.8] text-neutral-600">
          استشارة مباشرة معي أعلّمك فيها كيف تحوّل فكرتك إلى موقع حقيقي، حتى لو لم تكتب سطر كود من قبل.
        </p>
        <p className="mt-3 text-sm font-bold text-accent">متبقّي 5 مقاعد فقط من الدفعة الأولى</p>
        <a href="#register" className={buttonVariants({ variant: "accent", size: "lg", className: "mt-6" })}>
          احجز مقعدك
        </a>
      </section>

      {/* Intro video */}
      <section className="mt-16">
        <p className="mb-4 text-center text-sm font-semibold text-neutral-500">شاهد الفيديو التعريفي</p>
        <MediaPlaceholder label="الفيديو التعريفي — يُضاف لاحقًا" aspect="video" icon="video" />
      </section>

      {/* About me */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold text-neutral-900">مين أنا</h2>
        <Card padding="lg" shadow="panel" radius="card" className="mt-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-start">
            <MediaPlaceholder label="صورتك" aspect="square" icon="photo" className="h-24 w-24 shrink-0 rounded-full" />
            <div>
              <p className="font-bold text-neutral-900">أحمد الحاج</p>
              <p className="mt-2 text-sm leading-[1.9] text-neutral-600">
                مطوّر أنظمة أستخدم الذكاء الاصطناعي — وتحديدًا Claude — في شغلي الحقيقي يوميًا، مو بس أشرح إمكانياته نظريًا. أشارك رحلتي في تعلّم
                البرمجة والذكاء الاصطناعي مع أكثر من 11.6 ألف متابع على إنستغرام.
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-neutral-100 pt-6">
            <p className="text-sm font-semibold text-neutral-700">من أعمالي: موقع صالة رياضية بنيته بالكامل بنفس الأدوات اللي رح أعلّمك تستخدمها</p>
            <div className="mt-4">
              <MediaPlaceholder label="لقطة من موقع الصالة الرياضية — تُضاف لاحقًا" aspect="video" icon="photo" />
            </div>
          </div>
        </Card>
      </section>

      {/* Features grid */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold text-neutral-900">شو بتحصل عليه</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <Card key={feature.title} padding="md" shadow="subtle" radius="panel">
              <Badge variant="accent" size="sm">
                {index + 1}
              </Badge>
              <p className="mt-2 font-bold text-neutral-900">{feature.title}</p>
              <p className="mt-1 text-sm leading-[1.8] text-neutral-600">{feature.body}</p>
            </Card>
          ))}
        </div>

        {/* Package & price */}
        <Card padding="lg" shadow="panel" radius="card" className="mx-auto mt-6 max-w-xl text-center">
          <p className="text-sm font-semibold text-neutral-500">الباقة والسعر</p>
          <p className="mt-2 text-2xl font-bold text-accent">[السعر الخاص بأول 5 عملاء]</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-700">
            <p>3 جلسات فردية عن بُعد — مدة كل جلسة: [مدة الجلسة]</p>
            <p>أسبوع دعم عبر واتساب بعد آخر جلسة</p>
            <p>دليل Claude Code الكامل</p>
          </div>
        </Card>
      </section>

      {/* How it works */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold text-neutral-900">كيف تمشي العملية</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROCESS_STEPS.map((step, index) => (
            <Card key={step.title} padding="md" shadow="subtle" radius="panel">
              <Badge variant="primary" size="sm">
                {index + 1}
              </Badge>
              <p className="mt-2 font-bold text-neutral-900">{step.title}</p>
              <p className="mt-1 text-sm leading-[1.8] text-neutral-600">{step.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Terms */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold text-neutral-900">الشروط</h2>
        <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3">
          {TERMS.map((term) => (
            <div key={term} className="flex items-start gap-3 rounded-panel border border-neutral-100 bg-white px-4 py-3 shadow-subtle">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                ✓
              </span>
              <span className="text-sm text-neutral-700">{term}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold text-neutral-900">أسئلة متكررة</h2>
        <Accordion items={FAQS} defaultOpenId="price" className="mx-auto mt-6 max-w-xl" />
      </section>

      {/* Registration form */}
      <section id="register" className="mt-20 scroll-mt-24">
        <h2 className="text-center text-2xl font-bold text-neutral-900">خطوتك التالية أقرب لك من هذا</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-neutral-500">
          سجّل بياناتك وسنتواصل معك خلال 24 ساعة لتحديد موعد الاستشارة.
        </p>
        <Card padding="lg" shadow="panel" radius="card" className="mx-auto mt-8 max-w-lg">
          <ConsultationBookingForm />
        </Card>
      </section>
    </div>
  );
}
