import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Tickets, Ticket, TicketPriority, TicketStatus } from '../../services/tickets';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tickets-list.html'
})
export class TicketsList implements OnInit {
  private ticketsApi = inject(Tickets);
  private cd = inject(ChangeDetectorRef);

  loading = false;
  error: string | null = null;

  items: Ticket[] = [];
  total = 0;

  page = 1;
  pageSize = 10;

  // filtros (null = sin filtro)
  status: TicketStatus | null = null;
  priority: TicketPriority | null = null;

  ngOnInit() {
    setTimeout(() => { void this.load(); }, 0);
  }

  async load() {
    this.loading = true;
    this.error = null;

    try {
      const res = await firstValueFrom(
        this.ticketsApi.list({
          page: this.page,
          pageSize: this.pageSize,
          status: this.status,
          priority: this.priority
        })
      );

      this.items = res.items;
      this.total = res.total;
    } catch (err: any) {
      this.error = err?.error?.message ?? err?.message ?? 'Error loading tickets';
    } finally {
      this.loading = false;
      this.cd.detectChanges();
    }
  }

  applyFilters() {
    this.page = 1;
    this.load();
  }

  clearFilters() {
    this.status = null;
    this.priority = null;
    this.page = 1;
    this.load();
  }

  nextPage() {
    if (this.page * this.pageSize >= this.total) return;
    this.page++;
    this.load();
  }

  prevPage() {
    if (this.page <= 1) return;
    this.page--;
    this.load();
  }

  statusLabel(s: TicketStatus) {
    return s === 1 ? 'New' : s === 2 ? 'In Progress' : 'Resolved';
  }

  priorityLabel(p: TicketPriority) {
    return p === 1 ? 'Low' : p === 2 ? 'Medium' : 'High';
  }

  async changeStatus(t: Ticket, newStatus: TicketStatus) {
    // update UI optimista
    const oldStatus = t.status;
    t.status = newStatus;

    try {
      await firstValueFrom(
        this.ticketsApi.update(t.id, {
          title: t.title,
          description: t.description,
          priority: t.priority,
          status: newStatus,
          assignedTo: t.assignedTo ?? null
        })
      );
    } catch (err: any) {
      // rollback si falla
      t.status = oldStatus;
      this.error = err?.error?.message ?? err?.message ?? 'Error updating ticket';
    }
  }
  async changePriority(t: Ticket, newPriority: TicketPriority) {
    const oldPriority = t.priority;
    t.priority = newPriority;

    try {
      await firstValueFrom(
        this.ticketsApi.update(t.id, {
          title: t.title,
          description: t.description,
          priority: newPriority,
          status: t.status,
          assignedTo: t.assignedTo ?? null
        })
      );
    } catch (err: any) {
      t.priority = oldPriority; // rollback
      this.error = err?.error?.message ?? err?.message ?? 'Error updating priority';
    }
  }
  async remove(t: Ticket) {
    if (!confirm(`Eliminar ticket "${t.title}"?`)) return;

    // optimista: lo saco de la tabla al tiro
    const prevItems = this.items;
    this.items = this.items.filter(x => x.id !== t.id);
    this.total = Math.max(0, this.total - 1);

    try {
      await firstValueFrom(this.ticketsApi.delete(t.id));
      // opcional: recargar para mantener paginación exacta
      await this.load();
    } catch (err: any) {
      // rollback
      this.items = prevItems;
      this.total = this.total + 1;
      this.error = err?.error?.message ?? err?.message ?? 'Error deleting ticket';
    }
  }
}