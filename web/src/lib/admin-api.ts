import { auth } from "@clerk/nextjs/server";
import type { AdminPhaseDetail, AdminRoadmapDetail, AdminRoadmapSummary, TrackSummary } from "./types";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

async function getAdminToken(): Promise<string | null> {
  const { getToken } = await auth.protect();
  return getToken();
}

// Every admin page needs to tell "you're not an admin" apart from "that id doesn't exist" —
// the API is the single source of truth for the role check, this just carries its answer
// through in a shape callers can switch on instead of re-deriving it from a status code.
type AdminGetResult<T> = { status: "ok"; data: T } | { status: "not_found" } | { status: "forbidden" };

async function adminGet<T>(path: string): Promise<AdminGetResult<T>> {
  const token = await getAdminToken();
  const response = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) {
    return { status: "forbidden" };
  }

  if (response.status === 404) {
    return { status: "not_found" };
  }

  if (!response.ok) {
    throw new Error(`Admin API GET ${path} failed: ${response.status}`);
  }

  return { status: "ok", data: (await response.json()) as T };
}

export function listRoadmaps() {
  return adminGet<AdminRoadmapSummary[]>("/api/admin/roadmaps");
}

export function getRoadmap(id: string) {
  return adminGet<AdminRoadmapDetail>(`/api/admin/roadmaps/${id}`);
}

export function getPhase(id: string) {
  return adminGet<AdminPhaseDetail>(`/api/admin/phases/${id}`);
}

export function listTracks() {
  return adminGet<TrackSummary[]>("/api/admin/tracks");
}

type AdminPostResult = { ok: true; id: string } | { ok: false; message: string };

export async function adminPost(path: string, body: unknown): Promise<AdminPostResult> {
  const token = await getAdminToken();
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });

  if (response.status === 401 || response.status === 403) {
    return { ok: false, message: "ليست لديك صلاحية القيام بهذا الإجراء." };
  }

  if (!response.ok) {
    let message = `فشل الطلب (${response.status}).`;
    try {
      const data = await response.json();
      if (typeof data?.message === "string") {
        message = data.message;
      }
    } catch {
      // no JSON body to read — keep the generic message
    }
    return { ok: false, message };
  }

  const data: { id: string } = await response.json();
  return { ok: true, id: data.id };
}
