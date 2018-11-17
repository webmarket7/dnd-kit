import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/sign-in',
        pathMatch: 'full'
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([AuthEffects]),
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        DynamicFormModule
    ],
    declarations: [
        SignInComponent,
        SignUpComponent
    ],
    providers: [],
    entryComponents: []
})

export class AuthModule {
}
