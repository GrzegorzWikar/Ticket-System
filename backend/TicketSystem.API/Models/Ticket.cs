public class Ticket
{
    public int Id {get; set;}
    public string Title {get; set;}
    public string Description {get; set;}
    public TicketStatus Status {get; set;}
    public TicketPriority Priority {get; set;}
    public TicketCategory Category {get; set;}

    public int CreatedByUserId {get; set;}
    public User CreatedBy {get; set;}

    public int? AssignedToUserId {get; set;}
    public User? AssignedTo {get; set;}

    public DateTime CreatedAt {get; set;}
    public DateTime? ResolvedAt {get; set;}

    public List<TicketHistory> History {get; set;}
    public List<Comment> Comments {get; set;}
}