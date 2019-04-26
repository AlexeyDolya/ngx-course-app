/* tslint:disable */
import { Action } from '@ngrx/store';

export enum AuthActions {
    LOGIN = '[Auth] LOGIN ..',
    LOGIN_SUCCESS = '[Auth] LOGIN Success',
    LOGIN_FAIL = '[Auth] LOGIN Fail',
    SIGN_UP = '[Auth] SIGN_UP ..',
    SIGN_UP_SUCCESS = '[Auth] SIGN_UP Success',
    SIGN_UP_FAIL = '[Auth] SIGN_UP Fail',
    LOGOUT = '[Auth] LOGOUT ..',
    LOGOUT_SUCCESS = '[Auth] LOGOUT Success',
    LOGOUT_FAIL = '[Auth] LOGOUT Fail',
}

/* LOGIN */
// tslint:disable-next-line: max-classes-per-file
export class Login implements Action {
    public readonly type: string = AuthActions.LOGIN;
    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class LoginSuccess implements Action {
    public readonly type: string = AuthActions.LOGIN_SUCCESS;
    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class LoginFail implements Action {
    public readonly type: string = AuthActions.LOGIN_FAIL;
    public constructor(public payload: Error) {}
}

/* SIGN UP */
// tslint:disable-next-line: max-classes-per-file
export class SignUp implements Action {
    public readonly type: string = AuthActions.SIGN_UP;
    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class SignUpSuccess implements Action {
    public readonly type: string = AuthActions.SIGN_UP_SUCCESS;
    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class SignUpFail implements Action {
    public readonly type: string = AuthActions.SIGN_UP_FAIL;
    public constructor(public payload: Error) {}
}

/* LOG OUT */
// tslint:disable-next-line: max-classes-per-file
export class Logout implements Action {
    public readonly type: string = AuthActions.LOGOUT;
}

// tslint:disable-next-line: max-classes-per-file
export class LogoutSuccess implements Action {
    public readonly type: string = AuthActions.LOGOUT_SUCCESS;
}

// tslint:disable-next-line: max-classes-per-file
export class LogoutFail implements Action {
    public readonly type: string = AuthActions.LOGOUT_FAIL;
}

export type AuthActionsType =
    | Login
    | LoginSuccess
    | LoginFail
    | SignUp
    | SignUpSuccess
    | SignUpFail
    | Logout
    | LogoutSuccess
    | LogoutFail;
