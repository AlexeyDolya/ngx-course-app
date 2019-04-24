/* tslint:disable */
import { Action } from '@ngrx/store';
import { IUser } from '../reducers/user.reducer';

export enum UserActions {
    SET_USER = '[USER] SET_USER ..',
    EDIT_USER_PENDING = '[USER] EDIT_USER_PENDING',
    EDIT_USER_SUCCESS = '[USER] EDIT_USER_SUCCESS',
    EDIT_USER_FAIL = '[USER] EDIT_USER_FAIL',
}

// tslint:disable-next-line: max-classes-per-file
export class SetUser implements Action {
    public readonly type: string = UserActions.SET_USER;
    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class EdittUserPending implements Action {
    public readonly type: string = UserActions.EDIT_USER_PENDING;
    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class EdittUserSuccess implements Action {
    public readonly type: string = UserActions.EDIT_USER_SUCCESS;
    public constructor(public payload: IUser) {}
}

// tslint:disable-next-line: max-classes-per-file
export class EdittUserFail implements Action {
    public readonly type: string = UserActions.EDIT_USER_FAIL;
    public constructor(public payload: Error) {}
}

export type UserActionsTypes = SetUser | EdittUserPending | EdittUserSuccess | EdittUserFail;
