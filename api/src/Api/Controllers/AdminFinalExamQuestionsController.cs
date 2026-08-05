using ItCareers.Application.Quizzes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/admin/final-exam-questions")]
[Authorize(Roles = "admin")]
public class AdminFinalExamQuestionsController : ControllerBase
{
    private readonly IFinalExamQuestionCommands _finalExamQuestionCommands;

    public AdminFinalExamQuestionsController(IFinalExamQuestionCommands finalExamQuestionCommands)
    {
        _finalExamQuestionCommands = finalExamQuestionCommands;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateFinalExamQuestionRequest request, CancellationToken cancellationToken)
    {
        var id = await _finalExamQuestionCommands.CreateAsync(request, cancellationToken);
        if (id is null)
        {
            return BadRequest(new { message = "المسار المحدد غير موجود." });
        }

        return CreatedAtAction(nameof(Create), new { id }, new { id });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateFinalExamQuestionRequest request, CancellationToken cancellationToken)
    {
        var updated = await _finalExamQuestionCommands.UpdateAsync(id, request, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _finalExamQuestionCommands.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
