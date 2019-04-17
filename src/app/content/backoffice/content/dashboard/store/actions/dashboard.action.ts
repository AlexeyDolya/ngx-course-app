/* tslint:disable */
import { Action } from '@ngrx/store';
import { ICard } from '../reducers/dashboard.reducer';

export const GET_BOARD: string = '[Board] GET_BOARD ..';
export const GET_BOARD_SUCCESS: string = '[Board] GET_BOARDSuccess';
export const GET_BOARD_FAIL: string = '[Board] GET_BOARD Fail';

export const CHANGE_CARD: string = '[Board] CHANGE_CARD';
export const REMOVE_CARD: string = '[Board] REMOVE_CARD';

// tslint:disable-next-line: max-classes-per-file
export class GetBoard implements Action {
    public readonly type: string = GET_BOARD;
}

// tslint:disable-next-line: max-classes-per-file
export class GetBoardSuccess implements Action {
    public readonly type: string = GET_BOARD_SUCCESS;

    public constructor(public payload: ICard[]) {}
}

// tslint:disable-next-line: max-classes-per-file
export class GetBoardFail implements Action {
    public readonly type: string = GET_BOARD_FAIL;

    public constructor(public payload: Error) {}
}

// tslint:disable-next-line: max-classes-per-file
export class ChangeCard implements Action {
    public readonly type: string = CHANGE_CARD;
    public constructor(public payload: ICard) {}
}

// tslint:disable-next-line: max-classes-per-file
export class RemoveCard implements Action {
    public readonly type: string = REMOVE_CARD;
    public constructor(public payload: ICard) {}
}

export type BoardActions = GetBoard | GetBoardSuccess | GetBoardFail | ChangeCard | RemoveCard;
