import { PhaseDetail, RoadmapDetail } from "./types";

const API_URL = process.env.API_URL ?? "http://localhost:5212";

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

export async function getPhase(slug: string, orderIndex: number): Promise<PhaseDetail | null> {
  const response = await fetch(`${API_URL}/api/roadmaps/${slug}/phases/${orderIndex}`, {
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load phase ${orderIndex} of "${slug}": ${response.status}`);
  }

  return response.json();
}
