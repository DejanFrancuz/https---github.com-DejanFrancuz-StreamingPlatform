import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MovieActions from '../actions/movie.actions';
import { MovieService } from '../../services/movie.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovieActionsApi } from '../actions/movie-index.actions';
import { Router } from '@angular/router';

@Injectable()
export class MovieEffects {
  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getMovies),
      switchMap(() =>
        this.movieService.getMovies().pipe(
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
