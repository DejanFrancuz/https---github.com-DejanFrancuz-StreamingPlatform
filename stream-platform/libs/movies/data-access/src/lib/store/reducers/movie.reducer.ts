import { createReducer, on } from '@ngrx/store';
import {MovieActions, MovieActionsApi} from '../actions/movie-index.actions';
import { MovieItem } from '../../models/Movie';

export const MOVIE_FEATURE_KEY = 'movie';

export interface MovieState {
  moviesList: MovieItem[] | null;
  selectedMovie: MovieItem | null;
  loading: boolean;
  error: string | null;
}

export const initialState: MovieState = {
  moviesList: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(MovieActions.getMovies,       state => ({ ...state, loading: true, error: null })),
  on(MovieActionsApi.getMoviesSuccess, (state, action) =>
    ({ ...state, moviesList: action.moviesList, loading: false })),
  on(MovieActionsApi.getMoviesFail, (state, action) => ({ ...state, error: action.error, loading: false })),
);

