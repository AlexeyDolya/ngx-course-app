import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessagingService {
    public currentMessage: BehaviorSubject<any> = new BehaviorSubject(null);

    public constructor(
        private angularFireAuth: AngularFireAuth,
        private angularFireMessaging: AngularFireMessaging,
        private _http: HttpClient
    ) {
        this.angularFireMessaging.messaging.subscribe((_messaging: any) => {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        });
    }

    public updateToken(userId: any, token: any): void {
        this._http.put('/user/devices', { id: userId, devices: token }).subscribe((data: any) => data);
    }

    public requestPermission(userId: any): void {
        this.angularFireMessaging.requestToken.subscribe(
            (token: any) => {
                this.updateToken(userId, token);
            },
            (err: any) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }

    public receiveMessage(): void {
        this.angularFireMessaging.messages.subscribe((payload: any) => {
            new Notification(payload.notification.title, { body: payload.notification.body });
            this.currentMessage.next(payload);
        });
    }
}
