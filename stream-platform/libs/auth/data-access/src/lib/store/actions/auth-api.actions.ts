import { createAction, props } from '@ngrx/store';
import { Person } from '../../models/Person';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ personData: Person }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: string }>()
);

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction('[Auth] Logout Failure');


