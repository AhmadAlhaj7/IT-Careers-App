// Mirrors the API's DTOs (api/src/Application/Roadmaps/) — keep these two in sync by hand
// for now; there's no shared schema between the two projects yet.

export type LocalizedText = {
  ar: string;
  en: string;
};

export type PhaseProgressStatus = "Locked" | "Current" | "Completed";

export type PhaseSummary = {
  orderIndex: number;
  title: LocalizedText;
  tag: LocalizedText | null;
  summary: LocalizedText;
  skills: string[];
  resourceCount: number;
  projectCount: number;
  hasQuiz: boolean;
  status: PhaseProgressStatus;
};

export type RoadmapDetail = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText | null;
  price: number;
  originalPrice: number | null;
  paddlePriceId: string | null;
  imageUrl: string | null;
  level: LocalizedText | null;
  outcomes: LocalizedText[];
  phases: PhaseSummary[];
  totalResourceCount: number;
  totalProjectCount: number;
  finalExamQuestionCount: number;
  isEnrolled: boolean;
  completedPhaseCount: number;
};

export type RoadmapSummary = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText | null;
  price: number;
  originalPrice: number | null;
  paddlePriceId: string | null;
  imageUrl: string | null;
  level: LocalizedText | null;
  phaseCount: number;
  isEnrolled: boolean;
  completedPhaseCount: number;
  isMostPopular: boolean;
};

export type PublicStats = {
  roadmapCount: number;
  learnerCount: number;
  certificatesIssuedCount: number;
  phase1CompletionRate: number;
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
  price: number;
  phaseCount: number;
  updatedAt: string;
};

export type AdminPhaseSummary = {
  id: string;
  orderIndex: number;
  title: LocalizedText;
  resourceCount: number;
  projectCount: number;
  quizQuestionCount: number;
};

export type AdminRoadmapDetail = {
  id: string;
  trackId: string;
  title: LocalizedText;
  description: LocalizedText | null;
  slug: string;
  price: number;
  originalPrice: number | null;
  status: RoadmapStatus;
  paddlePriceId: string | null;
  imageUrl: string | null;
  level: LocalizedText | null;
  outcomes: LocalizedText[];
  passThresholdPercent: number;
  sequentialUnlockEnabled: boolean;
  updatedAt: string;
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
  tag: LocalizedText | null;
  skills: string | null;
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
  newEnrollmentsThisWeek: number;
  certificatesIssuedThisWeek: number;
  roadmapSales: RoadmapSales[];
  phaseCompletionRates: PhaseCompletionRate[];
  trackConversions: TrackConversion[];
};

export type SpecializationCategory = "Development" | "Data" | "Security" | "Infrastructure";
export type SpecializationDemandLevel = "High" | "Good" | "Stable";
export type SpecializationStatus = "Draft" | "Published";

export type SpecializationSectionKey =
  | "WhatTheyDo"
  | "TypicalDay"
  | "MarketDemand"
  | "SalaryAndCareer"
  | "ProsAndCons"
  | "FitCheck"
  | "SkillsAndTools"
  | "CommonMyths"
  | "Conclusion";

export type SpecializationSectionItem = {
  title: LocalizedText;
  body: LocalizedText;
};

export type SpecializationSection = {
  key: SpecializationSectionKey;
  enabled: boolean;
  title: LocalizedText;
  body: LocalizedText;
  imageUrl: string | null;
  imageCaption: LocalizedText | null;
  items: SpecializationSectionItem[];
};

export type SpecializationFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type AdminSpecializationSummary = {
  id: string;
  slug: string;
  name: LocalizedText;
  status: SpecializationStatus;
  category: SpecializationCategory;
  enabledSectionCount: number;
  linkedRoadmapTitleAr: string | null;
  updatedAt: string;
};

export type AdminSpecializationDetail = {
  id: string;
  name: LocalizedText;
  cardSentence: LocalizedText;
  summary: LocalizedText;
  slug: string;
  category: SpecializationCategory;
  demandLevel: SpecializationDemandLevel;
  coverImageUrl: string | null;
  status: SpecializationStatus;
  demandQuickFact: LocalizedText | null;
  salaryQuickFact: LocalizedText | null;
  timeToJobQuickFact: LocalizedText | null;
  difficultyQuickFact: LocalizedText | null;
  sections: SpecializationSection[];
  introVideoUrl: string | null;
  introVideoCaption: LocalizedText | null;
  introVideoDurationLabel: string | null;
  pdfUrl: string | null;
  pdfFileName: string | null;
  faqs: SpecializationFaq[];
  linkedRoadmapId: string | null;
  roadmapButtonText: LocalizedText | null;
  updatedAt: string;
};
