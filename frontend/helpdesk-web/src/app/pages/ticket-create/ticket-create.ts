import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Tickets, TicketPriority } from '../../services/tickets';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ticket-create.html'
})
export class TicketCreate {
  private fb = inject(FormBuilder);
  private tickets = inject(Tickets);
  private router = inject(Router);

  loading = false;
  error: string | null = null;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    priority: [2 as TicketPriority, [Validators.required]], // default Medium
    assignedTo: ['admin']
  });

  submit() {
    this.error = null;
    if (this.form.invalid) return;

    this.loading = true;

    const v = this.form.getRawValue();

    this.tickets.create({
      title: v.title!,
      description: v.description!,
      priority: v.priority!,
      assignedTo: v.assignedTo || null
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/tickets');
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.error = (err.error && err.error.message) || err.message || 'Error creating ticket';
      }
    });
  }
}