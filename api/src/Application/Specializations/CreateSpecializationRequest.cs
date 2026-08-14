using ItCareers.Domain.Common;
using ItCareers.Domain.Enums;

namespace ItCareers.Application.Specializations;

public record CreateSpecializationRequest(
    LocalizedText Name,
    string Slug,
    SpecializationCategory Category,
    SpecializationDemandLevel DemandLevel,
    SpecializationStatus Status);
