import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MovieActions from '../actions/movie.actions';
import { MovieService } from '../../services/movie.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovieActionsApi } from '../actions/movie-index.actions';
import { Router } from '@angular/router';
import { getMovieById } from '../actions/movie.actions';

@Injectable()
export class MovieEffects {
  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getMovies),
      switchMap((action) =>
        this.movieService.getMovies(action.pageQuery).pipe(
          map(movies =>
            MovieActionsApi.getMoviesSuccess({ moviesList: movies })
        ),
          catchError(error => {
            return of(MovieActionsApi.getMoviesFail({ error }))
        })
        )
      )
    )
  );

  getMyMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getMyMovies),
      switchMap((action) =>
        this.movieService.getMyMovies(action.pageQuery).pipe(
          map(movies =>
            MovieActionsApi.getMyMoviesSuccess({ moviesList: movies })
        ),
          catchError(error => {
            return of(MovieActionsApi.getMoviesFail({ error }))
        })
        )
      )
    )
  );

  getMovieById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getMovieById),
      switchMap((action) =>
        this.movieService.getMovieById(action.movieId).pipe(
          map(movie =>
            MovieActionsApi.getMovieByIdSuccess({ movie })
        ),
          catchError(error => {
            return of(MovieActionsApi.getMovieByIdFail({ error }))
        })
        )
      )
    )
  );

  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.addMovie),
      switchMap((action) =>
        this.movieService.addMovie(action.movie).pipe(
          map(() =>
            MovieActionsApi.addMovieSuccess()
        ),
          catchError(error => {
            return of(MovieActionsApi.addMovieFail({ error }))
        })
        )
      )
    )
  );

  addMovieForPerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.addMovieForPerson),
      switchMap((action) =>
        this.movieService.addMovieForPerson(action.movieId).pipe(
          map(() =>
            MovieActionsApi.addMovieForPersonSuccess()
        ),
          catchError(error => {
            return of(MovieActionsApi.addMovieForPersonFail({ error }))
        })
        )
      )
    )
  );

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.updateMovie),
      switchMap((action) =>
        this.movieService.updateMovie(action.movie).pipe(
          map(() =>
            MovieActionsApi.updateMovieSuccess()
        ),
          catchError(error => {
            return of(MovieActionsApi.updateMovieFail({ error }))
        })
        )
      )
    )
  );

  deleteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.deleteMovie),
      switchMap((action) =>
        this.movieService.deleteMovie(action.movieId).pipe(
          map(() =>
            MovieActionsApi.deleteMovieSuccess()
        ),
          catchError(error => {
            return of(MovieActionsApi.deleteMovieFail({ error }))
        })
        )
      )
    )
  );

  constructor(private actions$: Actions, private movieService: MovieService, private router: Router) {}
}
