import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { messaging } from 'firebase';
import { catchError, switchMap } from 'rxjs/operators';

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
        return this._http.put('/auth/devices', { id: userId, devices: token });
    }

    public requestFCMPermission(data: any): Observable<any> {
        return this.angularFireMessaging.requestToken.pipe(
            switchMap((token: string | null) => this.updateToken(data.id, token)),
            catchError(() => of(data))
        );
    }

    public getPerPage(page: number): Observable<any> {
        return this._http.get(`/notification/table?page=${page}`);
    }

    public receiveMessage(): Observable<any> {
        return this.angularFireMessaging.messages;
    }
}
