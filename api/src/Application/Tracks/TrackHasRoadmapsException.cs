namespace ItCareers.Application.Tracks;

// Unlike deleting a Roadmap (which cascades to its Phases), deleting a Track never cascades
// to its Roadmaps — a track is just a categorization layer, and its roadmaps may have paying
// learners. Blocking the delete instead keeps the data model from ending up with an orphaned
// (soft-deleted-track-referencing) Roadmap.
public class TrackHasRoadmapsException : Exception
{
    public TrackHasRoadmapsException()
        : base("لا يمكن حذف هذا المسار الرئيسي لوجود مسارات تعليمية تابعة له.")
    {
    }
}
