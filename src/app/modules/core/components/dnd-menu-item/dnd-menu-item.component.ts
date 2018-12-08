import {
    Component, HostBinding, OnInit,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'dnd-menu-item',
    exportAs: 'dndMenuItem',
    templateUrl: './dnd-menu-item.component.pug',
    encapsulation: ViewEncapsulation.None,
})
export class DndMenuItemComponent implements OnInit {

    @HostBinding('class') defaultClass = 'dropdown-menu__list-item';

    constructor() {
    }

    ngOnInit(): void {
    }
}
