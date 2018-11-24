import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { SignUpRequested } from '../../store/auth.actions';

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.component.pug',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

    form: FormGroup;
    formModel: any[];

    constructor(private store: Store<AppState>) {
        this.form = new FormGroup({}, {updateOn: 'blur'});
        this.formModel = [
            {
                component: 'text-input',
                key: 'username',
                label: 'Username',
                icon: 'user',
                id: 'username',
                placeholder: 'min. 2 symbols',
                validation: {
                    required: true,
                    minLength: 2,
                    maxlength: 256
                }
            },
            {
                component: 'text-input',
                key: 'email',
                label: 'Email',
                type: 'email',
                icon: 'at',
                id: 'email',
                placeholder: 'example@gmail.com',
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
                placeholder: 'min. 6 symbols',
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
            displayName = formData.username,
            email = formData.email,
            password = formData.password;

        this.store.dispatch(new SignUpRequested({
            displayName,
            username: email,
            password
        }));
    }
}
