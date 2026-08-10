namespace ItCareers.Application.Analytics;

// Deliberately separate from AdminAnalyticsDto — that one carries sensitive per-roadmap
// revenue figures that must never be public. This is the small, safe subset shown on the
// home page's trust bar.
public record PublicStatsDto(
    int RoadmapCount,
    int LearnerCount,
    int CertificatesIssuedCount,
    double Phase1CompletionRate);
