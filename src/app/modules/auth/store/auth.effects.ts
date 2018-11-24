import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import {
    AuthActionTypes, CheckAuthState, LogOut, LogOutRequested, SignIn, SignInRequested, SignUp,
    SignUpRequested
} from './auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private afAuth: AngularFireAuth
    ) {}

    @Effect()
    signUpRequested$ = this.actions$.pipe(
        ofType<SignUpRequested>(AuthActionTypes.SignUpRequested),
        map((action: SignUpRequested) => {

            return action.payload;
        }),
        switchMap((authData: {displayName: string, username: string, password: string}) => {

            return from(this.afAuth.auth.createUserWithEmailAndPassword(authData.username, authData.password)).pipe(
                switchMap((response) => {

                    return from(response.user.updateProfile({
                        displayName: authData.displayName,
                        photoURL: null
                    }));
                })
            );
        }),
        map((response: any) => {
            this.router.navigate(['/']);

            return new SignUp();
        })
    );

    @Effect()
    signInRequested$ = this.actions$
        .pipe(
            ofType<SignInRequested>(AuthActionTypes.SignInRequested),
            map((action: SignInRequested) =>  {

                return action.payload;
            }),
            switchMap((authData: {username: string, password: string}) => {

                return from(this.afAuth.auth.signInWithEmailAndPassword(authData.username, authData.password));
            }),
            map((response: any) => {
                this.router.navigate(['/']);

                return new SignIn({user: response});
            })
        );

    @Effect()
    checkAuthState$ = this.actions$
        .pipe(
            ofType<CheckAuthState>(AuthActionTypes.CheckAuthState),
            switchMap(() => {

                return this.afAuth.authState;
            }),
            map((authState) => {
                if (authState) {

                    return new SignIn({user: authState});
                } else {
                    return new LogOut();
                }
            })
        );


    @Effect()
    logOutRequested$ = this.actions$
        .pipe(
            ofType<LogOutRequested>(AuthActionTypes.LogOutRequested),
            map(() => {
                this.afAuth.auth.signOut();

                return new LogOut();
            })
        );

    @Effect({dispatch: false})
    logOut$ = this.actions$
        .pipe(
            ofType<LogOut>(AuthActionTypes.LogOut),
            tap(() => {
                this.router.navigate(['sign-in']);
            })
        );
}
