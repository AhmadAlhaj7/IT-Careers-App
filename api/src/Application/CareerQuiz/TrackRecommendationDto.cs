using ItCareers.Domain.Common;

namespace ItCareers.Application.CareerQuiz;

public record TrackRecommendationDto(string Slug, LocalizedText Name, int Score);
