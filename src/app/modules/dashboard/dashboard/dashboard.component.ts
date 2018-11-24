import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.pug',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    isOpen: boolean;

    constructor() {
        this.isOpen = false;
    }

    ngOnInit() {
    }

}
