/* tslint:disable */
import { Action } from '@ngrx/store';
import { INotify } from '../reducers/notify.reducer';

export enum NotifyActions {
    CONNECT_NOTIFY_CHANEL = '[FCM] CONNECT_NOTIFY_CHANEL',
    FAILD_CONNECT_NOTIFY_CHANEL = '[FCM] FAILD_CONNECT_NOTIFY_CHANEL',
    GET_NOTIFY_PENDING = '[Notify] GET_NOTIFY_PENDING',
    GET_NOTIFY_SUCCESS = '[Notify] GET_NOTIFY_SUCCESS',
    GET_NOTIFY_ERROR = '[Notify] GET_NOTIFY_ERROR',
    CHANGE_NOTIFY_STATUS = '[Notify] CHANGE_NOTIFY_STATUS',
    CHANGE_NOTIFY_STATUS_SUCCESS = '[Notify] CHANGE_NOTIFY_STATUS_SUCCESS',
    CHANGE_NOTIFY_STATUS_ERROR = '[Notify] CHANGE_NOTIFY_STATUS_ERROR',
    CHANGE_PAGE= '[Notify] CHANGE_PAGE'
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
export class GetNotifyPending implements Action {
    public readonly type: string = NotifyActions.GET_NOTIFY_PENDING;
}

// tslint:disable-next-line: max-classes-per-file
export class GetNotifySuccess implements Action {
    public readonly type: string = NotifyActions.GET_NOTIFY_SUCCESS;

    public constructor(public payload: any[]) {}
}

// tslint:disable-next-line: max-classes-per-file
export class GetNotifyError implements Action {
    public readonly type: string = NotifyActions.GET_NOTIFY_ERROR;
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

export class ChangePage implements Action {
    public readonly type: string = NotifyActions.CHANGE_PAGE;
    public constructor(public payload: number) {}

}

export type NotifyActionsTypes =
    | ChangeEventStatusSuccess
    | ChangeEventStatusError
    | ChangeEventStatus
    | ConnectNotifyChanel
    | FailedConnectNotifyChanel
    | GetNotifyPending
    | GetNotifySuccess
    | GetNotifyError
    | ChangePage;
