namespace TicketSystem.API.Controllers;

using Microsoft.AspNetCore.Mvc;
using TicketSystem.API.DTOs.Requests;
using TicketSystem.API.Services;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);

        if (result == null) return BadRequest(new { message = "Email already in use." });
        
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);

        if (result == null) return Unauthorized(new { message = "Invalid credentials." });

        return Ok(result);
    }
}