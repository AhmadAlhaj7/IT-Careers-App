"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { adminDelete, adminPost, adminPut, getPhase, getRoadmap, getSpecialization } from "@/lib/admin-api";
import { MAX_FAQS, MAX_SECTION_ITEMS, SPECIALIZATION_SECTION_DEFS } from "@/lib/specializationSections";

export type ActionState = { message?: string; values?: Record<string, string> };

// Snapshot every non-file field so a failed save can hand the submitted values back to the
// client — see restoreFormValues for why this matters (React wipes uncontrolled fields back to
// their original defaultValue after any action completes, success or not).
function snapshotFormValues(formData: FormData): Record<string, string> {
  const snapshot: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      snapshot[key] = value;
    }
  }
  return snapshot;
}

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

// Same "fixed slots" shape as parseQuizOptions — matches OutcomesFieldset's MAX_OUTCOMES.
function parseOutcomes(formData: FormData) {
  const outcomes: { ar: string; en: string }[] = [];

  for (let i = 0; i < 6; i++) {
    const ar = String(formData.get(`outcome${i}Ar`) ?? "").trim();
    const en = String(formData.get(`outcome${i}En`) ?? "").trim();
    if (ar.length === 0 && en.length === 0) {
      continue;
    }
    outcomes.push({ ar, en });
  }

  return outcomes;
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
  const tagAr = String(formData.get("tagAr") ?? "").trim();
  const tagEn = String(formData.get("tagEn") ?? "").trim();
  const skillsRaw = String(formData.get("skills") ?? "").trim();

  const result = await adminPost("/api/admin/phases", {
    roadmapId,
    title: { ar: titleAr, en: titleEn },
    orderIndex,
    explanation: { ar: explanationAr, en: explanationEn },
    pdfUrl: pdfUrl.length > 0 ? pdfUrl : null,
    phaseType,
    tag: tagAr.length > 0 || tagEn.length > 0 ? { ar: tagAr, en: tagEn } : null,
    skills: skillsRaw.length > 0 ? skillsRaw : null,
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
  const descriptionAr = String(formData.get("descriptionAr") ?? "").trim();
  const descriptionEn = String(formData.get("descriptionEn") ?? "").trim();
  const slug = String(formData.get("slug") ?? "");
  const price = Number(formData.get("price"));
  const originalPriceRaw = String(formData.get("originalPrice") ?? "").trim();
  const status = String(formData.get("status") ?? "Draft");
  const paddlePriceIdRaw = String(formData.get("paddlePriceId") ?? "").trim();
  const levelAr = String(formData.get("levelAr") ?? "").trim();
  const levelEn = String(formData.get("levelEn") ?? "").trim();
  const passThresholdPercent = Number(formData.get("passThresholdPercent") ?? 70);
  const sequentialUnlockEnabled = formData.get("sequentialUnlockEnabled") === "on";
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
    } catch (error) {
      // Surfaced directly rather than a generic message — this is an internal admin tool,
      // and the underlying @vercel/blob error (e.g. missing BLOB_READ_WRITE_TOKEN) is exactly
      // what's needed to fix the setup without digging through server logs.
      console.error("Roadmap image upload failed:", error);
      const detail = error instanceof Error ? error.message : String(error);
      return { message: `تعذّر رفع الصورة: ${detail}`, values: snapshotFormValues(formData) };
    }
  }

  const description = descriptionAr.length > 0 || descriptionEn.length > 0 ? { ar: descriptionAr, en: descriptionEn } : null;
  const level = levelAr.length > 0 || levelEn.length > 0 ? { ar: levelAr, en: levelEn } : null;
  const originalPrice = originalPriceRaw.length > 0 ? Number(originalPriceRaw) : null;

  const result = await adminPut(`/api/admin/roadmaps/${id}`, {
    title: { ar: titleAr, en: titleEn },
    description,
    slug,
    price,
    originalPrice,
    status,
    paddlePriceId: paddlePriceIdRaw.length > 0 ? paddlePriceIdRaw : null,
    imageUrl,
    level,
    outcomes: parseOutcomes(formData),
    passThresholdPercent,
    sequentialUnlockEnabled,
  });

  if (!result.ok) {
    return { message: result.message, values: snapshotFormValues(formData) };
  }

  revalidatePath("/");
  revalidatePath("/roadmaps");
  revalidatePath(`/roadmaps/${slug}`);

  redirect(`/admin/roadmaps/${id}`);
}

// A quick "disable/enable" toggle for the list page — reuses the exact same Published/Draft
// status the editor's header buttons already set (a Draft roadmap already disappears from
// the public catalog/detail pages while staying fully visible and editable in admin, with no
// cascading changes — no new status was needed for this). Since UpdateRoadmapRequest is a
// full replace, this re-submits every existing field with only Status flipped, same pattern
// as reorderPhaseAction below.
export async function toggleRoadmapStatusAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");

  const result = await getRoadmap(id);
  if (result.status !== "ok") {
    redirect("/admin");
  }

  const roadmap = result.data;
  const nextStatus = roadmap.status === "Published" ? "Draft" : "Published";

  await adminPut(`/api/admin/roadmaps/${id}`, {
    title: roadmap.title,
    description: roadmap.description,
    slug: roadmap.slug,
    price: roadmap.price,
    originalPrice: roadmap.originalPrice,
    status: nextStatus,
    paddlePriceId: roadmap.paddlePriceId,
    imageUrl: roadmap.imageUrl,
    level: roadmap.level,
    outcomes: roadmap.outcomes,
    passThresholdPercent: roadmap.passThresholdPercent,
    sequentialUnlockEnabled: roadmap.sequentialUnlockEnabled,
  });

  revalidatePath("/");
  revalidatePath("/roadmaps");
  revalidatePath(`/roadmaps/${roadmap.slug}`);
  revalidatePath("/admin");
  redirect("/admin");
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
  const tagAr = String(formData.get("tagAr") ?? "").trim();
  const tagEn = String(formData.get("tagEn") ?? "").trim();
  const skillsRaw = String(formData.get("skills") ?? "").trim();

  const result = await adminPut(`/api/admin/phases/${id}`, {
    title: { ar: titleAr, en: titleEn },
    orderIndex,
    explanation: { ar: explanationAr, en: explanationEn },
    pdfUrl: pdfUrl.length > 0 ? pdfUrl : null,
    phaseType,
    tag: tagAr.length > 0 || tagEn.length > 0 ? { ar: tagAr, en: tagEn } : null,
    skills: skillsRaw.length > 0 ? skillsRaw : null,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${roadmapId}/phases/${id}`);
}

// Not wired through useActionState (each phase row's up/down button is a plain <form
// action={...}>) — there's no per-field validation to surface, just a redirect back to the
// same editor once the swap lands. Swaps OrderIndex between the phase and its neighbor via
// two ordinary UpdatePhaseRequest calls — no bulk-reorder endpoint exists (or is needed) for
// a swap this small.
export async function reorderPhaseAction(formData: FormData): Promise<void> {
  const roadmapId = String(formData.get("roadmapId") ?? "");
  const phaseId = String(formData.get("phaseId") ?? "");
  const direction = String(formData.get("direction") ?? "");

  const roadmapResult = await getRoadmap(roadmapId);
  if (roadmapResult.status !== "ok") {
    redirect(`/admin/roadmaps/${roadmapId}`);
  }

  const orderedPhases = [...roadmapResult.data.phases].sort((a, b) => a.orderIndex - b.orderIndex);
  const currentIndex = orderedPhases.findIndex((p) => p.id === phaseId);
  const neighborIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (currentIndex === -1 || neighborIndex < 0 || neighborIndex >= orderedPhases.length) {
    redirect(`/admin/roadmaps/${roadmapId}`);
  }

  const current = orderedPhases[currentIndex];
  const neighbor = orderedPhases[neighborIndex];

  const [currentDetail, neighborDetail] = await Promise.all([getPhase(current.id), getPhase(neighbor.id)]);

  if (currentDetail.status === "ok" && neighborDetail.status === "ok") {
    await Promise.all([
      adminPut(`/api/admin/phases/${current.id}`, {
        title: currentDetail.data.title,
        orderIndex: neighborDetail.data.orderIndex,
        explanation: currentDetail.data.explanation,
        pdfUrl: currentDetail.data.pdfUrl,
        phaseType: currentDetail.data.phaseType,
        tag: currentDetail.data.tag,
        skills: currentDetail.data.skills,
      }),
      adminPut(`/api/admin/phases/${neighbor.id}`, {
        title: neighborDetail.data.title,
        orderIndex: currentDetail.data.orderIndex,
        explanation: neighborDetail.data.explanation,
        pdfUrl: neighborDetail.data.pdfUrl,
        phaseType: neighborDetail.data.phaseType,
        tag: neighborDetail.data.tag,
        skills: neighborDetail.data.skills,
      }),
    ]);
  }

  revalidatePath(`/admin/roadmaps/${roadmapId}`);
  redirect(`/admin/roadmaps/${roadmapId}`);
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

export async function createSpecializationAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const nameAr = String(formData.get("nameAr") ?? "");
  const nameEn = String(formData.get("nameEn") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const category = String(formData.get("category") ?? "Development");
  const demandLevel = String(formData.get("demandLevel") ?? "Good");
  const status = String(formData.get("status") ?? "Draft");

  const result = await adminPost("/api/admin/specializations", {
    name: { ar: nameAr, en: nameEn },
    slug,
    category,
    demandLevel,
    status,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/specializations/${result.id}`);
}

// Loops SPECIALIZATION_SECTION_DEFS (the same fixed metadata the editor UI renders from) to
// pull each of the 9 sections' fixed-name fields out of the form, uploading a per-section
// image for the 2 sections that support one — same shape as parseOutcomes, just async
// because of the uploads.
async function parseSpecializationSections(id: string, formData: FormData) {
  const sections: {
    key: string;
    enabled: boolean;
    title: { ar: string; en: string };
    body: { ar: string; en: string };
    imageUrl: string | null;
    imageCaption: { ar: string; en: string } | null;
    items: { title: { ar: string; en: string }; body: { ar: string; en: string } }[];
  }[] = [];

  for (const def of SPECIALIZATION_SECTION_DEFS) {
    const prefix = `section_${def.key}_`;
    const enabled = formData.get(`${prefix}enabled`) === "on";
    const titleAr = String(formData.get(`${prefix}titleAr`) ?? "").trim();
    const titleEn = String(formData.get(`${prefix}titleEn`) ?? "").trim();
    const bodyAr = String(formData.get(`${prefix}bodyAr`) ?? "").trim();
    const bodyEn = String(formData.get(`${prefix}bodyEn`) ?? "").trim();

    let imageUrl: string | null = null;
    let imageCaption: { ar: string; en: string } | null = null;

    if (def.hasImage) {
      const currentImageUrl = String(formData.get(`${prefix}currentImageUrl`) ?? "").trim();
      const removeImage = formData.get(`${prefix}removeImage`) === "on";
      const imageFile = formData.get(`${prefix}imageFile`);
      imageUrl = currentImageUrl.length > 0 ? currentImageUrl : null;

      if (removeImage) {
        imageUrl = null;
      } else if (imageFile instanceof File && imageFile.size > 0) {
        const blob = await put(`specializations/${id}-${def.key}-${imageFile.name}`, imageFile, {
          access: "public",
          addRandomSuffix: true,
        });
        imageUrl = blob.url;
      }

      const captionAr = String(formData.get(`${prefix}imageCaptionAr`) ?? "").trim();
      const captionEn = String(formData.get(`${prefix}imageCaptionEn`) ?? "").trim();
      imageCaption = captionAr.length > 0 || captionEn.length > 0 ? { ar: captionAr, en: captionEn } : null;
    }

    const items: { title: { ar: string; en: string }; body: { ar: string; en: string } }[] = [];
    if (def.hasList) {
      for (let i = 0; i < MAX_SECTION_ITEMS; i++) {
        const itemTitleAr = String(formData.get(`${prefix}item${i}TitleAr`) ?? "").trim();
        const itemTitleEn = String(formData.get(`${prefix}item${i}TitleEn`) ?? "").trim();
        const itemBodyAr = String(formData.get(`${prefix}item${i}BodyAr`) ?? "").trim();
        const itemBodyEn = String(formData.get(`${prefix}item${i}BodyEn`) ?? "").trim();
        if (itemTitleAr.length === 0 && itemTitleEn.length === 0 && itemBodyAr.length === 0 && itemBodyEn.length === 0) {
          continue;
        }
        items.push({ title: { ar: itemTitleAr, en: itemTitleEn }, body: { ar: itemBodyAr, en: itemBodyEn } });
      }
    }

    sections.push({ key: def.key, enabled, title: { ar: titleAr, en: titleEn }, body: { ar: bodyAr, en: bodyEn }, imageUrl, imageCaption, items });
  }

  return sections;
}

// Same fixed-slot idiom as parseQuizOptions — up to MAX_FAQS rows, empty ones skipped.
function parseSpecializationFaqs(formData: FormData) {
  const faqs: { question: { ar: string; en: string }; answer: { ar: string; en: string } }[] = [];

  for (let i = 0; i < MAX_FAQS; i++) {
    const qAr = String(formData.get(`faq${i}QAr`) ?? "").trim();
    const qEn = String(formData.get(`faq${i}QEn`) ?? "").trim();
    const aAr = String(formData.get(`faq${i}AAr`) ?? "").trim();
    const aEn = String(formData.get(`faq${i}AEn`) ?? "").trim();
    if (qAr.length === 0 && qEn.length === 0 && aAr.length === 0 && aEn.length === 0) {
      continue;
    }
    faqs.push({ question: { ar: qAr, en: qEn }, answer: { ar: aAr, en: aEn } });
  }

  return faqs;
}

export async function updateSpecializationAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const nameAr = String(formData.get("nameAr") ?? "");
  const nameEn = String(formData.get("nameEn") ?? "");
  const cardSentenceAr = String(formData.get("cardSentenceAr") ?? "");
  const cardSentenceEn = String(formData.get("cardSentenceEn") ?? "");
  const summaryAr = String(formData.get("summaryAr") ?? "");
  const summaryEn = String(formData.get("summaryEn") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const category = String(formData.get("category") ?? "Development");
  const demandLevel = String(formData.get("demandLevel") ?? "Good");
  const status = String(formData.get("status") ?? "Draft");

  const demandFactAr = String(formData.get("demandFactAr") ?? "").trim();
  const demandFactEn = String(formData.get("demandFactEn") ?? "").trim();
  const salaryFactAr = String(formData.get("salaryFactAr") ?? "").trim();
  const salaryFactEn = String(formData.get("salaryFactEn") ?? "").trim();
  const timeToJobFactAr = String(formData.get("timeToJobFactAr") ?? "").trim();
  const timeToJobFactEn = String(formData.get("timeToJobFactEn") ?? "").trim();
  const difficultyFactAr = String(formData.get("difficultyFactAr") ?? "").trim();
  const difficultyFactEn = String(formData.get("difficultyFactEn") ?? "").trim();

  const introVideoUrl = String(formData.get("introVideoUrl") ?? "").trim();
  const introVideoCaptionAr = String(formData.get("introVideoCaptionAr") ?? "").trim();
  const introVideoCaptionEn = String(formData.get("introVideoCaptionEn") ?? "").trim();
  const introVideoDurationLabel = String(formData.get("introVideoDurationLabel") ?? "").trim();

  const linkedRoadmapIdRaw = String(formData.get("linkedRoadmapId") ?? "").trim();
  const roadmapButtonTextAr = String(formData.get("roadmapButtonTextAr") ?? "").trim();
  const roadmapButtonTextEn = String(formData.get("roadmapButtonTextEn") ?? "").trim();

  const currentImageUrl = String(formData.get("currentImageUrl") ?? "").trim();
  const removeImage = formData.get("removeImage") === "on";
  const imageFile = formData.get("imageFile");

  const currentPdfUrl = String(formData.get("currentPdfUrl") ?? "").trim();
  const currentPdfFileName = String(formData.get("currentPdfFileName") ?? "").trim();
  const removePdf = formData.get("removePdf") === "on";
  const pdfFile = formData.get("pdfFile");

  let coverImageUrl: string | null = currentImageUrl.length > 0 ? currentImageUrl : null;
  let pdfUrl: string | null = currentPdfUrl.length > 0 ? currentPdfUrl : null;
  let pdfFileName: string | null = currentPdfFileName.length > 0 ? currentPdfFileName : null;
  let sections: Awaited<ReturnType<typeof parseSpecializationSections>>;

  try {
    if (removeImage) {
      coverImageUrl = null;
    } else if (imageFile instanceof File && imageFile.size > 0) {
      const blob = await put(`specializations/${id}-cover-${imageFile.name}`, imageFile, { access: "public", addRandomSuffix: true });
      coverImageUrl = blob.url;
    }

    if (removePdf) {
      pdfUrl = null;
      pdfFileName = null;
    } else if (pdfFile instanceof File && pdfFile.size > 0) {
      const blob = await put(`specializations/${id}-pdf-${pdfFile.name}`, pdfFile, { access: "public", addRandomSuffix: true });
      pdfUrl = blob.url;
      pdfFileName = pdfFile.name;
    }

    sections = await parseSpecializationSections(id, formData);
  } catch (error) {
    // Same rationale as updateRoadmapAction: an internal admin tool, so the raw
    // @vercel/blob error is more useful here than a generic message.
    console.error("Specialization file upload failed:", error);
    const detail = error instanceof Error ? error.message : String(error);
    return { message: `تعذّر رفع الملف: ${detail}`, values: snapshotFormValues(formData) };
  }

  const demandQuickFact = demandFactAr.length > 0 || demandFactEn.length > 0 ? { ar: demandFactAr, en: demandFactEn } : null;
  const salaryQuickFact = salaryFactAr.length > 0 || salaryFactEn.length > 0 ? { ar: salaryFactAr, en: salaryFactEn } : null;
  const timeToJobQuickFact =
    timeToJobFactAr.length > 0 || timeToJobFactEn.length > 0 ? { ar: timeToJobFactAr, en: timeToJobFactEn } : null;
  const difficultyQuickFact =
    difficultyFactAr.length > 0 || difficultyFactEn.length > 0 ? { ar: difficultyFactAr, en: difficultyFactEn } : null;
  const introVideoCaption =
    introVideoCaptionAr.length > 0 || introVideoCaptionEn.length > 0 ? { ar: introVideoCaptionAr, en: introVideoCaptionEn } : null;
  const roadmapButtonText =
    roadmapButtonTextAr.length > 0 || roadmapButtonTextEn.length > 0 ? { ar: roadmapButtonTextAr, en: roadmapButtonTextEn } : null;

  const result = await adminPut(`/api/admin/specializations/${id}`, {
    name: { ar: nameAr, en: nameEn },
    cardSentence: { ar: cardSentenceAr, en: cardSentenceEn },
    summary: { ar: summaryAr, en: summaryEn },
    slug,
    category,
    demandLevel,
    coverImageUrl,
    status,
    demandQuickFact,
    salaryQuickFact,
    timeToJobQuickFact,
    difficultyQuickFact,
    sections,
    introVideoUrl: introVideoUrl.length > 0 ? introVideoUrl : null,
    introVideoCaption,
    introVideoDurationLabel: introVideoDurationLabel.length > 0 ? introVideoDurationLabel : null,
    pdfUrl,
    pdfFileName,
    faqs: parseSpecializationFaqs(formData),
    linkedRoadmapId: linkedRoadmapIdRaw.length > 0 ? linkedRoadmapIdRaw : null,
    roadmapButtonText,
  });

  if (!result.ok) {
    return { message: result.message, values: snapshotFormValues(formData) };
  }

  revalidatePath("/admin/specializations");
  redirect(`/admin/specializations/${id}`);
}

// Same "disable/enable" idea as toggleRoadmapStatusAction — Draft already hides a
// specialization from anywhere it'll eventually be read publicly while keeping it fully
// editable in admin, so no separate status was needed. UpdateSpecializationRequest is a full
// replace, so this re-submits every existing field with only Status flipped.
export async function toggleSpecializationStatusAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");

  const result = await getSpecialization(id);
  if (result.status !== "ok") {
    redirect("/admin/specializations");
  }

  const specialization = result.data;
  const nextStatus = specialization.status === "Published" ? "Draft" : "Published";

  await adminPut(`/api/admin/specializations/${id}`, {
    name: specialization.name,
    cardSentence: specialization.cardSentence,
    summary: specialization.summary,
    slug: specialization.slug,
    category: specialization.category,
    demandLevel: specialization.demandLevel,
    coverImageUrl: specialization.coverImageUrl,
    status: nextStatus,
    demandQuickFact: specialization.demandQuickFact,
    salaryQuickFact: specialization.salaryQuickFact,
    timeToJobQuickFact: specialization.timeToJobQuickFact,
    difficultyQuickFact: specialization.difficultyQuickFact,
    sections: specialization.sections,
    introVideoUrl: specialization.introVideoUrl,
    introVideoCaption: specialization.introVideoCaption,
    introVideoDurationLabel: specialization.introVideoDurationLabel,
    pdfUrl: specialization.pdfUrl,
    pdfFileName: specialization.pdfFileName,
    faqs: specialization.faqs,
    linkedRoadmapId: specialization.linkedRoadmapId,
    roadmapButtonText: specialization.roadmapButtonText,
  });

  revalidatePath("/admin/specializations");
  redirect("/admin/specializations");
}

export async function deleteSpecializationAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");

  const result = await adminDelete(`/api/admin/specializations/${id}`);

  if (!result.ok) {
    return { message: result.message };
  }

  revalidatePath("/admin/specializations");
  redirect("/admin/specializations");
}
