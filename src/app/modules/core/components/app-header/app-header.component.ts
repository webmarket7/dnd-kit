import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { Observable } from 'rxjs/index';
import { selectUser } from '../../../auth/store/auth.selectors';
import { LogOutRequested } from '../../../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.pug',
    styleUrls: ['./app-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppHeaderComponent implements OnInit {

    isOpen: boolean;
    user$: Observable<any>;

    constructor(
        private store: Store<AppState>
    ) {
        this.isOpen = false;
    }

    ngOnInit() {
        this.user$ = this.store.pipe(
            select(selectUser)
        );
    }

    onOpenProfile($event: MouseEvent) {
        this.isOpen = false;
    }

    onOpenSettings($event: MouseEvent) {
        this.isOpen = false;
    }

    onLogout($event: MouseEvent) {
        $event.stopPropagation();

        this.store.dispatch(new LogOutRequested());
        this.isOpen = false;
    }
}
