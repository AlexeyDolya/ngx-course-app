import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RoutersActions {
    GO = '[Router] Go',
    BACK = '[Router] Back',
    FORWARD = '[Router] Forward',
}

export class Go implements Action {
    public readonly type: string = RoutersActions.GO;
    public constructor(public payload: IRouterPayload) {}
}

// tslint:disable-next-line: max-classes-per-file
export class Back implements Action {
    public readonly type: string = RoutersActions.BACK;
}

// tslint:disable-next-line: max-classes-per-file
export class Forward implements Action {
    public readonly type: string = RoutersActions.FORWARD;
}

export interface IRouterPayload {
    // tslint:disable-next-line: no-any
    path: any[];
    query?: object;
    extras?: NavigationExtras;
}
