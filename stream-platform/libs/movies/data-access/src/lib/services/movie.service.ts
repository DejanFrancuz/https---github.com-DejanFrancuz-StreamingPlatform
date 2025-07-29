import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieItem } from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  getMovies(): Observable<MovieItem[]> {
    return this.httpClient.get<MovieItem[]>('http://localhost:8080/api/movies/all');
  }
  addMovie(movie: MovieItem): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:8080/api/movies/add', movie);
  }
  getMoiveById(id: number): Observable<MovieItem> {
    return this.httpClient.get<MovieItem>('http://localhost:8080/api/movies/get-one', {
      params: { movieId: id },
    });
  }

  updateMovie(movie: MovieItem): Observable<any> {
    console.log(movie);
    return this.httpClient
      .put<any>('http://localhost:8080/api/movie//update', movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      'http://localhost:8080/api/movies/delete',
      { params: { id: id } }
    );
  }
}
