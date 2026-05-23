namespace TicketSystem.API.Models;

using TicketSystem.API.Enums;

public class User
{
    public int Id {get; set;}
    public string Email {get; set;} = string.Empty;
    public string PasswordHash {get; set;} = string.Empty;
    public string FirstName {get; set;} = string.Empty;
    public string LastName {get; set;} = string.Empty;
    public UserRole Role {get; set;} = UserRole.User;
    public bool IsActive {get; set;} = true;
    public DateTime CreatedAt {get; set;} = DateTime.UtcNow;

    // Navigation 
    public List<Ticket> CreatedTickets {get; set;} = [];
    public List<Ticket> AssignedTickets {get; set;} = [];
    public List<Comment> Comments {get; set;} = [];
    public List<TicketHistory> Changes {get; set;} = [];
}