namespace ItCareers.Application.LearningFiles;

public interface ILearningFileCommands
{
    /// <exception cref="InvalidLearningFileException">No file, file too large, or view-only on a type that can't be viewed.</exception>
    Task<Guid> CreateAsync(SaveLearningFileRequest request, CancellationToken cancellationToken = default);

    /// <exception cref="InvalidLearningFileException">Same rules as create.</exception>
    Task<bool> UpdateAsync(Guid id, SaveLearningFileRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
