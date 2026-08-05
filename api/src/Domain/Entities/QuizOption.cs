using ItCareers.Domain.Common;

namespace ItCareers.Domain.Entities;

// A plain value object, not an Entity of its own — options only ever exist as part of their
// question's owned JSON column, replaced whole on every edit, never queried independently.
public record QuizOption(LocalizedText Text, bool IsCorrect)
{
    // Same reason Entity subclasses need one: Text is itself an owned/JSON-mapped type, and EF
    // Core can't bind owned-type navigations through a constructor parameter.
    private QuizOption()
        : this(null!, false)
    {
    }
}
