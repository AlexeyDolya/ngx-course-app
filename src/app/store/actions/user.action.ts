/* tslint:disable */
import { Action } from '@ngrx/store';
import { IUser } from '../reducers/user.reducer';

export const SET_USER: string = '[USER] SET_USER ..';

export const EDIT_USER_PENDING: string = '[USER] EDIT_USER_PENDING';
export const EDIT_USER_SUCCESS: string = '[USER] EDIT_USER_SUCCESS';
export const EDIT_USER_FAIL: string = '[USER] EDIT_USER_FAIL';

// tslint:disable-next-line: max-classes-per-file
export class SetUser implements Action {
    public readonly type: string = SET_USER;
    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class EdittUserPending implements Action {
    public readonly type: string = EDIT_USER_PENDING;
    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class EdittUserSuccess implements Action {
    public readonly type: string = EDIT_USER_SUCCESS;
    public constructor(public payload: IUser) {}
}

// tslint:disable-next-line: max-classes-per-file
export class EdittUserFail implements Action {
    public readonly type: string = EDIT_USER_FAIL;
    public constructor(public payload: Error) {}
}

export type UserActions = SetUser | EdittUserPending | EdittUserSuccess | EdittUserFail;
