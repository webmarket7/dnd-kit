import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { firebaseConfig } from '../environments/firebase.config';
import { CoreModule } from './core/core.module';
import { ActionMenuDirective } from './core/directives/action-menu.directive';
import { RenderListDirective } from './core/directives/render-list.directive';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects]),
        CoreModule
    ],
    declarations: [
        AppComponent,
        ActionMenuDirective,
        RenderListDirective
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
