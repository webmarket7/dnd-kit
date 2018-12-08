import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { ComponentPortal, Portal, PortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
    ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayConfig,
    OverlayRef, PositionStrategy
} from '@angular/cdk/overlay';
import { merge, Observable, Subscription } from 'rxjs/index';

@Directive({
    selector: '[appDropdownMenu]'
})
export class DropdownMenuDirective implements AfterViewInit, OnDestroy {

    private _portal: TemplatePortal;
    private _overlayRef: OverlayRef | null = null;
    private _menuOpen = false;
    private _closeSubscription = Subscription.EMPTY;
    private _menuCloseSubscription = Subscription.EMPTY;
    private _menu: any;

    @Input('appDropdownMenu')
    get menu() {
        return this._menu;
    }

    set menu(menu: any) {
        if (menu === this._menu) {
            return;
        }

        this._menu = menu;
        this._menuCloseSubscription.unsubscribe();

        if (menu) {
            this._menuCloseSubscription = menu.closed
                .asObservable()
                .subscribe(reason => {
                    this._destroyMenu();
                });
        }
    }

    @HostListener('click', ['$event.target'])
    onClick(btn: HTMLBaseElement) {
        this.toggleMenu();
    }

    constructor(private elRef: ElementRef,
                private _viewContainerRef: ViewContainerRef,
                private _overlay: Overlay) {
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
        this._cleanUpSubscriptions();
    }

    private _getPortal(): TemplatePortal {
        if (!this._portal || this._portal.templateRef !== this.menu.templateRef) {
            this._portal = new TemplatePortal(this.menu.templateRef, this._viewContainerRef);
        }

        return this._portal;
    }

    private _getPositionStrategy(): PositionStrategy {
        const defaultPosition = {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
        } as ConnectedPosition;

        return this._overlay.position()
            .flexibleConnectedTo(this.elRef)
            .withPositions([defaultPosition]);
    }

    private _getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this._getPositionStrategy()
        });
    }

    private _subscribeToPositions(position: FlexibleConnectedPositionStrategy): void {
        // if (this.menu.setPositionClasses) {
        //     position.positionChanges.subscribe(change => {
        //         const posX: MenuPositionX = change.connectionPair.overlayX === 'start' ? 'after' : 'before';
        //         const posY: MenuPositionY = change.connectionPair.overlayY === 'top' ? 'below' : 'above';
        //
        //         this.menu.setPositionClasses!(posX, posY);
        //     });
        // }
    }

    private _createOverlay(): OverlayRef {
        if (!this._overlayRef) {
            const config = this._getOverlayConfig();
            this._subscribeToPositions(config.positionStrategy as FlexibleConnectedPositionStrategy);
            this._overlayRef = this._overlay.create(config);

            this._overlayRef.keydownEvents().subscribe();
        }

        return this._overlayRef;
    }

    private _menuClosingActions(): Observable<any> {
        if (this._overlayRef) {
            const backdrop = this._overlayRef.backdropClick();
            const detachments = this._overlayRef.detachments();

            return merge(backdrop, detachments);
        }
    }

    private _cleanUpSubscriptions(): void {
        this._closeSubscription.unsubscribe();
        this._menuCloseSubscription.unsubscribe();
    }

    toggleMenu(): void {
        return this._menuOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu(): void {
        if (this._menuOpen) {
            return;
        }

        const overlayRef = this._createOverlay();

        overlayRef.attach(this._getPortal());

        this._closeSubscription = this._menuClosingActions()
            .subscribe(() => this.closeMenu());

        this._menuOpen = true;
    }

    closeMenu(): void {
        this.menu.closed.emit();
    }

    private _destroyMenu() {
        if (!this._overlayRef || !this._menuOpen) {
            return;
        }

        this._closeSubscription.unsubscribe();
        this._menuCloseSubscription.unsubscribe();
        this._overlayRef.detach();
        this._menuOpen = false;
    }
}
