import {
    Component, EventEmitter, InjectionToken, OnDestroy, OnInit, Output, TemplateRef,
    ViewChild, ViewEncapsulation, ChangeDetectionStrategy, QueryList, ContentChildren, AfterContentInit
} from '@angular/core';
import { DndMenuItemComponent } from '../dnd-menu-item/dnd-menu-item.component';


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
export class DropdownMenuComponent implements OnInit, OnDestroy, AfterContentInit {


    @Output() readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab'> =
        new EventEmitter<void | 'click' | 'keydown' | 'tab'>();

    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    @ContentChildren(DndMenuItemComponent) items: QueryList<DndMenuItemComponent>;

    constructor() {}

    ngOnInit() {
        console.log('Initialized');
    }

    ngOnDestroy() {
        this.closed.complete();
        this.items.map((item: DndMenuItemComponent) => {
            item.clicked.unsubscribe();
        });
        console.log('Destroyed');
    }

    ngAfterContentInit() {
        console.log('Content initialized', this.closed);
        this.items.map((item: DndMenuItemComponent) => {
            item.clicked.subscribe(($event) => {
                console.log('Closed in menu', $event);
                this.closed.emit('click');
            });
        });
    }
}
