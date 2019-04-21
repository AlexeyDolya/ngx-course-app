import { ICard } from '../reducers/dashboard.reducer';

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
    RemoveCardSuccess,
} from '../actions/dashboard.action';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BoardEffects {
    @Effect()
    public getBoard$: Observable<Action> = this.actions$.pipe(
        ofType<any>(GET_BOARD_PENDING),
        switchMap(() =>
            this._http.get<ICard[]>(`/cards/all`).pipe(
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
        switchMap((c: ICard) =>
            this._http.post<ICard>(`/cards/create`, c).pipe(
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
            this._http.delete<ICard>(`/cards/by/${_c._id}`).pipe(
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
            this._http.put<ICard>(`/cards/by/${_c._id}`, _c).pipe(
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

    public constructor(private actions$: Actions<BoardActions>, private _http: HttpClient) {}
}
