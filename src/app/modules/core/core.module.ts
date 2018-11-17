import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicFormModule
    ],
    declarations: [
    ],
    exports: [
    ]
})
export class CoreModule {
}
