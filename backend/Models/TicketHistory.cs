namespace TicketSystem.API.Models;

public class TicketHistory
{
    public int Id {get; set;}

    public int TicketId {get; set;}
    public Ticket Ticket {get; set;} = null!;
    public int ChangedByUserId {get; set;}
    public User ChangedBy {get; set;} = null!;

    public string FieldChanged {get; set;} = string.Empty;
    public string OldValue {get; set;} = string.Empty;
    public string NewValue {get; set;} = string.Empty;
    public DateTime ChangedAt {get; set;} = DateTime.UtcNow;
}