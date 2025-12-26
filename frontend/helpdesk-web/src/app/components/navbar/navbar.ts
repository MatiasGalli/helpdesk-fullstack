import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html'
})
export class Navbar {
  private auth = inject(Auth);
  private router = inject(Router);

  get loggedIn() {
    return this.auth.isLoggedIn;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}