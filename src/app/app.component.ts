import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { AppState } from './reducers/index';
import { CheckAuthState, LogOut, SignIn } from './modules/auth/store/auth.actions';
import { isLoggedIn } from './modules/auth/store/auth.selectors';
import { Observable } from 'rxjs/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isLoggedIn$: Observable<boolean>;

    constructor(
        private store: Store<AppState>
    ) {
        this.isLoggedIn$ = this.store.pipe(
            select(isLoggedIn)
        );
    }

    ngOnInit() {
        this.store.dispatch(new CheckAuthState());
    }
}
