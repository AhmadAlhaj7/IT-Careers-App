import type { SpecializationSectionKey } from "./types";

// Fixed narrative order for every specialization page — shared between the admin editor
// (titles/hints/placeholders/badges) and admin/actions.ts's form-field parsing, so the
// 9-section, up-to-6-items-each field set only has to be described once.
export type SpecializationSectionDef = {
  key: SpecializationSectionKey;
  defaultTitle: string;
  hint: string;
  writeHint: string;
  placeholder: string;
  hasList: boolean;
  hasImage: boolean;
  required: boolean;
};

export const MAX_SECTION_ITEMS = 6;
export const MAX_FAQS = 6;

export const SPECIALIZATION_SECTION_DEFS: SpecializationSectionDef[] = [
  {
    key: "WhatTheyDo",
    defaultTitle: "ماذا يعمل في هذا التخصص",
    hint: "المهام اليومية بلغة بسيطة",
    writeHint: "مثال ملموس أفضل من تعريف نظري",
    placeholder: "تخيّل شركة توصيل تريد…",
    hasList: true,
    hasImage: false,
    required: true,
  },
  {
    key: "TypicalDay",
    defaultTitle: "يوم عمل عادي",
    hint: "جدول زمني من الصباح للمساء",
    writeHint: "اكتب الواقع لا الإعلان",
    placeholder: "كيف يمرّ اليوم فعلاً…",
    hasList: true,
    hasImage: false,
    required: false,
  },
  {
    key: "MarketDemand",
    defaultTitle: "الطلب في سوق العمل",
    hint: "أرقام + رسم بياني للنمو",
    writeHint: "اذكر المصدر والسنة",
    placeholder: "الطلب في نمو مستمر منذ…",
    hasList: true,
    hasImage: true,
    required: false,
  },
  {
    key: "SalaryAndCareer",
    defaultTitle: "الرواتب والمسار الوظيفي",
    hint: "نطاق لكل مستوى خبرة",
    writeHint: "أرقام تقريبية مع تنبيه",
    placeholder: "أرقام تقريبية للسوق السعودي…",
    hasList: true,
    hasImage: true,
    required: false,
  },
  {
    key: "ProsAndCons",
    defaultTitle: "المزايا والتحديات",
    hint: "عمودان: لماذا يستحق / ما يجب معرفته",
    writeHint: "كن صادقاً في التحديات",
    placeholder: "اذكر ميزة وتحدياً مقابلاً…",
    hasList: true,
    hasImage: false,
    required: false,
  },
  {
    key: "FitCheck",
    defaultTitle: "هل يناسبك هذا التخصص",
    hint: "قائمتان: يناسبك / فكّر مرتين",
    writeHint: "عبارات قصيرة يجيب عنها بنعم أو لا",
    placeholder: "كلما وافقت على عبارات أكثر…",
    hasList: true,
    hasImage: false,
    required: false,
  },
  {
    key: "SkillsAndTools",
    defaultTitle: "المهارات والأدوات",
    hint: "ثلاث مجموعات من الوسوم",
    writeHint: "طمئنه أنه لا يحتاجها كلها الآن",
    placeholder: "لا تحتاجها كلها من اليوم الأول…",
    hasList: true,
    hasImage: false,
    required: false,
  },
  {
    key: "CommonMyths",
    defaultTitle: "خرافات شائعة",
    hint: "يُقال ← الحقيقة",
    writeHint: "اختر ما يسمعه الناس فعلاً",
    placeholder: "",
    hasList: true,
    hasImage: false,
    required: false,
  },
  {
    key: "Conclusion",
    defaultTitle: "الخلاصة",
    hint: "فقرة أخيرة تحسم قراره",
    writeHint: "لا تبِع — لخّص بصدق",
    placeholder: "تخصص يكافئ الصبر أكثر من الذكاء السريع…",
    hasList: false,
    hasImage: false,
    required: true,
  },
];
