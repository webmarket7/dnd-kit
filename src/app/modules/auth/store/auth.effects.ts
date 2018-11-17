import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthActionTypes, SignInRequested, SignUpRequested } from './auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private afAuth: AngularFireAuth
    ) {}

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType<SignUpRequested>(AuthActionTypes.SignUpRequested),
        map((action: SignUpRequested) => {
            console.log('Action payload', action.payload);

            return action.payload;
        }),
        switchMap((authData: {username: string, password: string}) => {
            return from(this.afAuth.auth.createUserWithEmailAndPassword(authData.username, authData.password));
        }),
        map((response: any) => {
            console.log('Response', response);

            this.router.navigate(['/']);

            return {type: AuthActionTypes.SignUp};
        })
    );

    @Effect()
    authSignIn = this.actions$
        .pipe(
            ofType<SignInRequested>(AuthActionTypes.SignInRequested),
            map((action: SignInRequested) =>  {
                return action.payload;
            }),
            switchMap((authData: {username: string, password: string}) => {
                return from(this.afAuth.auth.signInWithEmailAndPassword(authData.username, authData.password));
            }),
            map(() => {
                this.router.navigate(['/']);

                return {type: AuthActionTypes.SignIn};
            })
        );

    @Effect()
    authStateCheck = this.actions$
        .pipe(
            ofType<SignInRequested>(AuthActionTypes.CheckAuthState),
            switchMap(() => {
                return this.afAuth.authState;
            }),
            map((authState) => {
                if (authState) {
                    return {type: AuthActionTypes.SignIn};
                } else {
                    return {type: AuthActionTypes.LogOut};
                }
            })
        );


    @Effect()
    authLogout = this.actions$
        .pipe(
            ofType<SignInRequested>(AuthActionTypes.LogOutRequested),
            map(() => {
                this.router.navigate(['auth/sign-in']);
                this.afAuth.auth.signOut();

                return {type: AuthActionTypes.LogOut};
            })
        );
}
