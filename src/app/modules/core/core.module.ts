import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DndCarouselComponent } from './components/dnd-carousel/dnd-carousel.component';
import { RangeDirective } from './directives/range.directive';
import { LetDirective } from './directives/let.directive';
import { CarouselDirective } from './directives/carousel.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { DropdownMenuDirective } from './directives/dropdown-menu.directive';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DndMenuItemComponent } from './components/dnd-menu-item/dnd-menu-item.component';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        OverlayModule,
        PortalModule,
        AngularFontAwesomeModule
    ],
    declarations: [
        DndCarouselComponent,
        AppHeaderComponent,
        DropdownMenuComponent,

        RangeDirective,
        LetDirective,
        CarouselDirective,
        DropdownMenuDirective,
        DndMenuItemComponent
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        OverlayModule,
        AngularFontAwesomeModule,

        AppHeaderComponent,
        DndCarouselComponent,
        DropdownMenuComponent,
        DndMenuItemComponent,

        RangeDirective,
        LetDirective,
        CarouselDirective,
        DropdownMenuDirective,
    ]
})
export class CoreModule {
}
