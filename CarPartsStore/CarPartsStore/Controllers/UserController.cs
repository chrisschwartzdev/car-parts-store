using CarPartsStore.Messages;
using Microsoft.AspNetCore.Mvc;

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
    public IActionResult Login(LoginRequest request)
    {
        if (request.Username == "test")
            return Ok(new {Username = "test"});

        return BadRequest();
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterRequest request)
    {
        if (request.Username == "test")
            return Ok();

        return BadRequest();
    }
    
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok();
    }
}
