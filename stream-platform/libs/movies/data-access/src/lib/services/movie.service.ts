import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieItem } from '../models/Movie';
import { PageEntity, PageQuery } from '@stream-platform/types';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  getMovies(query: PageQuery): Observable<PageEntity<MovieItem>> {
    const params = new HttpParams({ fromObject: {
    page: query.page.toString(),
    size: query.size.toString(),
    // ...(query.sort ? { sort: query.sort } : {})
  }});
    return this.httpClient.get<PageEntity<MovieItem>>('http://localhost:8080/api/movies/all', { params });
  }

  getMyMovies(query: PageQuery): Observable<PageEntity<MovieItem>>{
    const params = new HttpParams({ fromObject: {
    page: query.page.toString(),
    size: query.size.toString(),
    // ...(query.sort ? { sort: query.sort } : {})
  }});
    return this.httpClient.get<PageEntity<MovieItem>>('http://localhost:8080/api/movies/my', { params });
  }

  addMovie(movie: MovieItem): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:8080/api/movies/add', movie);
  }
  addMovieForPerson(movieId: number): Observable<any> {
    return this.httpClient
      .post<any>('http://localhost:8080/api/movies/add-movie-for-person', movieId);
  }
  getMovieById(id: number): Observable<MovieItem> {
    return this.httpClient.get<MovieItem>('http://localhost:8080/api/movies/get-one', {
      params: { movieId: id },
    });
  }

  updateMovie(movie: MovieItem): Observable<any> {
    console.log(movie);
    return this.httpClient
      .put<any>('http://localhost:8080/api/movies/update', movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      'http://localhost:8080/api/movies/delete',
      { params: { id: id } }
    );
  }
}
