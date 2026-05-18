public class TicketHistory
{
    public int Id {get; set;}
    public int TicketId {get; set;}
    public int ChangedByUserId {get; set;}
    public string FieldChanged {get; set;}
    public string OldValue {get; set;}
    public string NewValue {get; set;}
    public DateTime ChangedAt {get; set;}
}