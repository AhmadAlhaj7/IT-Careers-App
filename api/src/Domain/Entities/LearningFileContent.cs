namespace ItCareers.Domain.Entities;

// The raw bytes of a LearningFile, one row per file, keyed by the file's own id. Deliberately not
// an Entity (no soft delete): deleting a file removes its bytes outright so storage is actually
// freed, while the LearningFile row stays behind soft-deleted like every other record.
public class LearningFileContent
{
    public Guid LearningFileId { get; private set; }
    public byte[] Bytes { get; private set; } = [];

    private LearningFileContent()
    {
    }

    public LearningFileContent(Guid learningFileId, byte[] bytes)
    {
        LearningFileId = learningFileId;
        Bytes = bytes;
    }

    public void Replace(byte[] bytes)
    {
        Bytes = bytes;
    }
}
