import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/api/users/all');
  }
  addUser(user: User): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:8080/api/users/add', user);
  }
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>('http://localhost:8080/api/users/getone', {
      params: { id: id },
    });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(
      'http://localhost:8080/api/users/get-user-by-email',
      { params: { email: email } }
    );
  }

  updateUser(user: User): Observable<any> {
    console.log(user);
    return this.httpClient
      .put<any>('http://localhost:8080/api/users/getone/update', user);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      'http://localhost:8080/api/users/delete',
      { params: { id: id } }
    );
  }
}
