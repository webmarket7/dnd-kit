import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DndCarouselComponent } from './components/dnd-carousel/dnd-carousel.component';
import { RangeDirective } from './directives/range.directive';
import { LetDirective } from './directives/let.directive';
import { CarouselDirective } from './directives/carousel.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppHeaderComponent } from './components/app-header/app-header.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        OverlayModule,
        AngularFontAwesomeModule
    ],
    declarations: [
        DndCarouselComponent,
        AppHeaderComponent,

        RangeDirective,
        LetDirective,
        CarouselDirective
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        OverlayModule,
        AngularFontAwesomeModule,

        AppHeaderComponent,
        DndCarouselComponent,

        RangeDirective,
        LetDirective,
        CarouselDirective
    ]
})
export class CoreModule {
}
