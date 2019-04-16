import { InterceptorService } from './interceptor.service';
import { AuthService } from './shared/services/auth.service';
import { metaReducers } from './store/reducers/index';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './store/reducers';
import { effectsArr } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { BASE_URL_TOKEN } from './config';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot(effectsArr),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true,
        },
        {
            provide: BASE_URL_TOKEN,
            useValue: environment.baseUrl,
        },
        AuthGuardService,
        AuthService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
