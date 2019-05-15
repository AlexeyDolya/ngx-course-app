/* tslint:disable */
import { Action } from '@ngrx/store';
import { INotify } from '@rootStore/reducers/notify.reducer';

export enum EventsTableActions {
    CHANGE_PAGE_PENDING = '[Notify] CHANGE_PAGE_PENDING',
    CHANGE_PAGE_SUCCESS = '[Notify] CHANGE_PAGE_SUCCESS',
    CHANGE_PAGE_FAIL = '[Notify] CHANGE_PAGE_FAIL',
}

export class ChangePagePending implements Action {
    public readonly type: string = EventsTableActions.CHANGE_PAGE_PENDING;
    public constructor(public payload: number) {}
}
export class ChangePageSuccess implements Action {
    public readonly type: string = EventsTableActions.CHANGE_PAGE_SUCCESS;
    public constructor(public payload: { page: number; events: INotify[]; length: number }) {}
}

export class ChangePageFail implements Action {
    public readonly type: string = EventsTableActions.CHANGE_PAGE_FAIL;
    public constructor(public payload: Error) {}
}

export type EventsTableTypes = ChangePagePending | ChangePageSuccess | ChangePageFail;
