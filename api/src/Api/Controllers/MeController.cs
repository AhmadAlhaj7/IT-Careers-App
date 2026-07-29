using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MeController : ControllerBase
{
    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        var userId = User.FindFirst("sub")?.Value;
        return Ok(new { userId });
    }
}
