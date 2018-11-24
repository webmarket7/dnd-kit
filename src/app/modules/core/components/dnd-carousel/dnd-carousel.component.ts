import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dnd-carousel',
    templateUrl: './dnd-carousel.component.pug',
    styleUrls: ['./dnd-carousel.component.scss']
})
export class DndCarouselComponent implements OnInit {

    images = [
        {
            url: '/assets/img/1.png',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit`
        },
        {
            url: '/assets/img/2.png',
            description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`
        },
        {
            url: '/assets/img/3.png',
            description: `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.`
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
