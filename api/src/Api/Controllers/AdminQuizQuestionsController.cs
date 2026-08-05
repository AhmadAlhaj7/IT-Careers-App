using ItCareers.Application.Quizzes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/quiz-questions")]
[Authorize(Roles = "admin")]
public class AdminQuizQuestionsController : ControllerBase
{
    private readonly IQuizQuestionCommands _quizQuestionCommands;

    public AdminQuizQuestionsController(IQuizQuestionCommands quizQuestionCommands)
    {
        _quizQuestionCommands = quizQuestionCommands;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateQuizQuestionRequest request, CancellationToken cancellationToken)
    {
        var id = await _quizQuestionCommands.CreateAsync(request, cancellationToken);
        if (id is null)
        {
            return BadRequest(new { message = "المرحلة المحددة غير موجودة." });
        }

        return CreatedAtAction(nameof(Create), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateQuizQuestionRequest request, CancellationToken cancellationToken)
    {
        var updated = await _quizQuestionCommands.UpdateAsync(id, request, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _quizQuestionCommands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
