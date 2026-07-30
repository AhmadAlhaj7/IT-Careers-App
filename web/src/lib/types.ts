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
