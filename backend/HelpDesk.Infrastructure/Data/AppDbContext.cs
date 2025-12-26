using HelpDesk.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Ticket> Tickets => Set<Ticket>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ticket>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Title).IsRequired().HasMaxLength(200);
            e.Property(x => x.Description).IsRequired().HasMaxLength(4000);
            e.Property(x => x.AssignedTo).HasMaxLength(120);
        });
    }
}