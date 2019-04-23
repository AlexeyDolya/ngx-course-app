/* tslint:disable */
import { Action } from '@ngrx/store';
import { INotify } from '../reducers/notify.reducer';

export const CONNECT_NOTIFY_CHANEL: string = '[FCM] CONNECT_NOTIFY_CHANEL';
export const FAILD_CONNECT_NOTIFY_CHANEL: string = '[FCM] FAILD_CONNECT_NOTIFY_CHANEL';

export const GET_NOTIFY_PENDING: string = '[Notify] GET_NOTIFY_PENDING';
export const GET_NOTIFY_SUCCESS: string = '[Notify] GET_NOTIFY_SUCCESS';
export const GET_NOTIFY_ERROR: string = '[Notify] GET_NOTIFY_ERROR';

export const CHANGE_NOTIFY_STATUS: string = '[Notify] CHANGE_NOTIFY_STATUS';
export const CHANGE_NOTIFY_STATUS_SUCCESS: string = '[Notify] CHANGE_NOTIFY_STATUS_SUCCESS';
export const CHANGE_NOTIFY_STATUS_ERROR: string = '[Notify] CHANGE_NOTIFY_STATUS_ERROR';

// tslint:disable-next-line: max-classes-per-file
export class ConnectNotifyChanel implements Action {
    public readonly type: string = CONNECT_NOTIFY_CHANEL;
}

// tslint:disable-next-line: max-classes-per-file
export class FailedConnectNotifyChanel implements Action {
    public readonly type: string = FAILD_CONNECT_NOTIFY_CHANEL;
    public constructor(public payload: Error) {}
}

// tslint:disable-next-line: max-classes-per-file
export class GetNotifyPending implements Action {
    public readonly type: string = GET_NOTIFY_PENDING;
}

// tslint:disable-next-line: max-classes-per-file
export class GetNotifySuccess implements Action {
    public readonly type: string = GET_NOTIFY_SUCCESS;

    public constructor(public payload: any[]) {}
}

// tslint:disable-next-line: max-classes-per-file
export class GetNotifyError implements Action {
    public readonly type: string = GET_NOTIFY_ERROR;
    public constructor(public payload: Error) {}
}

export class ChangeEventStatus implements Action {
    public readonly type: string = CHANGE_NOTIFY_STATUS;
    public constructor(public payload: string) {}
}

export class ChangeEventStatusSuccess implements Action {
    public readonly type: string = CHANGE_NOTIFY_STATUS_SUCCESS;
    public constructor(public payload: INotify) {}
}

export class ChangeEventStatusError implements Action {
    public readonly type: string = CHANGE_NOTIFY_STATUS_ERROR;
    public constructor(public payload: Error) {}
}

export type NotifyActions =
    | ChangeEventStatusSuccess
    | ChangeEventStatusError
    | ChangeEventStatus
    | ConnectNotifyChanel
    | FailedConnectNotifyChanel
    | GetNotifyPending
    | GetNotifySuccess
    | GetNotifyError;
