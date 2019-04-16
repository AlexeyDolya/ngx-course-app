/* tslint:disable */
import { Action } from '@ngrx/store';

export const SET_USER: string = '[USER] SET_USER ..';

// tslint:disable-next-line: max-classes-per-file
export class SetUser implements Action {
  public readonly type: string = SET_USER;
  public constructor(public payload: any) {}
}

export type UserActions
  = SetUser
