namespace ItCareers.Domain.Enums;

// The admin inbox pipeline, shared by every kind of lead (consultation bookings, website orders).
// Stored as text, so adding a stage later never renumbers existing rows.
public enum LeadStatus
{
    New,
    Contacted,
    Agreed,
    Closed,
}
