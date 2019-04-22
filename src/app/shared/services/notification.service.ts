import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { messaging } from 'firebase';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class MessagingService {
    public constructor(
        private angularFireAuth: AngularFireAuth,
        private angularFireMessaging: AngularFireMessaging,
        private _http: HttpClient
    ) {
        this.angularFireMessaging.messaging.subscribe((_messaging: messaging.Messaging) => {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        });
    }

    public getEvents(): Observable<any> {
        return this._http.get('/notification');
    }

    public updateToken(userId: string, token: string | null): Observable<any> {
        return this._http.put('/user/devices', { id: userId, devices: token });
    }

    public requestPermission(userId: string): Observable<any> {
        return this.angularFireMessaging.requestToken.pipe(
            switchMap((token: string | null) => this.updateToken(userId, token))
        );
    }

    public receiveMessage(): Observable<any> {
        return this.angularFireMessaging.messages;
    }
}
