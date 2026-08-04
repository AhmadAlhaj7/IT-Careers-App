"use server";

import { redirect } from "next/navigation";
import { adminDelete, adminPost, adminPut } from "@/lib/admin-api";

export type ActionState = { message?: string };

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

  const result = await adminPut(`/api/admin/roadmaps/${id}`, {
    title: { ar: titleAr, en: titleEn },
    slug,
    price,
    status,
  });

  if (!result.ok) {
    return { message: result.message };
  }

  redirect(`/admin/roadmaps/${id}`);
}

export async function deleteRoadmapAction(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");

  const result = await adminDelete(`/api/admin/roadmaps/${id}`);

  if (!result.ok) {
    return { message: result.message };
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
