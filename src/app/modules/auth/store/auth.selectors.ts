import { createSelector } from '@ngrx/store';

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => {
        return auth.authenticated;
    }
);

export const selectUser = createSelector(
    selectAuthState,
    auth => {
        return auth.user;
    }
);

