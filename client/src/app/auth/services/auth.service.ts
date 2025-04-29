import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login-response';
import { environment } from '../../../environments/environment';
import { User } from '../models/User';
import { Role } from '../models/role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    this.autologin();
  }

  private _user: User | undefined;

  public get user() {
    return this._user;
  }

  public get token(): string {
    return localStorage.getItem('JWT_Token') ?? '';
  }

  isLoggedIn: boolean = false;

  login(userDetails: {
    username: string;
    password: string;
  }): Observable<LoginResponse | null> {
    return this.http.post<any>(`${this._apiUrl}/signin`, userDetails).pipe(
      map((response: LoginResponse) => {
        localStorage.setItem('JWT_Token', response.token);
        this._user = {
          id: response.id,
          username: response.username,
          email: response.email,
          roles: response.roles,
          employeeId: response.employeeId,
        };
        localStorage.setItem('user', JSON.stringify(this._user));
        this.isLoggedIn = true;
        return response;
      }),
      catchError((error) => {
        console.log(error);
        this.isLoggedIn = false;
        return of(null);
      }),
    );
  }

  registration(userDetails: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this._apiUrl}/signup`, userDetails);
  }

  autologin() {
    const token = localStorage.getItem('JWT_Token');
    this._user = JSON.parse(localStorage.getItem('user') ?? '{}');
    this.isLoggedIn = !!token;
  }

  logout(): void {
    localStorage.removeItem('JWT_Token');
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  hasRole(requiredRoles: Role[]): boolean {
    if (!this.user) return false;

    return this.user.roles.some((role) => requiredRoles.includes(<Role>role));
  }

  hasMultipleRoles(requiredRoles: Role[]): boolean {
    if (!this.user) return false;

    return requiredRoles.every((role) => this.user!.roles.includes(role));
  }
}
