import {
    Component, EventEmitter, HostBinding, HostListener, OnInit, Output,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'dnd-menu-item',
    exportAs: 'dndMenuItem',
    templateUrl: './dnd-menu-item.component.pug',
    encapsulation: ViewEncapsulation.None,
})
export class DndMenuItemComponent implements OnInit {

    @Output() clicked = new EventEmitter<MouseEvent>();

    @HostBinding('class') defaultClass = 'dropdown-menu__list-item';
    @HostListener('click', ['$event'])
    onClick($event) {
        console.log('Clicked in item', $event);
        this.clicked.emit($event);
    }

    constructor() {
    }

    ngOnInit(): void {
    }
}
