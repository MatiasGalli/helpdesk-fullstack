import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export type TicketPriority = 1 | 2 | 3; // Low, Medium, High
export type TicketStatus = 1 | 2 | 3;   // New, InProgress, Resolved

export type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAtUtc: string;
  assignedTo?: string | null;
};

export type PagedResponse<T> = {
  page: number;
  pageSize: number;
  total: number;
  items: T[];
};

export type CreateTicketRequest = {
  title: string;
  description: string;
  priority: TicketPriority;
  assignedTo?: string | null;
};

@Injectable({ providedIn: 'root' })
export class Tickets {
  constructor(private http: HttpClient) { }

  list(opts: {
    page: number;
    pageSize: number;
    status?: TicketStatus | null;
    priority?: TicketPriority | null;
  }): Observable<PagedResponse<Ticket>> {
    let params = new HttpParams()
      .set('page', opts.page)
      .set('pageSize', opts.pageSize);

    if (opts.status) params = params.set('status', opts.status);
    if (opts.priority) params = params.set('priority', opts.priority);

    return this.http.get<PagedResponse<Ticket>>(`${environment.apiUrl}/api/tickets`, { params });
  }

  create(body: CreateTicketRequest): Observable<Ticket> {
    return this.http.post<Ticket>(`${environment.apiUrl}/api/tickets`, body);
  }

  update(id: string, body: {
    title: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    assignedTo?: string | null;
  }): Observable<Ticket> {
    return this.http.put<Ticket>(`${environment.apiUrl}/api/tickets/${id}`, body);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/tickets/${id}`);
  }

  getById(id: string) {
  return this.http.get<Ticket>(`${environment.apiUrl}/api/tickets/${id}`);
}
}