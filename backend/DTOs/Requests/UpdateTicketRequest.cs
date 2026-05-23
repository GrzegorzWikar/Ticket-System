namespace TicketSystem.API.DTOs.Requests;

using TicketSystem.API.Enums;

public class UpdateTicketRequest
{
    public string? Title {get; set;}
    public string? Description {get; set;}
    public TicketPriority? Priority {get; set;}
    public TicketCategory? Category {get; set;}
}