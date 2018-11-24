import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

import { ControlStatusDirective } from './directives/control-status.directive';
import { InvalidMessageDirective } from './directives/invalid-message.directive';
import { InvalidTypeDirective } from './directives/invalid-type.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule
    ],
    declarations: [
        TextInputComponent,
        DynamicFormComponent,
        ValidationMessageComponent,

        ControlStatusDirective,
        InvalidMessageDirective,
        InvalidTypeDirective
    ],
    exports: [
        DynamicFormComponent,
        TextInputComponent,
        ValidationMessageComponent,

        ControlStatusDirective,
        InvalidMessageDirective,
        InvalidTypeDirective
    ]
})
export class DynamicFormModule {
}
