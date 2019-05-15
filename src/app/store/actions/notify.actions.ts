/* tslint:disable */
import { Action } from '@ngrx/store';
import { INotify } from '../reducers/notify.reducer';

export enum NotifyActions {
    CONNECT_NOTIFY_CHANEL = '[FCM] CONNECT_NOTIFY_CHANEL',
    FAILD_CONNECT_NOTIFY_CHANEL = '[FCM] FAILD_CONNECT_NOTIFY_CHANEL',
    GET_UNREAD_PENDING = '[Notify] GET_UNREAD_PENDING',
    GET_UNREAD_SUCCESS = '[Notify] GET_UNREAD_SUCCESS',
    GET_UNREAD_ERROR = '[Notify] GET_UNREAD_ERROR',
    CHANGE_NOTIFY_STATUS = '[Notify] CHANGE_NOTIFY_STATUS',
    CHANGE_NOTIFY_STATUS_SUCCESS = '[Notify] CHANGE_NOTIFY_STATUS_SUCCESS',
    CHANGE_NOTIFY_STATUS_ERROR = '[Notify] CHANGE_NOTIFY_STATUS_ERROR',
}

// tslint:disable-next-line: max-classes-per-file
export class ConnectNotifyChanel implements Action {
    public readonly type: string = NotifyActions.CONNECT_NOTIFY_CHANEL;
}

// tslint:disable-next-line: max-classes-per-file
export class FailedConnectNotifyChanel implements Action {
    public readonly type: string = NotifyActions.FAILD_CONNECT_NOTIFY_CHANEL;
    public constructor(public payload: Error) {}
}

// tslint:disable-next-line: max-classes-per-file
export class GetUnreadPending implements Action {
    public readonly type: string = NotifyActions.GET_UNREAD_PENDING;
}

// tslint:disable-next-line: max-classes-per-file
export class GetUnreadSuccess implements Action {
    public readonly type: string = NotifyActions.GET_UNREAD_SUCCESS;

    public constructor(public payload: number) {}
}

// tslint:disable-next-line: max-classes-per-file
export class GetUnreadError implements Action {
    public readonly type: string = NotifyActions.GET_UNREAD_ERROR;
    public constructor(public payload: Error) {}
}

export class ChangeEventStatus implements Action {
    public readonly type: string = NotifyActions.CHANGE_NOTIFY_STATUS;
    public constructor(public payload: string) {}
}

export class ChangeEventStatusSuccess implements Action {
    public readonly type: string = NotifyActions.CHANGE_NOTIFY_STATUS_SUCCESS;
    public constructor(public payload: INotify) {}
}

export class ChangeEventStatusError implements Action {
    public readonly type: string = NotifyActions.CHANGE_NOTIFY_STATUS_ERROR;
    public constructor(public payload: Error) {}
}

export type NotifyActionsTypes =
    | ChangeEventStatusSuccess
    | ChangeEventStatusError
    | ChangeEventStatus
    | ConnectNotifyChanel
    | FailedConnectNotifyChanel
    | GetUnreadPending
    | GetUnreadSuccess
    | GetUnreadError;
