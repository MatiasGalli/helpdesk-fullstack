import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { TicketDetail } from './pages/ticket-detail/ticket-detail';
import { Login } from './pages/login/login';
import { TicketsList } from './pages/tickets-list/tickets-list';
import { TicketCreate } from './pages/ticket-create/ticket-create';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'tickets', component: TicketsList, canActivate: [authGuard] },
  { path: 'tickets/new', component: TicketCreate, canActivate: [authGuard] },
  { path: 'tickets/:id', component: TicketDetail, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'tickets' },
  { path: '**', redirectTo: 'tickets' }
];