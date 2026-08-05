using ItCareers.Domain.Common;

namespace ItCareers.Application.Tracks;

public record CreateTrackRequest(string Slug, LocalizedText Name, LocalizedText Description, bool Published);
