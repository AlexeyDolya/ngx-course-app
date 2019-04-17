import { ICard } from '../reducers/dashboard.reducer';

const mockedCard: ICard[] = [
    {
        _id: '1',
        description: 'Task 1',
        status: 'backlog',
    },
    {
        _id: '2',
        description: 'Task 2',
        status: 'backlog',
    },
    {
        _id: '3',
        description: 'Task 3',
        status: 'backlog',
    },
    {
        _id: '4',
        description: 'Task 4',
        status: 'backlog',
    },
];

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { BoardActions, GET_BOARD, GetBoardFail, GetBoardSuccess } from '../actions/dashboard.action';

@Injectable()
export class BoardEffects {
    @Effect()
    public getBoard$: Observable<Action> = this.actions$.pipe(
        ofType<any>(GET_BOARD),
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
                    return of(new GetBoardFail(err));
                })
            )
        )
    );

    public constructor(private actions$: Actions<BoardActions>) {}
}
