namespace TicketSystem.API.Services;

public class TicketService
{
    private readonly AppDbContext _db;

    public TicketService(AppDbContext db)
    {
        _db = db;
    }

    private static TicketResponse MapToResponse(Ticket t) => new()
    {
        Id = t.Id,
        Title = t.Title,
        Description = t.Description,
        Status = t.Status.ToString(),
        Priority = t.Priority.ToString(),
        Category = t.Category.ToString(),
        CreatedByUserId = t.CreatedByUserId,
        CreatedByName = $"{t.CreatedByUser.FirstName} {t.CreatedByUser.LastName}",
        AssignedToUserId = t.AssignedToUserId,
        AssignedToName = t.AssignedTo != null
            ? $"{t.AssignedTo.FirstName} {t.AssignedTo.LastName}"
            : null,
        CreatedAt = t.CreatedAt,
        ResolcedAt = t.ResolvedAt,
        History = t.History.OrderByDescending(h = h.ChangedAt).Select(h => new TicketHistoryResponse
        {
            FieldChanged = h.FieldChanged,
            OldValue = h.OldValue,
            NewValue = h.NewValue,
            ChangedByName = $"{h.ChangedBy.FirstName} {h.ChangedBy.LastName}",
            ChangedAt = h.ChangedAt
        }).ToList()
    };

    private static IQueryable<Ticket> WithIncludes(IQueryable<Ticket> query) =>
        query
            .Include(t => t.CreatedBy)
            .Include(t => t.AssignedTo)
            .Include(t => t.History).ThenInclude(h => h.ChangedBy);
    
    private void AddHistory(Ticket ticket, int changeByUserId, 
        string field, string oldValue, string newValue)
    {
        _db.TicketHistories.Add(new TicketHistory
        {
            TicketId = ticket.Id,
            ChangedByUserId = changeByUserId,
            FieldChanged = field,
            OldValue = oldValue,
            NewValue = newValue,
        });
    }

    public async Task<List<TicketResponse>> GetAllAsync(
        TicketStatus? status, TicketPriority? priority, TicketCategory? category)
    {
        var query = WithIncludes(_db.Tickets.AsQuerable());

        if (status.HasValue) query = query.Where(t => t.Status == status.Value);
        if (priority.HasValue) query = query.Where(t => t.Priority == priority.Value);
        if (category.HasValue) query = query.Where(t => t.Category == category.Value);

        var tickets = await query
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();

        return tickets.Select(MapToResponse).ToList();
    }

    public async Task<TicketResponse?> GetByIdAsync(int id)
    {
        var ticket = await WithIncludes(_db.Tickets)
            .FirstOrDefaultAsync(t => t.Id == id);

        return ticket == null ? null : MapToResponse(ticket);
    }

    public async Task<TicketResponse> CreatedAsync(CreateTicketRequest request, int userId)
    {
        var ticket = new Ticket
        {
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            Category = request.Category,
            CreatedByUserId = userId
        };

        _db.Tickets.Add(ticket);
        await _db.SaveChangesAsync();

        var created = await WithIncludes(_db.Tickets)
            .FirstAsync(t => t.Id == ticket.Id);

        return MapToResponse(created);       
    }

    public async Task<TicketResponse?> UpdateAsync(int id, UpdateTicketRequest request, int userId)
    {
        var ticket = await WithIncludes(_db.Tickets)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (ticket == null) return null;

        if (request.Title != null && request.Title != ticket.Title)
        {
            AddHistory(ticket, userId, "Title", ticket.Title, request.Title);
            ticket.Title = request.Title;
        }

        if (request.Description != null && request.Description != ticket.Description)
        {
            AddHistory(ticket, userId, "Description", ticket.Description, request.Description);
            ticket.Description = request.Description;
        }

        if (request.Priority.HasValue && request.Priority.Value != ticket.Priority)
        {
            AddHistory(ticket, userId, "Priority", ticket.Priority.ToString(), request.Priority.Value.ToString());
            ticket.Priority = request.Priority.Value;
        }

        if (request.Category.HasValue && request.Category.Value != ticket.Category)
        {
            AddHistory(ticket, userId, "Category", ticket.Category.ToString(), request.Category.Value.ToString());
            ticket.Category = request.Category.Value;
        }

        await _db.SaveChangesAsync();

        var updated = await WithIncludes(_db.Tickets)
            .FirstAsync(t => t.Id == ticket.Id);

        return MapToResponse(updated);
    }

    public async Task<TicketResponse?> ChangeStatusAsync(int id, ChangeStatusRequest request, int userId)
    {
        var ticket = await WithIncludes(_db.Tickets)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (ticket == null) return null;
        if (request.Status == ticket.Status) return MapToResponse(ticket);

        AddHistory(ticket, userId, "Status", ticket.Status.ToString(), request.Status.ToString());
        
        ticket.Status = request.Status;

        if (request.Status == TicketStatus.Resolved)
            ticket.ResolvedAt = DateTime.UtcNow;
        else if (request.Status == TicketStatus.Closed)
            ticket.ResolvedAt = null;

        await _db.SaveChangesAsync();

        var updated = await WithIncludes(_db.Tickets)
            .FirstAsync(t => t.Id == ticket.Id);

        return MapToResponse(updated);
    }

    public async Task<TicketResponse?> AssignAsync(int id, AssignTicketRequest request, int userId)
    {
        var ticket = await WithIncludes(_db.Tickets)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (ticket == null) return null;
        
        var oldValue = ticket.AssignedToUserId?.ToString() ?? "Unassigned";
        var newValue = request.UserId?.ToString() ?? "Unassigned";

        AddHistory(ticket, userId, "AssignedTo", oldValue, newValue);
        ticket.AssignedToUserId = request.UserId;

        await _db.SaveChangesAsync();

        var updated = await WithIncludes(_db.Tickets)
            .FirstAsync(t => t.Id == ticket.Id);

        return MapToResponse(updated);
    }
}