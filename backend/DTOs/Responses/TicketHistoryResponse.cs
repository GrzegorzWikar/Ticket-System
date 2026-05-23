namespace TicketSystem.API.DTOs.Responses;

public class TicketHistoryResponse
{
    public string FieldChanged {get; set;} =string.Empty;
    public string OldValue {get; set;} =string.Empty;
    public string NewValue {get; set;} =string.Empty;
    public string ChangedByName {get; set;} =string.Empty;
    public DateTime ChangedAt {get; set;}
}