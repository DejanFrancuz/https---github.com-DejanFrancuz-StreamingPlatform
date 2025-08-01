import { createAction, props } from '@ngrx/store';
import { MovieItem } from '../../models/Movie';
import { PageQuery } from '@stream-platform/types';

// export const initMovie = createAction('[Movie] Init');

export const getMovies = createAction('[Movie] Get Movies',  props<{ pageQuery: PageQuery}>());

export const getMyMovies = createAction('[Movie] Get MyMovies', props<{ pageQuery: PageQuery}>());

export const getMovieById = createAction('[Movie] Get Movie by Id', props<{ movieId: number }>());

export const updateMovie = createAction('[Movie] Update Movie',  props<{ movie: MovieItem }>());

export const addMovie = createAction('[Movie] Add Movie',  props<{ movie: MovieItem }>());

export const addMovieForPerson = createAction('[Movie] Add Movie For Person',  props<{ movieId: number }>());

export const deleteMovie = createAction('[Movie] Delete Movie',  props<{ movieId: number }>());
