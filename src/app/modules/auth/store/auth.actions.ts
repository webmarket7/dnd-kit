import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    SignUpRequested = '[Sign Up Screen] Sign Up Requested',
    SignUp = '[Authorization Effect] Sign User Up',
    SignInRequested = '[Sign In Screen] Sign In Requested',
    SignIn = '[Authorization Effect] Sign User In',
    LogOutRequested = '[Account Menu] Log Out Requested',
    LogOut = '[Authorization Effect] Log User Out',
    CheckAuthState = '[Application Wide] Check If User Is Authenticated'
}

export class SignUpRequested implements Action {
    readonly type = AuthActionTypes.SignUpRequested;

    constructor(public payload: {
        username: string,
        password: string
    }) {}
}

export class SignUp implements Action {
    readonly type = AuthActionTypes.SignUp;
}

export class SignInRequested implements Action {
    readonly type = AuthActionTypes.SignInRequested;

    constructor(public payload: {
        username: string,
        password: string
    }) {}
}

export class SignIn implements Action {
    readonly type = AuthActionTypes.SignIn;
}

export class LogOutRequested implements Action {
    readonly type = AuthActionTypes.LogOutRequested;
}

export class LogOut implements Action {
    readonly type = AuthActionTypes.LogOut;
}

export class CheckAuthState implements Action {
    readonly type = AuthActionTypes.CheckAuthState;
}

export type AuthActions = SignUpRequested | SignUp | SignInRequested | SignIn | LogOutRequested | LogOut | CheckAuthState;
