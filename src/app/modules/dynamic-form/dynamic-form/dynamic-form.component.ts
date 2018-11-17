import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.pug',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

    @Input() form: FormGroup;
    @Input() model: any[];

    static mapValidators(validators: any) {
        const formValidators = [];

        if (validators) {
            for (const item of Object.keys(validators)) {

                switch (item) {
                    case 'required':
                        formValidators.push(Validators.required);
                        break;

                    case 'minLength':
                        formValidators.push(Validators.minLength(validators[item]));
                        break;
                }
            }
        }

        return formValidators;
    }

    static populateGroup(form: FormGroup, model: any[]): void {
        const count = model.length;

        for (let j = 0; j < count; j++) {
            const control = model[j];

            form.addControl(control.key, new FormControl(control.value || '', DynamicFormComponent.mapValidators(control.validation)));
        }
    }

    ngOnInit() {
        DynamicFormComponent.populateGroup(this.form, this.model);
    }
}
