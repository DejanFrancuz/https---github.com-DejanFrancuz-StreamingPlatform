import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  USER_FEATURE_KEY, UserState } from '../reducers/user.reducer';

// Lookup the 'User' feature state managed by NgRx
export const selectUserState =
  createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const selectgetUsers = createSelector(
  selectUserState,
  (state: UserState) => state.usersList
);

export const selectUsersLoaded = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
