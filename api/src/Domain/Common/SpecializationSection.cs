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
    // List<T>, not IReadOnlyList<T>: EF Core's JSON materializer needs a concrete, genuinely
    // add-able collection type for a *nested* owned collection (Items inside Sections inside
    // the root JSON document). With an interface-typed property here it silently backs the
    // navigation with a fixed-size array and then tries to .Add() into it while loading a
    // tracked entity, throwing "Collection was of a fixed size." the moment Items is non-empty
    // — this only ever showed up on a *second* tracked update of a specialization that already
    // had section items saved, since the first update's read still saw an empty array.
    List<SpecializationSectionItem> Items)
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
