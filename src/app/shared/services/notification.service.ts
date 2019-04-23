import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { messaging } from 'firebase';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class MessagingService {
    public constructor(private angularFireMessaging: AngularFireMessaging, private _http: HttpClient) {
        this.angularFireMessaging.messaging.subscribe((_messaging: messaging.Messaging) => {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        });
    }

    public getEvents(): Observable<any> {
        return this._http.get('/notification/getAll');
    }

    public changeStatus(_id: string): Observable<any> {
        return this._http.put('/notification/updateStatus', { _id });
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
