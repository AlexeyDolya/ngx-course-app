/* tslint:disable */
import { Action } from '@ngrx/store';

export const CONNECT_NOTIFY_CHANEL: string = '[FCM] CONNECT_NOTIFY_CHANEL';
export const FAILD_CONNECT_NOTIFY_CHANEL: string = '[FCM] FAILD_CONNECT_NOTIFY_CHANEL';

export const GET_NOTIFY_PENDING: string = '[Board] GET_NOTIFY_PENDING';
export const GET_NOTIFY_SUCCESS: string = '[Board] GET_NOTIFY_SUCCESS';
export const GET_NOTIFY_ERROR: string = '[Board] GET_NOTIFY_ERROR';

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

export type NotifyActions =
    | ConnectNotifyChanel
    | FailedConnectNotifyChanel
    | GetNotifyPending
    | GetNotifySuccess
    | GetNotifyError;
