import type { Locale } from "../locale";

const ar = {
  meta: {
    title: "الملفات التعليمية — حلقة",
    description: "ملفات ومراجع تعليمية: اعرضها مباشرة في المتصفح، وحمّل ما هو متاح للتحميل.",
  },
  library: {
    title: "الملفات التعليمية",
    subtitle: "اختر ملفًا لعرضه. بعض الملفات متاحة للتحميل، وبعضها للعرض فقط.",
    all: "الكل",
    empty: "لا توجد ملفات بعد. عُد قريبًا.",
    emptyCategory: "لا توجد ملفات في هذا التصنيف.",
  },
  chips: { downloadable: "تحميل متاح", viewOnly: "عرض فقط" },
  viewer: {
    back: "كل الملفات",
    download: "تحميل الملف",
    viewOnlyNotice: "هذا الملف للعرض فقط ولا يمكن تحميله.",
    noPreview: "لا يمكن عرض هذا النوع من الملفات في المتصفح. يمكنك تحميله وفتحه على جهازك.",
    previewTitle: "معاينة الملف",
  },
};

const en: typeof ar = {
  meta: {
    title: "Learning files — Halaqa",
    description: "Learning files and references: view them right in your browser, and download the ones that allow it.",
  },
  library: {
    title: "Learning files",
    subtitle: "Pick a file to view it. Some files can be downloaded, others are view-only.",
    all: "All",
    empty: "No files yet. Check back soon.",
    emptyCategory: "No files in this category.",
  },
  chips: { downloadable: "Download available", viewOnly: "View only" },
  viewer: {
    back: "All files",
    download: "Download file",
    viewOnlyNotice: "This file is view-only and can't be downloaded.",
    noPreview: "This file type can't be previewed in the browser. You can download it and open it on your device.",
    previewTitle: "File preview",
  },
};

export const filesContent: Record<Locale, typeof ar> = { ar, en };
