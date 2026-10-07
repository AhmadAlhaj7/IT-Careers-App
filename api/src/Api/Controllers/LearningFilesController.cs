using ItCareers.Application.LearningFiles;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

// Public library. No [Authorize]: browsing, viewing and (where the admin allows it) downloading
// are open to everyone, same as the career quiz and the specializations pages.
[ApiController]
[Route("api/files")]
public class LearningFilesController : ControllerBase
{
    private readonly ILearningFileQueries _queries;

    public LearningFilesController(ILearningFileQueries queries)
    {
        _queries = queries;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<LearningFileDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _queries.ListAsync(cancellationToken));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<LearningFileDto>> Get(Guid id, CancellationToken cancellationToken)
    {
        var file = await _queries.GetAsync(id, cancellationToken);
        return file is null ? NotFound() : Ok(file);
    }

    // Inline content for the viewer. Only types FilePreviewRules trusts are ever served this way;
    // everything else is download-only, so there is nothing to show and this answers 404.
    [HttpGet("{id:guid}/content")]
    public async Task<IActionResult> Content(Guid id, CancellationToken cancellationToken)
    {
        var file = await _queries.GetContentAsync(id, cancellationToken);
        if (file is null || !FilePreviewRules.CanPreview(file.ContentType))
        {
            return NotFound();
        }

        Response.Headers.XContentTypeOptions = "nosniff";
        return File(file.Bytes, file.ContentType, enableRangeProcessing: true);
    }

    // The one place "view only" is enforced: a file the admin marked view-only has no download.
    [HttpGet("{id:guid}/download")]
    public async Task<IActionResult> Download(Guid id, CancellationToken cancellationToken)
    {
        var file = await _queries.GetContentAsync(id, cancellationToken);
        if (file is null)
        {
            return NotFound();
        }

        if (!file.AllowDownload)
        {
            return StatusCode(StatusCodes.Status403Forbidden, new { message = "Downloading is not allowed for this file." });
        }

        Response.Headers.XContentTypeOptions = "nosniff";
        return File(file.Bytes, file.ContentType, file.FileName, enableRangeProcessing: true);
    }
}
