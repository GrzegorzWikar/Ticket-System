namespace TicketSystem.API.Controllers;

using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicketSystem.API.DTOs.Requests;
using TicketSystem.API.Enums;
using TicketSystem.API.Services;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TicketsController : ControllerBase
{
    private readonly TicketService _ticketService;

    public TicketsController(TicketService ticketService)
    {
        _ticketService = ticketService;
    }
    
    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] TicketStatus? status,
        [FromQuery] TicketPriority? priority,
        [FromQuery] TicketCategory? category)
    {
        var tickets = await _ticketService.GetAllAsync(status, priority, category);
        return Ok(tickets);
    }


}