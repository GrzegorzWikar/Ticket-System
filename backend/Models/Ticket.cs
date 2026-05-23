namespace TicketSystem.API.Models;

using TicketSystem.API.Enums;

public class Ticket
{
    public int Id {get; set;}
    public string Title {get; set;} = string.Empty;
    public string Description {get; set;} = string.Empty;
    public TicketStatus Status {get; set;} = TicketStatus.Open;
    public TicketPriority Priority {get; set;} = TicketPriority.Medium;
    public TicketCategory Category {get; set;} = TicketCategory.Other;

    public int CreatedByUserId {get; set;}
    public User CreatedBy {get; set;} = null!;

    public int? AssignedToUserId {get; set;}
    public User? AssignedTo {get; set;}

    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;
    public DateTime? ResolvedAt {get; set;}

    // Navigation 
    public List<TicketHistory> History {get; set;} = [];
    public List<Comment> Comments {get; set;} = [];
}