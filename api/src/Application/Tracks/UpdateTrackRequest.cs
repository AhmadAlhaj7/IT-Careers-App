using ItCareers.Domain.Common;

namespace ItCareers.Application.Tracks;

public record UpdateTrackRequest(string Slug, LocalizedText Name, LocalizedText Description, bool Published);
