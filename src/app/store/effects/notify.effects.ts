import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { MessagingService } from '@shared/services/notification.service';
import {
    ChangeEventStatusError,
    ChangeEventStatusSuccess,
    ConnectNotifyChanel,
    FailedConnectNotifyChanel,
    GetUnreadError,
    GetUnreadPending,
    GetUnreadSuccess,
    NotifyActions,
    NotifyActionsTypes,
} from '../actions/notify.actions';
import { INotify } from '../reducers/notify.reducer';
import { Login } from '../actions/auth.action';

@Injectable()
export class NotifyEffect {
    @Effect()
    public notify$: Observable<Action> = this.actions$.pipe(
        ofType<any>(NotifyActions.CONNECT_NOTIFY_CHANEL),
        switchMap(() =>
            this._messagingService.receiveMessage().pipe(
                tap((payload: any) => {
                    new Notification(payload.notification.title, { body: payload.notification.body });
                }),
                mergeMap(() => {
                    return [new GetUnreadPending(), new ConnectNotifyChanel()];
                }),
                catchError((err: any) => {
                    return of(new FailedConnectNotifyChanel(err));
                })
            )
        )
    );

    @Effect()
    public getEvents$: Observable<Action> = this.actions$.pipe(
        ofType<any>(NotifyActions.GET_UNREAD_PENDING),
        switchMap(() =>
            this._messagingService.getEvents().pipe(
                map((data: number) => {
                    return new GetUnreadSuccess(data);
                }),
                catchError((err: any) => {
                    return of(new GetUnreadError(err));
                })
            )
        )
    );

    @Effect()
    public changeEventsStatus$: Observable<Action> = this.actions$.pipe(
        ofType<any>(NotifyActions.CHANGE_NOTIFY_STATUS),
        map((action: Login) => action.payload),
        switchMap((id: string) =>
            this._messagingService.changeStatus(id).pipe(
                mergeMap((event: INotify) => {
                    return [new ChangeEventStatusSuccess(event), new GetUnreadPending()];
                }),
                catchError((err: any) => {
                    return of(new ChangeEventStatusError(err));
                })
            )
        )
    );

    public constructor(private actions$: Actions<NotifyActionsTypes>, private _messagingService: MessagingService) {}
}
