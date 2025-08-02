import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MovieActions from '../actions/movie.actions';
import { MovieService } from '../../services/movie.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MovieActionsApi } from '../actions/movie-index.actions';
import { Router } from '@angular/router';
import { getMovieById } from '../actions/movie.actions';
import { ToastrService } from 'ngx-toastr';

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
            this.toastrService.error("Get All Movies failed. \n ", error)
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
            this.toastrService.error("Get My Movies failed. \n ", error)
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
            this.toastrService.error("Get Movie by Id failed. \n ", error)
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
          map(() => {
            this.toastrService.success("Movie added successfully.");
           return  MovieActionsApi.addMovieSuccess()

          }
        ),
          catchError(error => {
            this.toastrService.error("Add Movie failed. \n ", error)
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
          map(() => {
            this.toastrService.success("Movie for Person added successfully.");
            return MovieActionsApi.addMovieForPersonSuccess()
          }
        ),
          catchError(error => {
            this.toastrService.error("Add Movie for Person failed. \n ", error)
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
          map(() =>{
            this.toastrService.success("Movie updated successfully")
            return MovieActionsApi.updateMovieSuccess()
          }
        ),
          catchError(error => {
            this.toastrService.error("Movie update failed. \n ", error)
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
          map(() => {
            this.toastrService.success("Movie deleted successfully")
            return MovieActionsApi.deleteMovieSuccess()

          }
        ),
          catchError(error => {
            this.toastrService.error("Movie delete failed. \n ", error)
            return of(MovieActionsApi.deleteMovieFail({ error }))
        })
        )
      )
    )
  );

  constructor(private actions$: Actions, private movieService: MovieService, private toastrService: ToastrService, private router: Router) {}
}
