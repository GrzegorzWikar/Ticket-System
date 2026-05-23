namespace TicketSystem.API.Services;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TicketSystem.API.Data;
using TicketSystem.API.DTOs.Requests;
using TicketSystem.API.DTOs.Responses;
using TicketSystem.API.Enums;
using TicketSystem.API.Models;


public class AuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext db, IConfiguration configuration)
    {
        _db = db;
        _config = configuration;
    }

    public async Task<AuthResponse?> RegisterAsync(RegisterRequest request)
    {
        //Check if user with the same email already exists
        if (await _db.Users.AnyAsync(u => u.Email == request.Email))
            return null;
        
        var user = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Role = UserRole.User
        };
        
        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        
        return GenerateToken(user);
    }

    public async Task<AuthResponse?> LoginAsync(LoginRequest request)
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email && u.IsActive);

        if (user == null) return null;

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash)) return null;

        return GenerateToken(user);

    }

    private AuthResponse GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        
        var credentials = new SigningCredentials(
            key, SecurityAlgorithms.HmacSha256);
        
        var expiry = DateTime.UtcNow.AddMinutes(
            int.Parse(_config["Jwt:ExpiryInMinutes"]!));

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: expiry,
            signingCredentials: credentials
        );
        return new AuthResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Email = user.Email,
            FirstName = user.FirstName,
            Role = user.Role.ToString(),
            ExpiresAt = expiry
        };
    } 

}