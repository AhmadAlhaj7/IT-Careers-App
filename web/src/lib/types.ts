// Mirrors the API's DTOs (api/src/Application/Roadmaps/) — keep these two in sync by hand
// for now; there's no shared schema between the two projects yet.

export type LocalizedText = {
  ar: string;
  en: string;
};

export type PhaseSummary = {
  orderIndex: number;
  title: LocalizedText;
};

export type RoadmapDetail = {
  slug: string;
  title: LocalizedText;
  price: number;
  phases: PhaseSummary[];
};

export type ResourceType = "Video" | "Article" | "Documentation" | "Course";
export type ResourceAccessType = "Free" | "Paid";
export type RoadmapStatus = "Draft" | "Published";
export type PhaseType = "Standard" | "FindAJob";

export type Resource = {
  title: LocalizedText;
  url: string;
  resourceType: ResourceType;
  accessType: ResourceAccessType;
};

export type Project = {
  title: LocalizedText;
  description: LocalizedText;
  isCapstone: boolean;
};

export type PhaseDetail = {
  orderIndex: number;
  title: LocalizedText;
  explanation: LocalizedText;
  pdfUrl: string | null;
  resources: Resource[];
  projects: Project[];
};

// Admin-side shapes mirror the public ones but include ids (needed to link between admin
// pages) and unpublished content (the public API only ever returns Published roadmaps).

export type TrackSummary = {
  id: string;
  name: LocalizedText;
};

export type AdminRoadmapSummary = {
  id: string;
  slug: string;
  title: LocalizedText;
  status: RoadmapStatus;
};

export type AdminPhaseSummary = {
  id: string;
  orderIndex: number;
  title: LocalizedText;
};

export type AdminRoadmapDetail = {
  id: string;
  trackId: string;
  title: LocalizedText;
  slug: string;
  price: number;
  status: RoadmapStatus;
  phases: AdminPhaseSummary[];
};

export type AdminResource = {
  id: string;
  title: LocalizedText;
  url: string;
  resourceType: ResourceType;
  accessType: ResourceAccessType;
};

export type AdminProject = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  isCapstone: boolean;
};

export type AdminPhaseDetail = {
  id: string;
  roadmapId: string;
  title: LocalizedText;
  orderIndex: number;
  explanation: LocalizedText;
  pdfUrl: string | null;
  phaseType: PhaseType;
  resources: AdminResource[];
  projects: AdminProject[];
};
