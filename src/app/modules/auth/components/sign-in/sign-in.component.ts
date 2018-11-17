import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { SignInRequested } from '../../store/auth.actions';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.pug',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

    form: FormGroup;
    formModel: any[];

    constructor(
        private store: Store<AppState>
    ) {
        this.form = new FormGroup({}, {updateOn: 'blur'});
        this.formModel = [
            {
                component: 'text-input',
                key: 'email',
                label: 'Email',
                type: 'email',
                icon: 'at',
                id: 'email',
                placeholder: 'enter your email',
                validation: {
                    required: true,
                    maxlength: 256
                }
            },
            {
                component: 'text-input',
                key: 'password',
                label: 'Password',
                type: 'password',
                icon: 'lock',
                id: 'password',
                placeholder: 'enter your password',
                validation: {
                    required: true,
                    minLength: 6,
                    maxlength: 256
                }
            }
        ];
    }

    onFormSubmit(form: FormGroup) {
        const
            formData = form.value,
            email = formData.email,
            password = formData.password;

        this.store.dispatch(new SignInRequested({
            username: email,
            password
        }));
    }
}
