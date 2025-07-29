import { createAction, props } from '@ngrx/store';
import { MovieItem } from '../../models/Movie';

// export const initMovie = createAction('[Movie] Init');

export const getMovies = createAction('[Movie] Get Movies');

export const getMovieById = createAction('[Movie] Get Movie by Id', props<{ movieId: number }>());

export const updateMovie = createAction('[Movie] Update Movie',  props<{ movie: MovieItem }>());

export const addMovie = createAction('[Movie] Add Movie',  props<{ movie: MovieItem }>());

export const deleteMovie = createAction('[Movie] Delete Movie',  props<{ movieId: number }>());
