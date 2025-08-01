import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as MovieActions from '../actions/movie.actions';
import * as MovieSelectors from '../selectors/movie.selectors';
import { MovieItem } from '../../models/Movie';
import { PageQuery } from '@stream-platform/types';

@Injectable({ providedIn: 'root' })
export class MovieFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  selectLoaded$ = this.store.pipe(select(MovieSelectors.selectMoviesLoaded));
  selectMovies$ = this.store.pipe(select(MovieSelectors.selectAllMovies));
  selectMyMovies$ = this.store.pipe(select(MovieSelectors.selectMyMovies));
  selectMovie$ = this.store.pipe(select(MovieSelectors.selectSelectedMovie));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  getMovies(pageQuery: PageQuery){
    this.store.dispatch(MovieActions.getMovies({pageQuery}));
  }
  getMyMovies(pageQuery: PageQuery){
    this.store.dispatch(MovieActions.getMyMovies({pageQuery}));
  }

  getMovieById(movieId: number){
    this.store.dispatch(MovieActions.getMovieById({movieId}));
  }

  addMovie(movie: MovieItem){
    this.store.dispatch(MovieActions.addMovie({ movie }));
  }

  addMovieForPerson(movieId: number){
    this.store.dispatch(MovieActions.addMovieForPerson({ movieId }));
  }

  updateMovie(movie: MovieItem){
    this.store.dispatch(MovieActions.updateMovie({ movie }));
  }

  deleteMovie(movieId: number){
    this.store.dispatch(MovieActions.deleteMovie({ movieId }));
  }
}
