import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { MessagingService } from '../../shared/services/notification.service';
import {
  CHANGE_NOTIFY_STATUS, ChangeEventStatusError, ChangeEventStatusSuccess,
  CONNECT_NOTIFY_CHANEL,
  ConnectNotifyChanel,
  FailedConnectNotifyChanel,
  GET_NOTIFY_PENDING,
  GetNotifyError,
  GetNotifyPending,
  GetNotifySuccess,
  NotifyActions,
} from '../actions/notify.actions';
import { INotify } from '../reducers/notify.reducer';
import { Login } from '../actions/auth.action';

@Injectable()
export class NotifyEffect {
    @Effect()
    public notify$: Observable<Action> = this.actions$.pipe(
        ofType<any>(CONNECT_NOTIFY_CHANEL),
        switchMap(() =>
            this._messagingService.receiveMessage().pipe(
                tap((payload: any) => {
                    new Notification(payload.notification.title, { body: payload.notification.body });
                }),
                mergeMap(() => {
                    return [new GetNotifyPending(), new ConnectNotifyChanel()];
                }),
                catchError((err: any) => {
                    // tslint:disable-next-line
                    console.log(err);
                    if (err.status !== 402) {
                        alert('Invalid username or password');
                    }
                    return of(new FailedConnectNotifyChanel(err));
                })
            )
        )
    );

    @Effect()
    public getEvents$: Observable<Action> = this.actions$.pipe(
        ofType<any>(GET_NOTIFY_PENDING),
        switchMap(() =>
            this._messagingService.getEvents().pipe(
                map((events: INotify[]) => {
                    return new GetNotifySuccess(events);
                }),
                catchError((err: any) => {
                    // tslint:disable-next-line
                    console.log(err);
                    if (err.status !== 402) {
                        alert('Invalid username or password');
                    }
                    return of(new GetNotifyError(err));
                })
            )
        )
    );

    @Effect()
    public changeEventsStatus$: Observable<Action> = this.actions$.pipe(
        ofType<any>(CHANGE_NOTIFY_STATUS),
        map((action: Login) => action.payload),
        switchMap((id: string) =>
            this._messagingService.changeStatus(id).pipe(
                map((event: INotify) => {
                    return new ChangeEventStatusSuccess(event);
                }),
                catchError((err: any) => {
                    return of(new ChangeEventStatusError(err));
                })
            )
        )
    );

    public constructor(private actions$: Actions<NotifyActions>, private _messagingService: MessagingService) {}
}