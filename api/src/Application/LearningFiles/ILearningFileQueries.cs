namespace ItCareers.Application.LearningFiles;

// Public reads — only published, non-deleted files are ever visible here.
public interface ILearningFileQueries
{
    Task<IReadOnlyList<LearningFileDto>> ListAsync(CancellationToken cancellationToken = default);

    Task<LearningFileDto?> GetAsync(Guid id, CancellationToken cancellationToken = default);

    Task<LearningFileContentDto?> GetContentAsync(Guid id, CancellationToken cancellationToken = default);
}

public interface IAdminLearningFileQueries
{
    Task<IReadOnlyList<AdminLearningFileDto>> ListAsync(CancellationToken cancellationToken = default);

    Task<AdminLearningFileDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
}
