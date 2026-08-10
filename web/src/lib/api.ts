import { auth } from "@clerk/nextjs/server";
import {
  Certificate,
  LocalizedText,
  PhaseDetail,
  PublicCareerQuizQuestion,
  PublicFinalExamQuestion,
  PublicStats,
  RoadmapDetail,
  RoadmapSummary,
  TrackDetail,
  TrackListItem,
} from "./types";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

// Aggregate, non-per-user counts — safe to ISR-cache like the rest of the public catalog data
// (unlike listRoadmaps/getRoadmap below, which carry per-visitor enrollment state).
export async function getPublicStats(): Promise<PublicStats> {
  const response = await fetch(`${API_URL}/api/stats`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to load stats: ${response.status}`);
  }

  return response.json();
}

// Both of these now carry per-visitor enrollment/progress (IsEnrolled, CompletedPhaseCount,
// per-phase Status), so — same cross-user cache-leak reasoning as getPhase/getFinalExam below
// — they can no longer use the shared time-based ISR cache.

export async function listRoadmaps(): Promise<RoadmapSummary[]> {
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(`${API_URL}/api/roadmaps`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load roadmaps: ${response.status}`);
  }

  return response.json();
}

export async function getRoadmap(slug: string): Promise<RoadmapDetail | null> {
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(`${API_URL}/api/roadmaps/${slug}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load roadmap "${slug}": ${response.status}`);
  }

  return response.json();
}

export type PhaseAccessResult =
  | { status: "granted"; phase: PhaseDetail }
  | { status: "locked"; title: LocalizedText }
  | { status: "not_found" };

export async function getPhase(slug: string, orderIndex: number): Promise<PhaseAccessResult> {
  const { getToken } = await auth();
  const token = await getToken();

  // no-store, not next:{revalidate}: the response now depends on WHO is asking (their
  // enrollment), not just the URL. A time-based cache here would be shared across every
  // visitor hitting this URL, so a paying user's cached "granted" response could leak full
  // phase content to the next anonymous or non-enrolled visitor within that window.
  const response = await fetch(`${API_URL}/api/roadmaps/${slug}/phases/${orderIndex}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });

  if (response.status === 404) {
    return { status: "not_found" };
  }

  if (response.status === 402) {
    const data: { title: LocalizedText } = await response.json();
    return { status: "locked", title: data.title };
  }

  if (!response.ok) {
    throw new Error(`Failed to load phase ${orderIndex} of "${slug}": ${response.status}`);
  }

  const phase: PhaseDetail = await response.json();
  return { status: "granted", phase };
}

export type FinalExamAccessResult =
  | { status: "granted"; questions: PublicFinalExamQuestion[] }
  | { status: "locked" }
  | { status: "not_found" };

export async function getFinalExam(slug: string): Promise<FinalExamAccessResult> {
  const { getToken } = await auth();
  const token = await getToken();

  // Same cross-user cache-leak reasoning as getPhase above — access depends on the caller's
  // enrollment, so this can never be a shared time-based cache.
  const response = await fetch(`${API_URL}/api/roadmaps/${slug}/final-exam`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });

  if (response.status === 404) {
    return { status: "not_found" };
  }

  if (response.status === 402) {
    return { status: "locked" };
  }

  if (!response.ok) {
    throw new Error(`Failed to load final exam for "${slug}": ${response.status}`);
  }

  const questions: PublicFinalExamQuestion[] = await response.json();
  return { status: "granted", questions };
}

// Unlike everything above, a certificate's content never depends on who's asking — anyone
// with the code can verify it, that's the point of a public verification page — so the
// ordinary time-based ISR cache is fine here.
export async function getCertificate(code: string): Promise<Certificate | null> {
  const response = await fetch(`${API_URL}/api/certificates/${code}`, {
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load certificate "${code}": ${response.status}`);
  }

  return response.json();
}

// Track content and career-quiz questions are never per-visitor — same reasoning as
// getCertificate above — so these use the ordinary time-based ISR cache too.

export async function listTracks(): Promise<TrackListItem[]> {
  const response = await fetch(`${API_URL}/api/tracks`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to load tracks: ${response.status}`);
  }

  return response.json();
}

export async function getTrack(slug: string): Promise<TrackDetail | null> {
  const response = await fetch(`${API_URL}/api/tracks/${slug}`, {
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load track "${slug}": ${response.status}`);
  }

  return response.json();
}

export async function listCareerQuizQuestions(): Promise<PublicCareerQuizQuestion[]> {
  const response = await fetch(`${API_URL}/api/quiz/questions`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to load career quiz questions: ${response.status}`);
  }

  return response.json();
}
