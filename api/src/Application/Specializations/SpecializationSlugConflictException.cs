namespace ItCareers.Application.Specializations;

public class SpecializationSlugConflictException : Exception
{
    public SpecializationSlugConflictException(string slug)
        : base($"الرابط المختصر \"{slug}\" مستخدم بالفعل.")
    {
    }
}
