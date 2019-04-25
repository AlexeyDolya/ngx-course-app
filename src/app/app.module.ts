import { AuthService } from '@shared/services/auth.service';
import { metaReducers } from '@rootStore/reducers/index';
import { AuthGuardService } from '@shared/services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import { reducers } from '@rootStore/reducers';
import { effectsArr } from '@rootStore/effects';
import { EffectsModule } from '@ngrx/effects';
import { MessagingService } from '@shared/services/notification.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { ModalModule } from '@modal/modal.module';
import { SharedModule } from '@shared/shared.module';

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
        ModalModule.forRoot(),
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.fcmOptions),
        SharedModule,
    ],
    providers: [AuthGuardService, AuthService, MessagingService],
    bootstrap: [AppComponent],
})
export class AppModule {}
