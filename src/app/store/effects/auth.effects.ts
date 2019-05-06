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
    Logout,
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
import { ConnectNotifyChanel, GetNotifyPending } from '../actions/notify.actions';
import { Go } from '../actions/router.action';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthEffects {
    @Effect()
    public login$: Observable<Action> = this.actions$.pipe(
        ofType<any>(AuthActions.LOGIN),
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
                        new Go({ path: ['backoffice'] }),
                    ];
                }),
                catchError((err: any) => {
                    this._snackBar.open('Ошибка при входе', '', {
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
        ofType<any>(AuthActions.SIGN_UP),
        map((action: SignUp) => action.payload),
        switchMap((user: any) =>
            this._authService.signUp(user).pipe(
                mergeMap((data: any) => [new SignUpSuccess(data), new SetUser(data), new Go({ path: ['backoffice'] })]),
                tap(() =>
                    this._snackBar.open('Вы успешно зарегистрированы', '', {
                        duration: 1500,
                        panelClass: ['color-snack'],
                        horizontalPosition: 'center',
                    })
                ),
                catchError((err: Error) => {
                    this._snackBar.open('Ошибка регистриции', '', {
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
            this._snackBar.open('Ошибка при выходе', '', {
                duration: 1500,
                panelClass: ['color-snack'],
                horizontalPosition: 'center',
            });
            return of(new LogoutFail());
        })
    );

    @Effect()
    public init$: Observable<any> = this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => this._authService.getTokenFromLocalStorage()),
        switchMap((token: string | null) => this._authService.checkUser(token)),
        mergeMap((user: IUser) => {
            return [new SetUser(user), new ConnectNotifyChanel(), new GetNotifyPending()];
        }),
        catchError(() => {
            return of(new Logout());
        })
    );

    public constructor(
        private actions$: Actions<AuthActionsType>,
        private _authService: AuthService,
        private _messagingService: MessagingService,
        private _snackBar: MatSnackBar
    ) {}
}
