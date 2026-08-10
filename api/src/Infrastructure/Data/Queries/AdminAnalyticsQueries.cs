using ItCareers.Application.Analytics;
using Microsoft.EntityFrameworkCore;

namespace ItCareers.Infrastructure.Data.Queries;

public class AdminAnalyticsQueries : IAdminAnalyticsQueries
{
    private readonly ItCareersDbContext _context;

    public AdminAnalyticsQueries(ItCareersDbContext context)
    {
        _context = context;
    }

    // Everything below loads into memory and joins with LINQ-to-objects rather than SQL —
    // fine at this product's scale (one founder's catalog, not an enterprise dataset), and
    // much easier to read/verify than the equivalent set of grouped SQL joins.
    public async Task<AdminAnalyticsDto> GetAsync(CancellationToken cancellationToken = default)
    {
        var roadmaps = await _context.Roadmaps.Where(r => !r.IsDeleted).OrderBy(r => r.Slug).ToListAsync(cancellationToken);
        var phases = await _context.Phases
            .Include(p => p.Roadmap)
            .Where(p => !p.IsDeleted && p.Roadmap != null && !p.Roadmap.IsDeleted)
            .OrderBy(p => p.Roadmap!.Slug).ThenBy(p => p.OrderIndex)
            .ToListAsync(cancellationToken);
        var tracks = await _context.Tracks.Where(t => !t.IsDeleted).OrderBy(t => t.Slug).ToListAsync(cancellationToken);
        var enrollments = await _context.Enrollments.ToListAsync(cancellationToken);
        var completions = await _context.PhaseCompletions.ToListAsync(cancellationToken);
        var submissions = await _context.CareerQuizSubmissions.Where(s => s.UserId != null).ToListAsync(cancellationToken);

        var weekAgo = DateTimeOffset.UtcNow.AddDays(-7);
        var newEnrollmentsThisWeek = enrollments.Count(e => e.PurchasedAt >= weekAgo);
        var certificatesIssuedThisWeek = await _context.Certificates.CountAsync(c => c.IssuedAt >= weekAgo, cancellationToken);

        var enrollmentCountByRoadmap = enrollments.GroupBy(e => e.RoadmapId).ToDictionary(g => g.Key, g => g.Count());
        var enrolledUsersByRoadmap = enrollments
            .GroupBy(e => e.RoadmapId)
            .ToDictionary(g => g.Key, g => g.Select(e => e.UserId).ToHashSet());
        var completedUsersByPhase = completions
            .GroupBy(c => c.PhaseId)
            .ToDictionary(g => g.Key, g => g.Select(c => c.UserId).ToHashSet());
        var roadmapTrackById = roadmaps.ToDictionary(r => r.Id, r => r.TrackId);

        var roadmapSales = roadmaps
            .Select(r =>
            {
                var count = enrollmentCountByRoadmap.GetValueOrDefault(r.Id, 0);
                return new RoadmapSalesDto(r.Title, count, count * r.Price);
            })
            .ToList();

        var phaseCompletionRates = phases
            .Select(phase =>
            {
                var enrolledUsers = enrolledUsersByRoadmap.GetValueOrDefault(phase.RoadmapId, []);
                var completedUsers = completedUsersByPhase.GetValueOrDefault(phase.Id, []);
                var completedEnrolledCount = completedUsers.Count(enrolledUsers.Contains);
                var enrolledCount = enrolledUsers.Count;
                var rate = enrolledCount == 0 ? 0d : (double)completedEnrolledCount / enrolledCount;
                return new PhaseCompletionRateDto(phase.Roadmap!.Title, phase.OrderIndex, phase.Title, enrolledCount, completedEnrolledCount, rate);
            })
            .ToList();

        var trackConversions = tracks
            .Select(track =>
            {
                var recommendedUserIds = submissions
                    .Where(s => s.RecommendedTrackId == track.Id)
                    .Select(s => s.UserId!)
                    .Distinct()
                    .ToHashSet();

                var convertedCount = recommendedUserIds.Count(userId =>
                    enrollments.Any(e => e.UserId == userId && roadmapTrackById.GetValueOrDefault(e.RoadmapId) == track.Id));

                var recommendationCount = recommendedUserIds.Count;
                var rate = recommendationCount == 0 ? 0d : (double)convertedCount / recommendationCount;
                return new TrackConversionDto(track.Name, recommendationCount, convertedCount, rate);
            })
            .ToList();

        return new AdminAnalyticsDto(
            enrollments.Select(e => e.UserId).Distinct().Count(),
            enrollments.Count,
            roadmapSales.Sum(r => r.EstimatedRevenue),
            newEnrollmentsThisWeek,
            certificatesIssuedThisWeek,
            roadmapSales,
            phaseCompletionRates,
            trackConversions);
    }
}
