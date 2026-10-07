namespace ItCareers.Application.LearningFiles;

// Thrown for a rule the admin broke (no file, too big, view-only on a type that can't be viewed).
// The message is shown to the admin as-is, so it's written for them.
public class InvalidLearningFileException : Exception
{
    public InvalidLearningFileException(string message)
        : base(message)
    {
    }
}
