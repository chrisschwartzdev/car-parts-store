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
        if (request.Username.Length < 4)
            return BadRequest();
        
        var authLevel = 1;
        
        if (request.Username == "admin")
            authLevel = 2;

        HttpContext.Session.SetInt32(SessionKeys.UserAuthLevelKey, authLevel);
        
        _logger.LogInformation("User logged in.");
        return Ok(new {Username = request.Username, AuthLevel = authLevel});
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterRequest request)
    {
        if (request.Username == "test")
            return Ok();

        return BadRequest("Username was not test (for testing purposes, obviously)");
    }
    
    [HttpPost("logout")]
    [AuthorizeFilter(AuthorizationType.UserAuthLevel, RequiredAuthLevel = AuthLevel.User)]
    public IActionResult Logout()
    {
        return Ok();
    }
}
