namespace HelpDesk.Domain.Entities;

public enum TicketPriority { Low = 1, Medium = 2, High = 3 }
public enum TicketStatus { New = 1, InProgress = 2, Resolved = 3 }

public class Ticket
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";

    public TicketPriority Priority { get; set; } = TicketPriority.Medium;
    public TicketStatus Status { get; set; } = TicketStatus.New;

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    // “UsuarioAsignado” lo guardamos como string por rapidez (la prueba no exige CRUD de usuarios)
    public string? AssignedTo { get; set; }
}