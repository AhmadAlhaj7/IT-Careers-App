import { auth } from "@clerk/nextjs/server";
import { LocalizedText, PhaseDetail, RoadmapDetail, RoadmapSummary } from "./types";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

export async function listRoadmaps(): Promise<RoadmapSummary[]> {
  const response = await fetch(`${API_URL}/api/roadmaps`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to load roadmaps: ${response.status}`);
  }

  return response.json();
}

export async function getRoadmap(slug: string): Promise<RoadmapDetail | null> {
  const response = await fetch(`${API_URL}/api/roadmaps/${slug}`, {
    next: { revalidate: 60 },
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
