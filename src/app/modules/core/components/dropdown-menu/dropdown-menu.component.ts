import {
    Component, EventEmitter, InjectionToken, OnDestroy, OnInit, Output, TemplateRef,
    ViewChild, ViewEncapsulation, ChangeDetectionStrategy, QueryList, ContentChildren, AfterContentInit, HostListener,
    ElementRef, AfterViewInit
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
export class DropdownMenuComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {


    @Output() readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab'> =
        new EventEmitter<void | 'click' | 'keydown' | 'tab'>();

    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    @ContentChildren(DndMenuItemComponent) items: QueryList<DndMenuItemComponent>;

    @HostListener('click', ['$event'])
    onClick($event) {
        this.closed.emit('click');
    }

    constructor(private elRef: ElementRef) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.closed.complete();
    }

    ngAfterContentInit() {
        this.items.changes.subscribe((changes) => {
            console.log(changes);
        });
        console.log('Content Children', this.items);
    }
}
