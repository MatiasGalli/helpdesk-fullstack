import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Tickets, Ticket } from '../../services/tickets';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-detail.html'
})
export class TicketDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private ticketsApi = inject(Tickets);
  private cd = inject(ChangeDetectorRef);

  loading = false;
  error: string | null = null;
  ticket: Ticket | null = null;

  ngOnInit() {
    // importante: setTimeout para que Angular esté listo
    setTimeout(() => {
      void this.load();
    }, 0);
  }

  async load() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Missing ticket id';
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      this.ticket = await firstValueFrom(this.ticketsApi.getById(id));
    } catch (err: any) {
      this.error = err?.error?.message ?? err?.message ?? 'Error loading ticket';
    } finally {
      this.loading = false;
      this.cd.detectChanges(); // 🔥 CLAVE
    }
  }

  statusLabel(s: number) {
    return s === 1 ? 'New' : s === 2 ? 'In Progress' : 'Resolved';
  }

  priorityLabel(p: number) {
    return p === 1 ? 'Low' : p === 2 ? 'Medium' : 'High';
  }
}