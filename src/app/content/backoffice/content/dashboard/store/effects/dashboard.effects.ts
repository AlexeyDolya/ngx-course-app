import { CardStatus, ICard } from '../reducers/dashboard.reducer';

const mockedCard: ICard[] = [
    {
        _id: '1',
        description: 'Task 1 asd asd asda sda das das dasd ad asd asd asda dsasd asd asd asd asda sda sdasd asd',
        status: CardStatus.BACKLOG,
    },
    {
        _id: '2',
        description: 'Task 2',
        status: CardStatus.BACKLOG,
    },
    {
        _id: '3',
        description: 'Task 3',
        status: CardStatus.BACKLOG,
    },
    {
        _id: '4',
        description: 'Task 4',
        status: CardStatus.BACKLOG,
    },
];

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
    BoardActions,
    CHANGE_CARD_PENDING,
    ChangeCardError,
    ChangeCardSuccess,
    CREATE_CARD_PENDING,
    CreateCardError,
    CreateCardSuccess,
    GET_BOARD_PENDING,
    GetBoardError,
    GetBoardSuccess,
    REMOVE_CARD_PENDING,
    RemoveCardError,
    RemoveCardPending,
    RemoveCardSuccess,
} from '../actions/dashboard.action';

@Injectable()
export class BoardEffects {
    @Effect()
    public getBoard$: Observable<Action> = this.actions$.pipe(
        ofType<any>(GET_BOARD_PENDING),
        switchMap(() =>
            of(mockedCard).pipe(
                mergeMap((cards: ICard[]) => {
                    return [new GetBoardSuccess(cards)];
                }),
                catchError((err: any) => {
                    // tslint:disable-next-line
                    console.log(err);
                    if (err.status !== 402) {
                        alert('Invalid username or password');
                    }
                    return of(new GetBoardError(err));
                })
            )
        )
    );

    @Effect()
    public createCard$: Observable<Action> = this.actions$.pipe(
        ofType<any>(CREATE_CARD_PENDING),
        map((action: any) => action.payload),
        switchMap((_c: ICard) =>
            of({ ..._c, status: CardStatus.BACKLOG, _id: Date.now().toString() }).pipe(
                mergeMap((card: ICard) => {
                    return [new CreateCardSuccess(card)];
                }),
                catchError((err: any) => {
                    // tslint:disable-next-line
                    console.log(err);
                    if (err.status !== 402) {
                        alert('Invalid username or password');
                    }
                    return of(new CreateCardError(err));
                })
            )
        )
    );

    @Effect()
    public removeCard$: Observable<Action> = this.actions$.pipe(
        ofType<any>(REMOVE_CARD_PENDING),
        map((action: any) => action.payload),
        switchMap((_c: ICard) =>
            of(_c).pipe(
                mergeMap((card: ICard) => {
                    return [new RemoveCardSuccess(card)];
                }),
                catchError((err: any) => {
                    // tslint:disable-next-line
                    console.log(err);
                    if (err.status !== 402) {
                        alert('Invalid username or password');
                    }
                    return of(new RemoveCardError(err));
                })
            )
        )
    );

    @Effect()
    public changeCard$: Observable<Action> = this.actions$.pipe(
        ofType<any>(CHANGE_CARD_PENDING),
        map((action: any) => action.payload),
        switchMap((_c: ICard) =>
            of(_c).pipe(
                mergeMap((card: ICard) => {
                    return [new ChangeCardSuccess(card)];
                }),
                catchError((err: any) => {
                    // tslint:disable-next-line
                    console.log(err);
                    if (err.status !== 402) {
                        alert('Invalid username or password');
                    }
                    return of(new ChangeCardError(err));
                })
            )
        )
    );

    public constructor(private actions$: Actions<BoardActions>) {}
}
