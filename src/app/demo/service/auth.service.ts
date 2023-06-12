import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { User } from '../components/login/models/login.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject$ = new Subject<Partial<User>>();

  constructor(private _http: HttpClient) {}

  login(user: any): Observable<Partial<User>> {
    return this._http
      .post<Partial<User>>(`https://localhost:7121/api/auth/login`, user)
      .pipe(
        tap(user => {
          this.currentUserSubject$.next(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  get getAuthenticationToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }
}
