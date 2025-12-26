import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

export type LoginResponse = { token: string; username: string };

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, { username, password })
      .pipe(tap((res) => localStorage.setItem(this.tokenKey, res.token)));
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}