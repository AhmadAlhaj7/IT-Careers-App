using ItCareers.Domain.Common;

namespace ItCareers.Application.Tracks;

public record AdminTrackDto(Guid Id, string Slug, LocalizedText Name, LocalizedText Description, bool Published);
