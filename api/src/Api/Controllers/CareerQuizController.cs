using ItCareers.Application.CareerQuiz;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/quiz")]
public class CareerQuizController : ControllerBase
{
    private readonly ICareerQuizQueries _careerQuizQueries;
    private readonly ICareerQuizSubmissionService _submissionService;

    public CareerQuizController(ICareerQuizQueries careerQuizQueries, ICareerQuizSubmissionService submissionService)
    {
        _careerQuizQueries = careerQuizQueries;
        _submissionService = submissionService;
    }

    [HttpGet("questions")]
    public async Task<ActionResult<IReadOnlyList<PublicCareerQuizQuestionDto>>> ListQuestions(CancellationToken cancellationToken)
    {
        return Ok(await _careerQuizQueries.ListQuestionsAsync(cancellationToken));
    }

    // Deliberately no [Authorize] — the career quiz is never gated behind sign-in or email.
    // If a Bearer token is present anyway, ASP.NET Core still populates User from it, so a
    // signed-in visitor's submission can still be tied to their account for analytics.
    [HttpPost("submit")]
    public async Task<IActionResult> Submit(CareerQuizSubmissionRequest request, CancellationToken cancellationToken)
    {
        var userId = User.FindFirst("sub")?.Value;
        var result = await _submissionService.SubmitAsync(userId, request, cancellationToken);

        return result is null ? NotFound() : Ok(result);
    }
}
