import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
    AuthActions,
    AuthActionsType,
    Login,
    LoginFail,
    LoginSuccess,
    LogoutFail,
    LogoutSuccess,
    SignUp,
    SignUpFail,
    SignUpSuccess,
} from '../actions/auth.action';
import { AuthService } from '@shared/services/auth.service';
import { SetUser } from '../actions/user.action';
import { MessagingService } from '@shared/services/notification.service';
import { IUser } from '../reducers/user.reducer';
import { ConnectNotifyChanel, GetUnreadPending } from '../actions/notify.actions';
import { Go } from '../actions/router.action';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthEffects {
    @Effect()
    public login$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        map((action: Login) => action.payload),
        switchMap((userData: IUser) =>
            this._authService.login(userData).pipe(
                switchMap((user: IUser) => {
                    return this._messagingService.requestFCMPermission(user);
                }),
                switchMap((user: IUser) => {
                    return this._authService.tokenToLocalStorage(user);
                }),
                mergeMap((user: IUser) => {
                    return [
                        new LoginSuccess(user),
                        new SetUser(user),
                        new ConnectNotifyChanel(),
                        new GetUnreadPending(),
                        new Go({ path: ['backoffice'] }),
                    ];
                }),
                catchError((err: Error) => {
                    this._snackBar.open('Log in error', '', {
                        duration: 1500,
                        panelClass: ['color-snack'],
                        horizontalPosition: 'center',
                    });
                    return of(new LoginFail(err));
                })
            )
        )
    );

    @Effect()
    public signUp$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActions.SIGN_UP),
        map((action: SignUp) => action.payload),
        switchMap((userData: IUser) =>
            this._authService.signUp(userData).pipe(
                switchMap((user: IUser) => {
                    return this._messagingService.requestFCMPermission(user);
                }),
                switchMap((user: IUser) => {
                    return this._authService.tokenToLocalStorage(user);
                }),
                mergeMap((data: IUser) => [
                    new SignUpSuccess(data),
                    new SetUser(data),
                    new ConnectNotifyChanel(),
                    new GetUnreadPending(),
                    new Go({ path: ['backoffice'] }),
                ]),
                tap(() =>
                    this._snackBar.open('Sign up ready', '', {
                        duration: 1500,
                        panelClass: ['color-snack'],
                        horizontalPosition: 'center',
                    })
                ),
                catchError((err: Error) => {
                    this._snackBar.open('Sign up error', '', {
                        duration: 1500,
                        panelClass: ['color-snack'],
                        horizontalPosition: 'center',
                    });
                    return of(new SignUpFail(err));
                })
            )
        )
    );

    @Effect()
    public logout$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => this._authService.removeFromLocalStorage('accessToken')),
        mergeMap(() => [new LogoutSuccess(), new Go({ path: ['login'] })]),
        catchError(() => {
            this._snackBar.open('Log in error', '', {
                duration: 1500,
                panelClass: ['color-snack'],
                horizontalPosition: 'center',
            });
            return of(new LogoutFail());
        })
    );

    @Effect()
    public init$: Observable<Action> = this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => this._authService.getTokenFromLocalStorage()),
        switchMap((token: string | null) => this._authService.checkUser(token)),
        mergeMap((user: IUser) => {
            return [new SetUser(user), new ConnectNotifyChanel(), new GetUnreadPending()];
        }),
        catchError((e: Error) => {
            return of(new LoginFail(e));
        })
    );

    public constructor(
        private actions$: Actions<AuthActionsType>,
        private _authService: AuthService,
        private _messagingService: MessagingService,
        private _snackBar: MatSnackBar
    ) {}
}
