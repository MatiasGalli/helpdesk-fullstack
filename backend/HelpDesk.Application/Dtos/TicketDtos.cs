using HelpDesk.Domain.Entities;

namespace HelpDesk.Application.Dtos;

public record TicketResponse(
    Guid Id,
    string Title,
    string Description,
    TicketPriority Priority,
    TicketStatus Status,
    DateTime CreatedAtUtc,
    string? AssignedTo
);

public record CreateTicketRequest(
    string Title,
    string Description,
    TicketPriority Priority,
    string? AssignedTo
);

public record UpdateTicketRequest(
    string? Title,
    string? Description,
    TicketPriority? Priority,
    TicketStatus? Status,
    string? AssignedTo
);

public record PagedResponse<T>(int Page, int PageSize, int Total, List<T> Items);