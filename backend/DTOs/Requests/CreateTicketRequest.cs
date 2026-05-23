namespace TicketSystem.Api.DTOs.Requests;

using TicketSystem.Api.Enums;

public class CreateTicketRequest
{
    public string Title {get; set;} =string.Empty;
    public string Description {get; set;} =string.Empty;
    public TicketPriority Priority {get; set;} = TicketPriority.Medium;
    public TicketCategory Category {get; set;} = TicketCategory.Other;

}