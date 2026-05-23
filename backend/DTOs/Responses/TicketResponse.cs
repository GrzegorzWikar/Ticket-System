namespace TicketSystem.API.DTOs.Responses;

using TicketSystem.API.Enums;

public class TicketResponse
{
    public int Id {get; set;}
    public string Title {get; set;} =string.Empty;
    public string Description {get; set;} =string.Empty;
    public string Status {get; set;} =string.Empty;
    public string Priority {get; set;} =string.Empty;
    public string Category {get; set;} =string.Empty;

    public int CreatedByUserId {get; set;}
    public string CreatedByUserName {get; set;} =string.Empty;

    public int? AssignedToUserId {get; set;}
    public string? AssignedToUserName {get; set;}

    public DateTime CreatedAt {get; set;}
    public DateTime? ResolcedAt {get; set;}

    public List<TicketHistoryResponse> History {get; set;} = [];
}