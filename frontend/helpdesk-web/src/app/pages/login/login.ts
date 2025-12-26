import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  error: string | null = null;

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  submit() {
    this.error = null;
    if (this.form.invalid) return;

    const { username, password } = this.form.getRawValue();

    this.auth.login(username!, password!).subscribe({
      next: () => this.router.navigateByUrl('/tickets'),
      error: (err: HttpErrorResponse) => {
        this.error = (err.error && err.error.message) || err.message || 'Login failed';
      }
    });
  }
}