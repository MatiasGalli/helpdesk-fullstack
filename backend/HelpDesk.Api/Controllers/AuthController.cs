using HelpDesk.Api.Auth;
using Microsoft.AspNetCore.Mvc;

namespace HelpDesk.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(JwtTokenService jwt, IConfiguration cfg) : ControllerBase
{
    [HttpPost("login")]
    public ActionResult<LoginResponse> Login(LoginRequest req)
    {
        var adminUser = cfg["Auth:Username"] ?? "admin";
        var adminPass = cfg["Auth:Password"] ?? "123456";

        if (req.Username != adminUser || req.Password != adminPass)
            return Unauthorized(new { message = "Invalid credentials" });

        var token = jwt.CreateToken(req.Username);
        return Ok(new LoginResponse(token, req.Username));
    }
}