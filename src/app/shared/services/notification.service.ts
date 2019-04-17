import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessagingService {
    public currentMessage: BehaviorSubject<any> = new BehaviorSubject(null);

    public constructor(private angularFireAuth: AngularFireAuth, private angularFireMessaging: AngularFireMessaging) {
        this.angularFireMessaging.messaging.subscribe((_messaging: any) => {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        });
    }

    public updateToken(userId: any, token: any): void {
        // we can change this function to request our backend service
        this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
            const data: any = {};
            data[userId] = token;
        });
    }

    public requestPermission(userId: any): void {
        this.angularFireMessaging.requestToken.subscribe(
            (token: any) => {
                // tslint:disable-next-line
                console.log(token);
                this.updateToken(userId, token);
            },
            (err: any) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }

    public receiveMessage(): void {
        this.angularFireMessaging.messages.subscribe((payload: any) => {
            // tslint:disable-next-line
            console.log('new message received. ', payload);
            this.currentMessage.next(payload);
        });
    }
}
