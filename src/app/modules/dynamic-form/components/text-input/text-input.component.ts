import { Component, forwardRef, Injector, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'text-input',
    templateUrl: './text-input.component.pug',
    styleUrls: ['./text-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true
        }
    ]
})
export class TextInputComponent implements ControlValueAccessor {

    value: string;
    passwordType = 'password';

    @Input() id: string;
    @Input() placeholder: string;
    @Input() minLength: number;
    @Input() maxLength: number;

    @Input() type?: string;
    @Input() icon?: string;

    constructor(
        public injector: Injector
    ) {}

    private propagateChange = (value: string) => {};
    private propagateTouched = ($event: FocusEvent) => {};

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    onChange(value: string) {
        this.propagateChange(value);
    }

    onBlur($event) {
        this.propagateTouched($event);
    }

    onTogglePasswordVisibility($event: MouseEvent) {
        $event.stopPropagation();

        this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    }
}
