"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { adminDelete, adminPost, adminPut, getRoadmap } from "@/lib/admin-api";

export type ActionState = { message?: string };

// The quiz question form always renders 4 option slots (only the first 2 required) rather
// than a dynamic add/remove list — covers every real multiple-choice question without needing
// client-side array state for what's still a "minimal" admin CMS.
function parseQuizOptions(formData: FormData) {
  const correctOptionIndex = Number(formData.get("correctOptionIndex"));
  const options: { text: { ar: string; en: string }; isCorrect: boolean }[] = [];

  for (let i = 0; i < 4; i++) {
    const ar = String(formData.get(`option${i}Ar`) ?? "").trim();
    const en = String(formData.get(`option${i}En`) ?? "").trim();
    if (ar.length === 0 && en.length === 0) {
      continue;
    }
    options.push({ text: { ar, en }, isCorrect: i === correctOptionIndex });
  }

  return options;
}

export async function createRoadmapAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const trackId = String(formData.get("trackId") ?? "");
  const titleAr = String(formData.get("titleAr") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const price = Number(formData.get("price"));
  const status = String(formData.get("status") ?? "Draft");

  const result = await adminPost("/api/admin/roadmaps", {
    trackId,
    title: { ar: titleAr, en: titleEn },
    slug,
    price,
    status,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  // The public home page and roadmap page cache their fetches for 60s (ISR) — without this,
  // a roadmap you just published wouldn't show up there until that window naturally expires.
  revalidatePath("/");
  revalidatePath("/roadmaps");
  revalidatePath(`/roadmaps/${slug}`);

  redirect(`/admin/roadmaps/${result.id}`);
}

export async function createPhaseAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const titleAr = String(formData.get("titleAr") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const orderIndex = Number(formData.get("orderIndex"));
  const explanationAr = String(formData.get("explanationAr") ?? "");
  const explanationEn = String(formData.get("explanationEn") ?? "");
  const pdfUrl = String(formData.get("pdfUrl") ?? "").trim();
  const phaseType = String(formData.get("phaseType") ?? "Standard");

  const result = await adminPost("/api/admin/phases", {
    roadmapId,
    title: { ar: titleAr, en: titleEn },
    orderIndex,
    explanation: { ar: explanationAr, en: explanationEn },
    pdfUrl: pdfUrl.length > 0 ? pdfUrl : null,
    phaseType,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${result.id}`);
}

export async function createResourceAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const phaseId = String(formData.get("phaseId") ?? "");
  const titleAr = String(formData.get("titleAr") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const url = String(formData.get("url") ?? "");
  const resourceType = String(formData.get("resourceType") ?? "Article");
  const accessType = String(formData.get("accessType") ?? "Free");

  const result = await adminPost("/api/admin/resources", {
    phaseId,
    title: { ar: titleAr, en: titleEn },
    url,
    resourceType,
    accessType,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${phaseId}`);
}

export async function createProjectAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const phaseId = String(formData.get("phaseId") ?? "");
  const titleAr = String(formData.get("titleAr") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const descriptionAr = String(formData.get("descriptionAr") ?? "");
  const descriptionEn = String(formData.get("descriptionEn") ?? "");
  const isCapstone = formData.get("isCapstone") === "on";

  const result = await adminPost("/api/admin/projects", {
    phaseId,
    title: { ar: titleAr, en: titleEn },
    description: { ar: descriptionAr, en: descriptionEn },
    isCapstone,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${phaseId}`);
}

export async function updateRoadmapAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const titleAr = String(formData.get("titleAr") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const price = Number(formData.get("price"));
  const status = String(formData.get("status") ?? "Draft");
  const paddlePriceIdRaw = String(formData.get("paddlePriceId") ?? "").trim();
  const currentImageUrl = String(formData.get("currentImageUrl") ?? "").trim();
  const removeImage = formData.get("removeImage") === "on";
  const imageFile = formData.get("imageFile");

  let imageUrl: string | null = currentImageUrl.length > 0 ? currentImageUrl : null;

  if (removeImage) {
    imageUrl = null;
  } else if (imageFile instanceof File && imageFile.size > 0) {
    try {
      const blob = await put(`roadmaps/${id}-${imageFile.name}`, imageFile, {
        access: "public",
        addRandomSuffix: true,
      });
      imageUrl = blob.url;
    } catch {
      return { message: "تعذّر رفع الصورة. تأكد من إعداد التخزين (Vercel Blob) على المشروع." };
    }
  }

  const result = await adminPut(`/api/admin/roadmaps/${id}`, {
    title: { ar: titleAr, en: titleEn },
    slug,
    price,
    status,
    paddlePriceId: paddlePriceIdRaw.length > 0 ? paddlePriceIdRaw : null,
    imageUrl,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  revalidatePath("/");
  revalidatePath("/roadmaps");
  revalidatePath(`/roadmaps/${slug}`);

  redirect(`/admin/roadmaps/${id}`);
}

export async function deleteRoadmapAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");

  // Fetched before deleting: once soft-deleted, the admin GET would 404 and we'd lose the
  // slug needed to invalidate that roadmap's now-stale public page.
  const existing = await getRoadmap(id);

  const result = await adminDelete(`/api/admin/roadmaps/${id}`);

  if (!result.ok) {
    return { message: result.message };
  }

  revalidatePath("/");
  revalidatePath("/roadmaps");
  if (existing.status === "ok") {
    revalidatePath(`/roadmaps/${existing.data.slug}`);
  }

  redirect("/admin");
}

export async function updatePhaseAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const titleAr = String(formData.get("titleAr") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const orderIndex = Number(formData.get("orderIndex"));
  const explanationAr = String(formData.get("explanationAr") ?? "");
  const explanationEn = String(formData.get("explanationEn") ?? "");
  const pdfUrl = String(formData.get("pdfUrl") ?? "").trim();
  const phaseType = String(formData.get("phaseType") ?? "Standard");

  const result = await adminPut(`/api/admin/phases/${id}`, {
    title: { ar: titleAr, en: titleEn },
    orderIndex,
    explanation: { ar: explanationAr, en: explanationEn },
    pdfUrl: pdfUrl.length > 0 ? pdfUrl : null,
    phaseType,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${id}`);
}

export async function deletePhaseAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const roadmapId = String(formData.get("roadmapId") ?? "");

  const result = await adminDelete(`/api/admin/phases/${id}`);

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}`);
}

export async function updateResourceAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const phaseId = String(formData.get("phaseId") ?? "");
  const titleAr = String(formData.get("titleAr") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const url = String(formData.get("url") ?? "");
  const resourceType = String(formData.get("resourceType") ?? "Article");
  const accessType = String(formData.get("accessType") ?? "Free");

  const result = await adminPut(`/api/admin/resources/${id}`, {
    title: { ar: titleAr, en: titleEn },
    url,
    resourceType,
    accessType,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${phaseId}`);
}

export async function deleteResourceAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const phaseId = String(formData.get("phaseId") ?? "");

  const result = await adminDelete(`/api/admin/resources/${id}`);

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${phaseId}`);
}

export async function updateProjectAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const phaseId = String(formData.get("phaseId") ?? "");
  const titleAr = String(formData.get("titleAr") ?? "");
  const titleEn = String(formData.get("titleEn") ?? "");
  const descriptionAr = String(formData.get("descriptionAr") ?? "");
  const descriptionEn = String(formData.get("descriptionEn") ?? "");
  const isCapstone = formData.get("isCapstone") === "on";

  const result = await adminPut(`/api/admin/projects/${id}`, {
    title: { ar: titleAr, en: titleEn },
    description: { ar: descriptionAr, en: descriptionEn },
    isCapstone,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${phaseId}`);
}

export async function deleteProjectAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const phaseId = String(formData.get("phaseId") ?? "");

  const result = await adminDelete(`/api/admin/projects/${id}`);

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${phaseId}`);
}

export async function createQuizQuestionAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const phaseId = String(formData.get("phaseId") ?? "");
  const textAr = String(formData.get("textAr") ?? "");
  const textEn = String(formData.get("textEn") ?? "");
  const orderIndex = Number(formData.get("orderIndex"));

  const result = await adminPost("/api/admin/quiz-questions", {
    phaseId,
    text: { ar: textAr, en: textEn },
    orderIndex,
    options: parseQuizOptions(formData),
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${phaseId}`);
}

export async function updateQuizQuestionAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const phaseId = String(formData.get("phaseId") ?? "");
  const textAr = String(formData.get("textAr") ?? "");
  const textEn = String(formData.get("textEn") ?? "");
  const orderIndex = Number(formData.get("orderIndex"));

  const result = await adminPut(`/api/admin/quiz-questions/${id}`, {
    text: { ar: textAr, en: textEn },
    orderIndex,
    options: parseQuizOptions(formData),
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${phaseId}`);
}

export async function deleteQuizQuestionAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const phaseId = String(formData.get("phaseId") ?? "");

  const result = await adminDelete(`/api/admin/quiz-questions/${id}`);

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${phaseId}`);
}

export async function createFinalExamQuestionAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const textAr = String(formData.get("textAr") ?? "");
  const textEn = String(formData.get("textEn") ?? "");
  const orderIndex = Number(formData.get("orderIndex"));

  const result = await adminPost("/api/admin/final-exam-questions", {
    roadmapId,
    text: { ar: textAr, en: textEn },
    orderIndex,
    options: parseQuizOptions(formData),
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}`);
}

export async function updateFinalExamQuestionAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const textAr = String(formData.get("textAr") ?? "");
  const textEn = String(formData.get("textEn") ?? "");
  const orderIndex = Number(formData.get("orderIndex"));

  const result = await adminPut(`/api/admin/final-exam-questions/${id}`, {
    text: { ar: textAr, en: textEn },
    orderIndex,
    options: parseQuizOptions(formData),
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}`);
}

export async function deleteFinalExamQuestionAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const roadmapId = String(formData.get("roadmapId") ?? "");

  const result = await adminDelete(`/api/admin/final-exam-questions/${id}`);

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}`);
}

export async function createTrackAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const slug = String(formData.get("slug") ?? "");
  const nameAr = String(formData.get("nameAr") ?? "");
  const nameEn = String(formData.get("nameEn") ?? "");
  const descriptionAr = String(formData.get("descriptionAr") ?? "");
  const descriptionEn = String(formData.get("descriptionEn") ?? "");
  const published = formData.get("published") === "on";

  const result = await adminPost("/api/admin/tracks", {
    slug,
    name: { ar: nameAr, en: nameEn },
    description: { ar: descriptionAr, en: descriptionEn },
    published,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect("/admin/tracks");
}

export async function updateTrackAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const nameAr = String(formData.get("nameAr") ?? "");
  const nameEn = String(formData.get("nameEn") ?? "");
  const descriptionAr = String(formData.get("descriptionAr") ?? "");
  const descriptionEn = String(formData.get("descriptionEn") ?? "");
  const published = formData.get("published") === "on";

  const result = await adminPut(`/api/admin/tracks/${id}`, {
    slug,
    name: { ar: nameAr, en: nameEn },
    description: { ar: descriptionAr, en: descriptionEn },
    published,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect("/admin/tracks");
}

export async function deleteTrackAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");

  const result = await adminDelete(`/api/admin/tracks/${id}`);

  if (!result.ok) {
    return { message: result.message };
  }

  redirect("/admin/tracks");
}

// Same "always 4 slots" shape as parseQuizOptions, but each option also carries a weight
// toward every track — field names come out as `option{i}Track_{trackId}` from the fieldset,
// so we scan every FormData key for that prefix rather than needing the track list here too.
function parseCareerQuizOptions(formData: FormData) {
  const options: { text: { ar: string; en: string }; trackWeights: { trackId: string; weight: number }[] }[] = [];

  for (let i = 0; i < 4; i++) {
    const ar = String(formData.get(`option${i}Ar`) ?? "").trim();
    const en = String(formData.get(`option${i}En`) ?? "").trim();
    if (ar.length === 0 && en.length === 0) {
      continue;
    }

    const prefix = `option${i}Track_`;
    const trackWeights: { trackId: string; weight: number }[] = [];
    for (const [key, value] of formData.entries()) {
      if (!key.startsWith(prefix)) {
        continue;
      }
      const weight = Number(value);
      if (weight !== 0) {
        trackWeights.push({ trackId: key.slice(prefix.length), weight });
      }
    }

    options.push({ text: { ar, en }, trackWeights });
  }

  return options;
}

export async function createCareerQuizQuestionAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const textAr = String(formData.get("textAr") ?? "");
  const textEn = String(formData.get("textEn") ?? "");
  const orderIndex = Number(formData.get("orderIndex"));

  const result = await adminPost("/api/admin/career-quiz-questions", {
    text: { ar: textAr, en: textEn },
    orderIndex,
    options: parseCareerQuizOptions(formData),
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect("/admin/career-quiz-questions");
}

export async function updateCareerQuizQuestionAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const textAr = String(formData.get("textAr") ?? "");
  const textEn = String(formData.get("textEn") ?? "");
  const orderIndex = Number(formData.get("orderIndex"));

  const result = await adminPut(`/api/admin/career-quiz-questions/${id}`, {
    text: { ar: textAr, en: textEn },
    orderIndex,
    options: parseCareerQuizOptions(formData),
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect("/admin/career-quiz-questions");
}

export async function deleteCareerQuizQuestionAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");

  const result = await adminDelete(`/api/admin/career-quiz-questions/${id}`);

  if (!result.ok) {
    return { message: result.message };
  }

  redirect("/admin/career-quiz-questions");
}
