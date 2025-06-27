import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../../services/user.service';
import { map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserActionsApi } from '../actions/user-index.actions';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users =>
            UserActionsApi.getUsersSuccess({ usersList: users })
        ),
          catchError(error => { 
            return of(UserActionsApi.getUsersFail({ error }))
        })
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap((action) =>
        this.userService.addUser(action.user).pipe(
          map(() =>
            UserActionsApi.addUserSuccess()
        ),
          catchError(error => { 
            return of(UserActionsApi.addUserFail({ error }))
        })
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap((action) =>
        this.userService.updateUser(action.user).pipe(
          map(() =>
            UserActionsApi.updateUserSuccess()
        ),
          catchError(error => { 
            return of(UserActionsApi.updateUserFail({ error }))
        })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap((action) =>
        this.userService.deleteUser(action.userId).pipe(
          map(() =>
            UserActionsApi.deleteUserSuccess()
        ),
          catchError(error => { 
            return of(UserActionsApi.deleteUserFail({ error }))
        })
        )
      )
    )
  );

  

  constructor(private actions$: Actions, private userService: UserService, private router: Router) {}
}
