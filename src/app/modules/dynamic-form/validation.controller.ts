import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { isEmpty } from 'lodash';

export class ValidationController {

    static removeError(formControl: AbstractControl, error: string) {
        const errors = formControl.errors;

        if (errors && errors[error]) {
            delete errors[error];

            formControl.setErrors(isEmpty(errors) ? null : errors);
        }
    }

    static passwordMatchValidator(fg: FormGroup): ValidationErrors | null {
        const
            password = fg.get('password'),
            confirmPassword = fg.get('confirmPassword'),
            formControls = [password, confirmPassword];

        if (password.dirty && confirmPassword.dirty) {
            if (password.value === confirmPassword.value) {

                formControls.forEach((formControl) => ValidationController.removeError(formControl, 'mismatch'));

                return null;
            } else {
                formControls.forEach((formControl) => formControl.setErrors({...formControl.errors, 'mismatch': true}));

                return {'mismatch': true};
            }
        } else {
            return null;
        }
    }
}
