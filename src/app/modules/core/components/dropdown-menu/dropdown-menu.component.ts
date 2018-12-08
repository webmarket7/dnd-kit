import {
    Component, EventEmitter, InjectionToken, OnDestroy, OnInit, Output, TemplateRef,
    ViewChild, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

const DROPDOWN_MENU_PANEL = new InjectionToken<any>('DROPDOWN_MENU_PANEL');

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.pug',
    styleUrls: ['./dropdown-menu.component.scss'],
    exportAs: 'dropdownMenuComponent',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: DROPDOWN_MENU_PANEL, useExisting: DropdownMenuComponent}
    ]
})
export class DropdownMenuComponent implements OnInit, OnDestroy {

    @Output() readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab'> =
        new EventEmitter<void | 'click' | 'keydown' | 'tab'>();

    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.closed.complete();
    }
}
