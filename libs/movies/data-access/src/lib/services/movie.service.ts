import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieFilter, MovieItem } from '../models/Movie';
import { PageEntity, PageQuery } from '@stream-platform/types';
import { environment } from '@stream-platform/env';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}

  getMovies(
    myMovies: boolean,
    query: PageQuery,
    filter?: MovieFilter
  ): Observable<PageEntity<MovieItem>> {
    let params = new HttpParams()
      .set('myMovies', myMovies.toString())
      .set('page', query.page.toString())
      .set('size', query.size.toString());

    if (filter?.like) params = params.set('like', filter.like);
    if (filter?.sort) params = params.set('sort', filter.sort);
    if (filter?.genre) params = params.set('genre', filter.genre);
    if (filter?.decade) params = params.set('decade', filter.decade);

    return this.httpClient.get<PageEntity<MovieItem>>(
      `${environment.backendApiUrl}api/movies/all`,
      { params }
    );
  }

  getMyMovies(query: PageQuery, filter?: MovieFilter): Observable<PageEntity<MovieItem>> {
    let params = new HttpParams()
      .set('page', query.page.toString())
      .set('size', query.size.toString());

    if (filter?.genre) params = params.set('genre', filter.genre);
    if (filter?.decade) params = params.set('decade', filter.decade);

    return this.httpClient.get<PageEntity<MovieItem>>(
      `${environment.backendApiUrl}api/movies/my`,
      { params }
    );
  }

  addMovie(movie: MovieItem): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.backendApiUrl}api/movies/add`,
      movie
    );
  }
  addMovieForPerson(movieIds: number[]): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.backendApiUrl}api/movies/add-movie-for-person`,
      movieIds
    );
  }

  likeMovieForPerson(movieId: number): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.backendApiUrl}api/movies/like-movie-for-person`,
      movieId
    );
  }

  getMovieById(id: number): Observable<MovieItem> {
    return this.httpClient.get<MovieItem>(
      `${environment.backendApiUrl}api/movies/get-one`,
      {
        params: { movieId: id },
      }
    );
  }

  updateMovie(movie: MovieItem): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.backendApiUrl}api/movies/update`,
      movie
    );
  }

  deleteMovie(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.backendApiUrl}api/movies/delete`,
      { params: { id: id } }
    );
  }
}
