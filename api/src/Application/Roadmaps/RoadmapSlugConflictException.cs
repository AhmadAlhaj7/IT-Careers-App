namespace ItCareers.Application.Roadmaps;

public class RoadmapSlugConflictException : Exception
{
    public RoadmapSlugConflictException(string slug)
        : base($"الرابط المختصر \"{slug}\" مستخدم بالفعل.")
    {
    }
}
