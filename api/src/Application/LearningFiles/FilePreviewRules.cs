namespace ItCareers.Application.LearningFiles;

public static class LearningFileLimits
{
    public const long MaxFileBytes = 50L * 1024 * 1024;

    // A little headroom over the file itself for the multipart envelope and the other form fields.
    public const long MaxRequestBytes = MaxFileBytes + 1024 * 1024;
}

// Which content types the browser can safely show inline. Deliberately a short allow-list rather
// than "anything not dangerous": HTML and SVG can run script, and serving them inline from the
// API's own origin would let an uploaded file act on that origin. Anything off the list is
// download-only, so it can't also be view-only.
public static class FilePreviewRules
{
    private static readonly HashSet<string> InlineTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "text/plain",
    };

    public static bool CanPreview(string contentType)
    {
        var type = contentType.Split(';')[0].Trim();
        return InlineTypes.Contains(type)
            || type.StartsWith("video/", StringComparison.OrdinalIgnoreCase)
            || type.StartsWith("audio/", StringComparison.OrdinalIgnoreCase);
    }
}
