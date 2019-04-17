/* tslint:disable */
import { Action } from '@ngrx/store';

export const GET_TOKEN_AND_SUBSCRIBE: string = '[FCM] get token and subscribe';
export const ADD_DEVICE_TO_USER: string = '[FCM] Add device to user';

// tslint:disable-next-line: max-classes-per-file
export class GetTokenAndSubscribe implements Action {
    public readonly type: string = GET_TOKEN_AND_SUBSCRIBE;
}

// tslint:disable-next-line: max-classes-per-file
export class AddDeviceToUser implements Action {
    public readonly type: string = ADD_DEVICE_TO_USER;
    public constructor(public payload: any) {}
}

export type FcmActions = GetTokenAndSubscribe | AddDeviceToUser;
