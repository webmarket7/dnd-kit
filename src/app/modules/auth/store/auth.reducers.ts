import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
    authenticated: boolean;
}

const initialState: AuthState = {
    authenticated: null
};

export function authReducer(state: AuthState = initialState, action: AuthActions) {

    switch (action.type) {

        case AuthActionTypes.SignUp:
            return {
                ...state,
                authenticated: true
            };

        case AuthActionTypes.SignIn:
            return {
                ...state,
                authenticated: true
            };

        case AuthActionTypes.LogOut:
            return {
                ...state,
                authenticated: false
            };

        default:
            return state;
    }
}
