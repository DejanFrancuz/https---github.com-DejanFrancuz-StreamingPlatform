import { createReducer, on } from '@ngrx/store';
import {MovieActions, MovieActionsApi} from '../actions/movie-index.actions';
import { MovieItem } from '../../models/Movie';
import { PageEntity } from '@stream-platform/types';

export const MOVIE_FEATURE_KEY = 'movie';

export interface MovieState {
  // moviesList: MovieItem[] | null;
  moviesList: PageEntity<MovieItem>
  myMoviesResult: PageEntity<MovieItem>;
  selectedMovie: MovieItem | null;
  loading: boolean;
  error: string | null;
}

export const initialState: MovieState = {
  moviesList: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    last: true,
  },
  myMoviesResult: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    last: true,
  },
  selectedMovie: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(MovieActions.getMovies,       state => ({ ...state, loading: true, error: null })),
  on(MovieActionsApi.getMoviesSuccess, (state, action) =>
    ({ ...state, moviesList: action.moviesList, loading: false })),
  on(MovieActionsApi.getMyMoviesSuccess, (state, action) =>
    ({ ...state, myMoviesResult: action.moviesList})),
  on(MovieActionsApi.getMovieByIdSuccess, (state, action) =>
    ({ ...state, selectedMovie: action.movie, loading: false })),
  on(MovieActionsApi.getMoviesFail, (state, action) => ({ ...state, error: action.error, loading: false })),
  on(MovieActionsApi.getMyMoviesFail, (state, action) => ({ ...state, error: action.error, loading: false })),
);

