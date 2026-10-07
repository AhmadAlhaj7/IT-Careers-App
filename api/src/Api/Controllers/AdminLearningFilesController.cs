using ItCareers.Application.LearningFiles;
using ItCareers.Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/files")]
[Authorize(Roles = "admin")]
public class AdminLearningFilesController : ControllerBase
{
    private readonly IAdminLearningFileQueries _queries;
    private readonly ILearningFileCommands _commands;

    public AdminLearningFilesController(IAdminLearningFileQueries queries, ILearningFileCommands commands)
    {
        _queries = queries;
        _commands = commands;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AdminLearningFileDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _queries.ListAsync(cancellationToken));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<AdminLearningFileDto>> Get(Guid id, CancellationToken cancellationToken)
    {
        var file = await _queries.GetByIdAsync(id, cancellationToken);
        return file is null ? NotFound() : Ok(file);
    }

    // Multipart so the browser can send the file straight here — the Next.js server can't sit in
    // the middle of a large upload on Vercel (request bodies are capped at a few MB there).
    [HttpPost]
    [RequestSizeLimit(LearningFileLimits.MaxRequestBytes)]
    [RequestFormLimits(MultipartBodyLengthLimit = LearningFileLimits.MaxRequestBytes)]
    public async Task<IActionResult> Create([FromForm] LearningFileForm form, CancellationToken cancellationToken)
    {
        try
        {
            var id = await _commands.CreateAsync(await form.ToRequestAsync(cancellationToken), cancellationToken);
            return Ok(new { id });
        }
        catch (InvalidLearningFileException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id:guid}")]
    [RequestSizeLimit(LearningFileLimits.MaxRequestBytes)]
    [RequestFormLimits(MultipartBodyLengthLimit = LearningFileLimits.MaxRequestBytes)]
    public async Task<IActionResult> Update(Guid id, [FromForm] LearningFileForm form, CancellationToken cancellationToken)
    {
        try
        {
            var updated = await _commands.UpdateAsync(id, await form.ToRequestAsync(cancellationToken), cancellationToken);
            return updated ? NoContent() : NotFound();
        }
        catch (InvalidLearningFileException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _commands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}

// Only the Arabic title and category are required — an admin who hasn't written the English yet
// shouldn't be blocked, and the frontend falls back to Arabic for any empty English field.
public class LearningFileForm
{
    public string TitleAr { get; set; } = string.Empty;
    public string? TitleEn { get; set; }
    public string? DescriptionAr { get; set; }
    public string? DescriptionEn { get; set; }
    public string CategoryAr { get; set; } = string.Empty;
    public string? CategoryEn { get; set; }
    public bool AllowDownload { get; set; }
    public bool Published { get; set; }
    public IFormFile? File { get; set; }

    public async Task<SaveLearningFileRequest> ToRequestAsync(CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(TitleAr) || string.IsNullOrWhiteSpace(CategoryAr))
        {
            throw new InvalidLearningFileException("العنوان والتصنيف مطلوبان.");
        }

        LearningFileUpload? upload = null;
        if (File is { Length: > 0 })
        {
            await using var stream = File.OpenReadStream();
            using var buffer = new MemoryStream((int)File.Length);
            await stream.CopyToAsync(buffer, cancellationToken);

            // Browsers sometimes send no type for unfamiliar extensions; octet-stream is the safe default
            // (never previewable, download-only).
            var contentType = string.IsNullOrWhiteSpace(File.ContentType) ? "application/octet-stream" : File.ContentType;
            upload = new LearningFileUpload(Path.GetFileName(File.FileName), contentType, buffer.ToArray());
        }

        return new SaveLearningFileRequest(
            new LocalizedText(TitleAr.Trim(), (TitleEn ?? string.Empty).Trim()),
            new LocalizedText((DescriptionAr ?? string.Empty).Trim(), (DescriptionEn ?? string.Empty).Trim()),
            new LocalizedText(CategoryAr.Trim(), (CategoryEn ?? string.Empty).Trim()),
            AllowDownload,
            Published,
            upload);
    }
}
