import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActionsApi } from '../actions/auth-index.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(action =>
        this.authService.login({ username: action.loginForm.username, password: action.loginForm.password }).pipe(
          map(personData => AuthActionsApi.loginSuccess({ personData })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
