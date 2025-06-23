import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
// import * as AuthFeature from '../auth.reducers';
import * as AuthSelectors from '../selectors/auth.selectors';
import { LoginForm } from '../../models/Login';
import { filter, map, Observable, take } from 'rxjs';

@Injectable()
export class AuthFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(AuthSelectors.selectAuthLoaded));
  selectedAuthPerson$ = this.store.pipe(select(AuthSelectors.selectAuthPerson));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init(): Observable<void>{
    console.log("tebra?");
    this.store.dispatch(AuthActions.loadPerson());

  return this.selectedAuthPerson$.pipe(
    filter((user) => !!user),
    take(1),
    map(() => undefined),
  );
  }

  login(loginForm: LoginForm){
    this.store.dispatch(AuthActions.login({loginForm: loginForm}));
  }
}
