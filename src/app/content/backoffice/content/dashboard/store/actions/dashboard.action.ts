/* tslint:disable */
import { Action } from '@ngrx/store';
import { ICard } from '../reducers/dashboard.reducer';

export const GET_BOARD_PENDING: string = '[Board] GET_BOARD_PENDING';
export const GET_BOARD_SUCCESS: string = '[Board] GET_BOARD_SUCCESS';
export const GET_BOARD_ERROR: string = '[Board] GET_BOARD_ERROR';

export const CREATE_CARD_PENDING: string = '[Board] CREATE_CARD_PENDING';
export const CREATE_CARD_SUCCESS: string = '[Board] CREATE_CARD_SUCCESS';
export const CREATE_CARD_ERROR: string = '[Board] CREATE_CARD_ERROR';

export const CHANGE_CARD_PENDING: string = '[Board] CHANGE_CARD_PENDING';
export const CHANGE_CARD_SUCCESS: string = '[Board] CHANGE_CARD_SUCCESS';
export const CHANGE_CARD_ERROR: string = '[Board] CHANGE_CARD_ERROR';

export const REMOVE_CARD_PENDING: string = '[Board] REMOVE_CARD_PENDING';
export const REMOVE_CARD_SUCCESS: string = '[Board] REMOVE_CARD_SUCCESS';
export const REMOVE_CARD_ERROR: string = '[Board] REMOVE_CARD_ERROR';

// tslint:disable-next-line: max-classes-per-file
export class GetBoardPending implements Action {
    public readonly type: string = GET_BOARD_PENDING;
}

// tslint:disable-next-line: max-classes-per-file
export class GetBoardSuccess implements Action {
    public readonly type: string = GET_BOARD_SUCCESS;

    public constructor(public payload: ICard[]) {}
}

// tslint:disable-next-line: max-classes-per-file
export class GetBoardError implements Action {
    public readonly type: string = GET_BOARD_ERROR;

    public constructor(public payload: Error) {}
}

// tslint:disable-next-line: max-classes-per-file
export class CreateCardPending implements Action {
    public readonly type: string = CREATE_CARD_PENDING;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class CreateCardSuccess implements Action {
    public readonly type: string = CREATE_CARD_SUCCESS;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class CreateCardError implements Action {
    public readonly type: string = CREATE_CARD_ERROR;

    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class ChangeCardPending implements Action {
    public readonly type: string = CHANGE_CARD_PENDING;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class ChangeCardSuccess implements Action {
    public readonly type: string = CHANGE_CARD_SUCCESS;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class ChangeCardError implements Action {
    public readonly type: string = CHANGE_CARD_ERROR;

    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class RemoveCardPending implements Action {
    public readonly type: string = REMOVE_CARD_PENDING;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class RemoveCardSuccess implements Action {
    public readonly type: string = REMOVE_CARD_SUCCESS;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class RemoveCardError implements Action {
    public readonly type: string = REMOVE_CARD_ERROR;

    public constructor(public payload: any) {}
}

export type BoardActions =
    | GetBoardPending
    | GetBoardSuccess
    | GetBoardError
    | ChangeCardPending
    | ChangeCardSuccess
    | ChangeCardError
    | RemoveCardPending
    | RemoveCardSuccess
    | RemoveCardError;
