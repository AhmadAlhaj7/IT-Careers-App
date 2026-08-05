using ItCareers.Application.Quizzes;
using ItCareers.Application.Roadmaps;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/roadmaps")]
public class RoadmapsController : ControllerBase
{
    private readonly IRoadmapQueries _roadmapQueries;
    private readonly IQuizSubmissionService _quizSubmissionService;
    private readonly IFinalExamSubmissionService _finalExamSubmissionService;

    public RoadmapsController(
        IRoadmapQueries roadmapQueries,
        IQuizSubmissionService quizSubmissionService,
        IFinalExamSubmissionService finalExamSubmissionService)
    {
        _roadmapQueries = roadmapQueries;
        _quizSubmissionService = quizSubmissionService;
        _finalExamSubmissionService = finalExamSubmissionService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<RoadmapSummaryDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _roadmapQueries.ListPublishedAsync(cancellationToken));
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<RoadmapDetailDto>> GetBySlug(string slug, CancellationToken cancellationToken)
    {
        var roadmap = await _roadmapQueries.GetBySlugAsync(slug, cancellationToken);
        return roadmap is null ? NotFound() : Ok(roadmap);
    }

    // Deliberately no [Authorize] here: Phase 1 must stay reachable by anonymous visitors.
    // If a valid Bearer token IS present, ASP.NET Core still populates User from it regardless
    // of [Authorize] — "sub" is Clerk's user id claim (MapInboundClaims=false keeps it as-is).
    [HttpGet("{slug}/phases/{orderIndex:int}")]
    public async Task<IActionResult> GetPhase(string slug, int orderIndex, CancellationToken cancellationToken)
    {
        var userId = User.FindFirst("sub")?.Value;
        var result = await _roadmapQueries.GetPhaseAsync(slug, orderIndex, userId, cancellationToken);

        return result.Status switch
        {
            PhaseAccessStatus.NotFound => NotFound(),
            PhaseAccessStatus.Locked => StatusCode(StatusCodes.Status402PaymentRequired, new { title = result.Title }),
            _ => Ok(result.Phase),
        };
    }

    // Deliberately no [Authorize], same reasoning as GetPhase — an anonymous or non-enrolled
    // caller just resolves to Locked instead of a hard 401.
    [HttpGet("{slug}/final-exam")]
    public async Task<IActionResult> GetFinalExam(string slug, CancellationToken cancellationToken)
    {
        var userId = User.FindFirst("sub")?.Value;
        var result = await _roadmapQueries.GetFinalExamAsync(slug, userId, cancellationToken);

        return result.Status switch
        {
            FinalExamAccessStatus.NotFound => NotFound(),
            FinalExamAccessStatus.Locked => StatusCode(StatusCodes.Status402PaymentRequired),
            _ => Ok(result.Questions),
        };
    }

    // Requires sign-in (unlike GetPhase above) — a quiz result has to be tied to a real user
    // to ever mean anything, and completion is only ever recorded server-side from here.
    [Authorize]
    [HttpPost("{slug}/phases/{orderIndex:int}/quiz/submit")]
    public async Task<IActionResult> SubmitQuiz(
        string slug,
        int orderIndex,
        QuizSubmissionRequest request,
        CancellationToken cancellationToken)
    {
        var userId = User.FindFirst("sub")?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var outcome = await _quizSubmissionService.SubmitAsync(userId, slug, orderIndex, request, cancellationToken);

        return outcome.Status switch
        {
            QuizSubmissionStatus.NotFound => NotFound(),
            QuizSubmissionStatus.Locked => StatusCode(StatusCodes.Status402PaymentRequired),
            _ => Ok(outcome.Result),
        };
    }

    // Requires actual enrollment (checked inside the service) — there's no free-preview
    // equivalent for the final exam the way there is for Phase 1.
    [Authorize]
    [HttpPost("{slug}/final-exam/submit")]
    public async Task<IActionResult> SubmitFinalExam(string slug, QuizSubmissionRequest request, CancellationToken cancellationToken)
    {
        var userId = User.FindFirst("sub")?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        // "name" is a custom Clerk session-token claim (same mechanism as "role") — falls
        // back to a generic label until that claim is configured in Clerk's dashboard.
        var learnerName = User.FindFirst("name")?.Value;
        if (string.IsNullOrWhiteSpace(learnerName))
        {
            learnerName = "Student";
        }

        var outcome = await _finalExamSubmissionService.SubmitAsync(userId, learnerName, slug, request, cancellationToken);

        return outcome.Status switch
        {
            FinalExamSubmissionStatus.NotFound => NotFound(),
            FinalExamSubmissionStatus.NotEnrolled => StatusCode(StatusCodes.Status402PaymentRequired),
            _ => Ok(outcome.Result),
        };
    }
}
