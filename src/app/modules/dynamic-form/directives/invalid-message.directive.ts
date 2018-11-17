import { Directive, ElementRef, Input, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription, merge, of } from 'rxjs';
import { switchMap, take, filter, map } from 'rxjs/operators';

@Directive({
    selector: '[invalidMessage]'
})
export class InvalidMessageDirective implements OnInit, OnDestroy {

    @Input() invalidMessage: string;
    @Input() groupName?: string;

    control: AbstractControl;
    control$: Observable<any>;
    controlSubscription: Subscription;
    wasSubmitted: boolean;

    constructor(
        private _fg: ControlContainer,
        private _el: ElementRef,
        private render: Renderer2
    ) { }

    ngOnInit() {
        this.control$ = of(this.form.get(this.invalidMessage.toString())).pipe(
            filter((control: AbstractControl) => {

                return !!control;
            }),
            take(1),
            switchMap((control: AbstractControl) => {
                const formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit.pipe(
                    map(() => this.wasSubmitted = true)
                );

                this.control = control;

                return merge(this.control.valueChanges, of(''), formSubmit$);
            }));

        this.controlSubscription = this.control$
            .subscribe((value) => {
                this.setVisible();
            });
    }

    private setVisible() {
        if (this.control.invalid && (this.control.dirty || this.control.touched || this.wasSubmitted)) {
            this.render.removeStyle(this._el.nativeElement, 'display');
        } else {
            this.render.setStyle(this._el.nativeElement, 'display', 'none');
        }
    }

    match(error: string) {
        if (this.control && this.control.errors) {

            if (Object.keys(this.control.errors).indexOf(error) > -1) {
                return true;
            }
        }
        return false;
    }

    getError(error: string) {
        return this.control.errors[error];
    }

    get form() {
        const formGroup = this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null;

        return this.groupName ? formGroup.controls[this.groupName] : formGroup;
    }

    ngOnDestroy() {
        this.controlSubscription.unsubscribe();
    }
}
