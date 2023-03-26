using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CarPartsStore.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger)
    {
        _logger = logger;
    }

    [HttpPost("login")]
    public IActionResult Login()
    {
        return Ok();
    }
}
