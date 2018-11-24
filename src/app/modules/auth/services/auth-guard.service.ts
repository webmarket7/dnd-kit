import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { Observable } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import { isLoggedIn } from '../store/auth.selectors';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

    constructor(
        private store: Store<AppState>
    ) {}

    canActivate(): Observable<boolean> {

        return this.store
            .pipe(
                select(isLoggedIn),
                skipWhile((authenticated) => {
                    return authenticated === null;
                }),
                take(1)
            );
    }
}
