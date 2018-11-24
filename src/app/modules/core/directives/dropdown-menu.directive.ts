import { AfterViewInit, Directive, ElementRef, HostListener, Input, ViewContainerRef } from '@angular/core';
import { PortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { ConnectedPosition, Overlay, OverlayConfig } from '@angular/cdk/overlay';

@Directive({
    selector: '[appDropdownMenu]'
})
export class DropdownMenuDirective implements AfterViewInit {

    @Input('appDropdownMenu') componentRef: any;

    overlayRef: PortalOutlet;
    dropdownMenuPortal: TemplatePortal<any>;

    @HostListener('click', ['$event.target'])
    onClick(btn: HTMLBaseElement) {
        console.log('Component Ref', this.componentRef);

        const defaultPosition = {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
        } as ConnectedPosition;

        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this.elRef)
            .withPositions([defaultPosition]);

        const overlayConfig = new OverlayConfig({
            positionStrategy
        });

        this.overlayRef = this.overlay.create(overlayConfig);
        this.dropdownMenuPortal = new TemplatePortal(this.componentRef, this.viewContainerRef);
        const componentRef = this.overlayRef.attach(this.dropdownMenuPortal);
    }

    constructor(
        private elRef: ElementRef,
        private viewContainerRef: ViewContainerRef,
        private overlay: Overlay
    ) {}

    ngAfterViewInit(): void {
    }
}
