import { AfterViewInit, Directive, HostBinding, Injector, Input, OnDestroy } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive({
    selector: '[controlStatus]'
})
export class ControlStatusDirective implements AfterViewInit, OnDestroy {

    @Input() controlStatus: Injector;

    statusSubscription: Subscription;

    @HostBinding('class.valid') valid: boolean;
    @HostBinding('class.invalid') invalid: boolean;
    @HostBinding('class.shake') shake: boolean;

    constructor() {}

    ngAfterViewInit() {
        if (this.controlStatus) {
            const ngControl: NgControl = this.controlStatus.get(NgControl, null);

            if (ngControl) {
                const control = ngControl.control as FormControl;

                this.statusSubscription = control.statusChanges
                    .pipe(
                        distinctUntilChanged()
                    )
                    .subscribe((status: any) => {
                        this.valid = status === 'VALID';
                        this.invalid = status === 'INVALID';
                        this.shake = status === 'INVALID';
                    });
            }
        } else {
            console.error('Could not find parent component in controlStatus directive');
        }
    }

    ngOnDestroy() {
        if (this.statusSubscription) {
            this.statusSubscription.unsubscribe();
        }
    }
}
