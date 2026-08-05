namespace ItCareers.Domain.Entities;

// A plain value object, part of a CareerQuizOption's owned JSON — how strongly picking this
// option should count toward a given track's total score.
public record TrackWeight(Guid TrackId, int Weight)
{
    private TrackWeight()
        : this(Guid.Empty, 0)
    {
    }
}
