namespace ItCareers.Application.Tracks;

public class TrackSlugConflictException : Exception
{
    public TrackSlugConflictException(string slug)
        : base($"الرابط المختصر \"{slug}\" مستخدم بالفعل.")
    {
    }
}
