import { Injectable } from '@angular/core';
import { LoginForm } from '../models/Login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { environment } from '@stream-platform/env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  // poziv login-a i prihvatanje podataka o osobi
  login(req: LoginForm): Observable<Person> {
    return this.httpClient.post<Person>(
      `${environment.backendApiUrl}auth/login`,
      req
    );
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>(`${environment.backendApiUrl}auth/logout`, {});
  }

  getPersonData(): Observable<Person> {
    return this.httpClient.get<Person>(
      `${environment.backendApiUrl}auth/get-person`,
    );
  }
}
