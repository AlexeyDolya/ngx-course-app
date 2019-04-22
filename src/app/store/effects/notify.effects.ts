import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AuthActions, Login, LoginFail } from '../actions/auth.action';
import { AuthService } from '../../shared/services/auth.service';
import { SetUser } from '../actions/user.action';
import { MessagingService } from '../../shared/services/notification.service';
import { IUser } from '../reducers/user.reducer';

@Injectable()
export class AuthEffects {
    @Effect()
    public notify$: Observable<Action> = this.actions$.pipe(
        ofType<any>('CONNECT_NOTIFY_CHANEL'),
        map((action: Login) => action.payload),
        switchMap((user: any) =>
            this._messagingService.receiveMessage().pipe(
                map((notify: IUser) => {
                    return new addNotify(notify);
                }),
                tap((payload: any) => {
                    new Notification(payload.notification.title, { body: payload.notification.body });
                }),
                catchError((err: any) => {
                    // tslint:disable-next-line
                    console.log(err);
                    if (err.status !== 402) {
                        alert('Invalid username or password');
                    }
                    return of(new LoginFail(err));
                })
            )
        )
    );

    public constructor(
        private actions$: Actions<AuthActions>,
        private _authService: AuthService,
        private _router: Router,
        private _messagingService: MessagingService
    ) {}
}
