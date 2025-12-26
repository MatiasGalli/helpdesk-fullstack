using HelpDesk.Application.Dtos;
using HelpDesk.Domain.Entities;
using HelpDesk.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Api.Controllers;

[ApiController]
[Route("api/tickets")]
[Authorize]
public class TicketsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedResponse<TicketResponse>>> List(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] TicketStatus? status = null,
        [FromQuery] TicketPriority? priority = null
    )
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 50);

        var query = db.Tickets.AsQueryable();

        if (status is not null) query = query.Where(t => t.Status == status);
        if (priority is not null) query = query.Where(t => t.Priority == priority);

        var total = await query.CountAsync();

        var items = await query
            .OrderByDescending(t => t.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(t => new TicketResponse(t.Id, t.Title, t.Description, t.Priority, t.Status, t.CreatedAtUtc, t.AssignedTo))
            .ToListAsync();

        return Ok(new PagedResponse<TicketResponse>(page, pageSize, total, items));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TicketResponse>> Get(Guid id)
    {
        var t = await db.Tickets.FindAsync(id);
        if (t is null) return NotFound();

        return Ok(new TicketResponse(t.Id, t.Title, t.Description, t.Priority, t.Status, t.CreatedAtUtc, t.AssignedTo));
    }

    [HttpPost]
    public async Task<ActionResult<TicketResponse>> Create(CreateTicketRequest req)
    {
        var ticket = new Ticket
        {
            Title = req.Title.Trim(),
            Description = req.Description.Trim(),
            Priority = req.Priority,
            Status = TicketStatus.New,
            AssignedTo = string.IsNullOrWhiteSpace(req.AssignedTo) ? null : req.AssignedTo.Trim()
        };

        db.Tickets.Add(ticket);
        await db.SaveChangesAsync();

        var dto = new TicketResponse(ticket.Id, ticket.Title, ticket.Description, ticket.Priority, ticket.Status, ticket.CreatedAtUtc, ticket.AssignedTo);
        return CreatedAtAction(nameof(Get), new { id = ticket.Id }, dto);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateTicketRequest req)
    {
        var t = await db.Tickets.FindAsync(id);
        if (t is null) return NotFound();

        if (req.Title is not null) t.Title = req.Title.Trim();
        if (req.Description is not null) t.Description = req.Description.Trim();
        if (req.Priority is not null) t.Priority = req.Priority.Value;
        if (req.Status is not null) t.Status = req.Status.Value;
        if (req.AssignedTo is not null) t.AssignedTo = string.IsNullOrWhiteSpace(req.AssignedTo) ? null : req.AssignedTo.Trim();

        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var t = await db.Tickets.FindAsync(id);
        if (t is null) return NotFound();

        db.Tickets.Remove(t);
        await db.SaveChangesAsync();
        return NoContent();
    }
}