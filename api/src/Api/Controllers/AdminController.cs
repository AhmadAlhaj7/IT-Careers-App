using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItCareers.Api.Controllers;

// One protected test endpoint, same purpose MeController served for auth in Slice 1:
// prove the role check actually works before building real admin features on top of it.
[ApiController]
[Route("api/admin")]
[Authorize(Roles = "admin")]
public class AdminController : ControllerBase
{
    [HttpGet("ping")]
    public IActionResult Ping()
    {
        return Ok(new { message = "You are recognized as an admin." });
    }
}
