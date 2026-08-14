using ItCareers.Domain.Enums;

namespace ItCareers.Domain.Common;

// EF Core can't constructor-bind a record with owned-navigation parameters (Title/Body are
// LocalizedText, mapped via explicit OwnsOne) — each of these records needs a fallback
// parameterless constructor EF CAN call, then sets the owned properties via reflection.
public record SpecializationSectionItem(LocalizedText Title, LocalizedText Body)
{
    private SpecializationSectionItem()
        : this(null!, null!)
    {
    }
}

public record SpecializationSection(
    SpecializationSectionKey Key,
    bool Enabled,
    LocalizedText Title,
    LocalizedText Body,
    string? ImageUrl,
    LocalizedText? ImageCaption,
    IReadOnlyList<SpecializationSectionItem> Items)
{
    private SpecializationSection()
        : this(default, false, null!, null!, null, null, [])
    {
    }
}

public record SpecializationFaq(LocalizedText Question, LocalizedText Answer)
{
    private SpecializationFaq()
        : this(null!, null!)
    {
    }
}
