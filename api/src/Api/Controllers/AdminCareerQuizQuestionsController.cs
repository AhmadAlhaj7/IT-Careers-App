using ItCareers.Application.CareerQuiz;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/career-quiz-questions")]
[Authorize(Roles = "admin")]
public class AdminCareerQuizQuestionsController : ControllerBase
{
    private readonly IAdminCareerQuizQueries _careerQuizQueries;
    private readonly ICareerQuizQuestionCommands _careerQuizQuestionCommands;

    public AdminCareerQuizQuestionsController(
        IAdminCareerQuizQueries careerQuizQueries,
        ICareerQuizQuestionCommands careerQuizQuestionCommands)
    {
        _careerQuizQueries = careerQuizQueries;
        _careerQuizQuestionCommands = careerQuizQuestionCommands;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<AdminCareerQuizQuestionDto>>> List(CancellationToken cancellationToken)
    {
        return Ok(await _careerQuizQueries.ListAsync(cancellationToken));
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCareerQuizQuestionRequest request, CancellationToken cancellationToken)
    {
        var id = await _careerQuizQuestionCommands.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(List), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateCareerQuizQuestionRequest request, CancellationToken cancellationToken)
    {
        var updated = await _careerQuizQuestionCommands.UpdateAsync(id, request, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _careerQuizQuestionCommands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
