import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  MOVIE_FEATURE_KEY, MovieState } from '../reducers/movie.reducer';

// Lookup the 'Movie' feature state managed by NgRx
export const selectMovieState =
  createFeatureSelector<MovieState>(MOVIE_FEATURE_KEY);

export const selectgetMovies = createSelector(
  selectMovieState,
  (state: MovieState) => state.moviesList
);

export const selectMoviesLoaded = createSelector(
  selectMovieState,
  (state: MovieState) => state.loading
);

export const selectMovieError = createSelector(
  selectMovieState,
  (state: MovieState) => state.error
);
