import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

type LoginRequest = { username: string; password: string };
type LoginResponse = { token: string; username: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body: LoginRequest = { username, password };
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, body).pipe(
      tap((res) => localStorage.setItem(this.tokenKey, res.token))
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }
}