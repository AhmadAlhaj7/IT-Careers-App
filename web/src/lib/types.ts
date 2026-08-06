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
  id: string;
  slug: string;
  title: LocalizedText;
  price: number;
  paddlePriceId: string | null;
  phases: PhaseSummary[];
};

export type RoadmapSummary = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText | null;
  price: number;
  paddlePriceId: string | null;
  imageUrl: string | null;
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

export type PublicQuizOption = {
  index: number;
  text: LocalizedText;
};

export type PublicQuizQuestion = {
  id: string;
  text: LocalizedText;
  options: PublicQuizOption[];
};

export type PhaseDetail = {
  orderIndex: number;
  title: LocalizedText;
  explanation: LocalizedText;
  pdfUrl: string | null;
  resources: Resource[];
  projects: Project[];
  quizQuestions: PublicQuizQuestion[];
};

export type QuizResult = {
  correctCount: number;
  totalCount: number;
  passed: boolean;
};

export type PublicFinalExamQuestion = {
  id: string;
  text: LocalizedText;
  options: PublicQuizOption[];
};

export type FinalExamResult = {
  correctCount: number;
  totalCount: number;
  passed: boolean;
  certificateCode: string | null;
};

export type Certificate = {
  learnerName: string;
  roadmapTitle: LocalizedText;
  issuedAt: string;
};

export type TrackListItem = {
  slug: string;
  name: LocalizedText;
};

export type TrackDetail = {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  roadmaps: RoadmapSummary[];
};

export type PublicCareerQuizOption = {
  index: number;
  text: LocalizedText;
};

export type PublicCareerQuizQuestion = {
  id: string;
  text: LocalizedText;
  options: PublicCareerQuizOption[];
};

export type TrackRecommendation = {
  slug: string;
  name: LocalizedText;
  score: number;
};

export type CareerQuizResult = {
  recommendations: TrackRecommendation[];
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
  description: LocalizedText | null;
  slug: string;
  price: number;
  status: RoadmapStatus;
  paddlePriceId: string | null;
  imageUrl: string | null;
  phases: AdminPhaseSummary[];
  finalExamQuestions: AdminFinalExamQuestion[];
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

export type AdminQuizOption = {
  text: LocalizedText;
  isCorrect: boolean;
};

export type AdminQuizQuestion = {
  id: string;
  text: LocalizedText;
  orderIndex: number;
  options: AdminQuizOption[];
};

export type AdminFinalExamQuestion = {
  id: string;
  text: LocalizedText;
  orderIndex: number;
  options: AdminQuizOption[];
};

export type AdminTrack = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  published: boolean;
};

export type AdminCareerQuizTrackWeight = {
  trackId: string;
  weight: number;
};

export type AdminCareerQuizOption = {
  text: LocalizedText;
  trackWeights: AdminCareerQuizTrackWeight[];
};

export type AdminCareerQuizQuestion = {
  id: string;
  text: LocalizedText;
  orderIndex: number;
  options: AdminCareerQuizOption[];
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
  quizQuestions: AdminQuizQuestion[];
};

export type RoadmapSales = {
  roadmapTitle: LocalizedText;
  enrollmentCount: number;
  estimatedRevenue: number;
};

export type PhaseCompletionRate = {
  roadmapTitle: LocalizedText;
  phaseOrderIndex: number;
  phaseTitle: LocalizedText;
  enrolledCount: number;
  completedCount: number;
  completionRate: number;
};

export type TrackConversion = {
  trackName: LocalizedText;
  recommendationCount: number;
  convertedCount: number;
  conversionRate: number;
};

export type AdminAnalytics = {
  totalLearners: number;
  totalEnrollments: number;
  estimatedRevenue: number;
  roadmapSales: RoadmapSales[];
  phaseCompletionRates: PhaseCompletionRate[];
  trackConversions: TrackConversion[];
};
