import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DndCarouselComponent } from './components/dnd-carousel/dnd-carousel.component';
import { RangeDirective } from './directives/range.directive';
import { LetDirective } from './directives/let.directive';
import { CarouselDirective } from './directives/carousel.directive';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [
        DndCarouselComponent,

        RangeDirective,
        LetDirective,
        CarouselDirective,
    ],
    exports: [
        MatButtonModule,
        MatIconModule,

        DndCarouselComponent,

        RangeDirective,
        LetDirective,
        CarouselDirective
    ]
})
export class CoreModule {
}
