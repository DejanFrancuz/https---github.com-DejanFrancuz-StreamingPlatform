import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as MovieActions from '../actions/movie.actions';
import * as MovieSelectors from '../selectors/movie.selectors';
import { MovieItem } from '../../models/Movie';

@Injectable({ providedIn: 'root' })
export class MovieFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  selectLoaded$ = this.store.pipe(select(MovieSelectors.selectMoviesLoaded));
  selectMovies$ = this.store.pipe(select(MovieSelectors.selectgetMovies));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  getMovies(){
    this.store.dispatch(MovieActions.getMovies());
  }

  addMovie(movie: MovieItem){
    this.store.dispatch(MovieActions.addMovie({ movie }));
  }

  updateMovie(movie: MovieItem){
    this.store.dispatch(MovieActions.updateMovie({ movie }));
  }

  deleteMovie(movieId: number){
    this.store.dispatch(MovieActions.deleteMovie({ movieId }));
  }
}
