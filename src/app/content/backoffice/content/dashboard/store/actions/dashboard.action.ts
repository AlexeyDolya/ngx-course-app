/* tslint:disable */
import { Action } from '@ngrx/store';
import { ICard } from '../reducers/dashboard.reducer';

export enum BoardActions {
    GET_BOARD_PENDING = '[Board] GET_BOARD_PENDING',
    GET_BOARD_SUCCESS = '[Board] GET_BOARD_SUCCESS',
    GET_BOARD_ERROR = '[Board] GET_BOARD_ERROR',
    CREATE_CARD_PENDING = '[Board] CREATE_CARD_PENDING',
    CREATE_CARD_SUCCESS = '[Board] CREATE_CARD_SUCCESS',
    CREATE_CARD_ERROR = '[Board] CREATE_CARD_ERROR',
    CHANGE_CARD_PENDING = '[Board] CHANGE_CARD_PENDING',
    CHANGE_CARD_SUCCESS = '[Board] CHANGE_CARD_SUCCESS',
    CHANGE_CARD_ERROR = '[Board] CHANGE_CARD_ERROR',
    REMOVE_CARD_PENDING = '[Board] REMOVE_CARD_PENDING',
    REMOVE_CARD_SUCCESS = '[Board] REMOVE_CARD_SUCCESS',
    REMOVE_CARD_ERROR = '[Board] REMOVE_CARD_ERROR',
}

// tslint:disable-next-line: max-classes-per-file
export class GetBoardPending implements Action {
    public readonly type: string = BoardActions.GET_BOARD_PENDING;
}

// tslint:disable-next-line: max-classes-per-file
export class GetBoardSuccess implements Action {
    public readonly type: string = BoardActions.GET_BOARD_SUCCESS;

    public constructor(public payload: ICard[]) {}
}

// tslint:disable-next-line: max-classes-per-file
export class GetBoardError implements Action {
    public readonly type: string = BoardActions.GET_BOARD_ERROR;

    public constructor(public payload: Error) {}
}

// tslint:disable-next-line: max-classes-per-file
export class CreateCardPending implements Action {
    public readonly type: string = BoardActions.CREATE_CARD_PENDING;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class CreateCardSuccess implements Action {
    public readonly type: string = BoardActions.CREATE_CARD_SUCCESS;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class CreateCardError implements Action {
    public readonly type: string = BoardActions.CREATE_CARD_ERROR;

    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class ChangeCardPending implements Action {
    public readonly type: string = BoardActions.CHANGE_CARD_PENDING;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class ChangeCardSuccess implements Action {
    public readonly type: string = BoardActions.CHANGE_CARD_SUCCESS;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class ChangeCardError implements Action {
    public readonly type: string = BoardActions.CHANGE_CARD_ERROR;

    public constructor(public payload: any) {}
}

// tslint:disable-next-line: max-classes-per-file
export class RemoveCardPending implements Action {
    public readonly type: string = BoardActions.REMOVE_CARD_PENDING;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class RemoveCardSuccess implements Action {
    public readonly type: string = BoardActions.REMOVE_CARD_SUCCESS;

    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class RemoveCardError implements Action {
    public readonly type: string = BoardActions.REMOVE_CARD_ERROR;

    public constructor(public payload: any) {}
}

export type BoardActionsTypes =
    | GetBoardPending
    | GetBoardSuccess
    | GetBoardError
    | ChangeCardPending
    | ChangeCardSuccess
    | ChangeCardError
    | RemoveCardPending
    | RemoveCardSuccess
    | RemoveCardError;
