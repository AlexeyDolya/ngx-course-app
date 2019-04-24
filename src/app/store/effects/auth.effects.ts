import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
    AuthActions,
    Login,
    LOGIN,
    LoginFail,
    LoginSuccess,
    Logout,
    LOGOUT,
    LogoutFail,
    LogoutSuccess,
    SIGN_UP,
    SignUp,
    SignUpFail,
    SignUpSuccess,
} from '../actions/auth.action';
import { AuthService } from '@shared/services/auth.service';
import { SetUser } from '../actions/user.action';
import { MessagingService } from '@shared/services/notification.service';
import { IUser } from '../reducers/user.reducer';
import { ConnectNotifyChanel, GetNotifyPending } from '../actions/notify.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    public login$: Observable<Action> = this.actions$.pipe(
        ofType<any>(LOGIN),
        map((action: Login) => action.payload),
        switchMap((user: IUser) =>
            this._authService.login(user).pipe(
                switchMap((data: IUser) => {
                    return this._messagingService.requestPermission(data._id);
                }),
                switchMap((data: IUser) => {
                    return this._authService.tokenToLocalStorage(data);
                }),
                mergeMap((data: IUser) => {
                    return [
                        new LoginSuccess(data),
                        new SetUser(data),
                        new ConnectNotifyChanel(),
                        new GetNotifyPending(),
                    ];
                }),
                tap(() => {
                    // this._messagingService.receiveMessage();
                    this._router.navigate(['/backoffice']);
                }),
                catchError((err: any) => {
                    // tslint:disable-next-line
                    console.log(err);
                    return of(new LoginFail(err));
                })
            )
        )
    );

    @Effect()
    public signUp$: Observable<Action> = this.actions$.pipe(
        ofType<any>(SIGN_UP),
        map((action: SignUp) => action.payload),
        switchMap((user: any) =>
            this._authService.signUp(user).pipe(
                mergeMap((data: any) => [new SignUpSuccess(data), new SetUser(data)]),
                tap(() => {
                    this._router.navigate(['/backoffice']);
                }),
                catchError((err: Error) => {
                    return of(new SignUpFail(err));
                })
            )
        )
    );

    @Effect()
    public logout$: Observable<Action> = this.actions$.pipe(
        ofType(LOGOUT),
        tap(() => this._authService.removeFromLocalStorage('accessToken')),
        tap(() => this._router.navigate(['/login'])),
        map(() => new LogoutSuccess()),
        catchError((err: Error) => {
            // tslint:disable-next-line
            console.log(err);
            return of(new LogoutFail());
        })
    );

    @Effect()
    public init$: Observable<any> = this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        mergeMap(() => this._authService.getTokenFromLocalStorage()),
        switchMap((token: string | null) => this._authService.checkUser(token)),
        mergeMap((user: IUser) => {
            return [new SetUser(user), new ConnectNotifyChanel(), new GetNotifyPending()];
        }),
        catchError((err: any) => {
            // tslint:disable-next-line
            console.log(err);
            return of(new Logout());
        })
    );

    public constructor(
        private actions$: Actions<AuthActions>,
        private _authService: AuthService,
        private _router: Router,
        private _messagingService: MessagingService
    ) {}
}
