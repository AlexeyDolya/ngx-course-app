import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter,mergeMap, map, switchMap, tap } from 'rxjs/operators';
import {
  Login, LOGIN, LoginFail,
  LoginSuccess, LOGOUT, LogoutFail, LogoutSuccess, SIGN_UP, SignUp, SignUpFail, SignUpSuccess
} from '../actions/auth.action';
import { AuthService } from 'src/app/shared/services/auth.service';
import {SetUser} from '../actions/user.action';

@Injectable()
export class AuthEffects {

  @Effect()
  public login$: Observable<Action> = this.actions$
    .pipe(
      ofType(LOGIN),
      map((action: Login) => action.payload),
      switchMap((user: any) => this._authService.login(user).pipe(
        // TODO check, _authService returns User type,
        // but interseptor return { status: 206 } if return two factor auth success
        // tslint:disable-next-line: no-any
        filter((data: any) => data.status !== 206),
        switchMap((data: any) => this._authService.tokenToLocalStorage(data)),
        mergeMap((data: any) => {
          console.log(data)
           return [new LoginSuccess(data), new SetUser(data)]
        }),
        tap(() => {
          this._router.navigate(['/backoffice']);
        }),
        catchError((err: any) => {
          console.log(err);
          if (err.status !== 402) {
            alert('Invalid username or password');
          }
          return of(new LoginFail(err));
        })
      )),
    );

  @Effect()
  public signUp$: Observable<Action> = this.actions$
    .pipe(
      ofType(SIGN_UP),
      map((action: SignUp) => action.payload),
      switchMap((user: any) => this._authService.signUp(user).pipe(
        mergeMap((data: any) => [new SignUpSuccess(data), new SetUser(data)]),
        tap(() => {
          this._router.navigate(['/backoffice']);
        }),
        catchError((err: Error) => {
          alert('Invalid username or email already exists');
          return of(new SignUpFail(err));
        })
      )),
    );

  @Effect()
  public logout$: Observable<Action> = this.actions$
    .pipe(
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


  public constructor(
    private actions$: Actions,
    private _authService: AuthService,
    private _router: Router,
  ) {
  }
}
