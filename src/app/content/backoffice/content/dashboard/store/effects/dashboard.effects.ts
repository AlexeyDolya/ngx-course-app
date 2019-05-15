import { ICard } from '../reducers/dashboard.reducer';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
    BoardActions,
    BoardActionsTypes,
    ChangeCardError,
    ChangeCardSuccess,
    CreateCardError,
    CreateCardSuccess,
    GetBoardError,
    GetBoardSuccess,
    RemoveCardError,
    RemoveCardSuccess,
} from '../actions/dashboard.action';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BoardEffects {
    @Effect()
    public getBoard$: Observable<Action> = this.actions$.pipe(
        ofType<any>(BoardActions.GET_BOARD_PENDING),
        switchMap(() =>
            this._http.get<ICard[]>(`/cards/all`).pipe(
                mergeMap((cards: ICard[]) => {
                    return [new GetBoardSuccess(cards)];
                }),
                catchError((err: any) => {
                    return of(new GetBoardError(err));
                })
            )
        )
    );

    @Effect()
    public createCard$: Observable<Action> = this.actions$.pipe(
        ofType<any>(BoardActions.CREATE_CARD_PENDING),
        map((action: any) => action.payload),
        switchMap((c: ICard) =>
            this._http.post<ICard>(`/cards/create`, c).pipe(
                mergeMap((card: ICard) => {
                    return [new CreateCardSuccess(card)];
                }),
                catchError((err: any) => {
                    return of(new CreateCardError(err));
                })
            )
        )
    );

    @Effect()
    public removeCard$: Observable<Action> = this.actions$.pipe(
        ofType<any>(BoardActions.REMOVE_CARD_PENDING),
        map((action: any) => action.payload),
        switchMap((_c: ICard) =>
            this._http.delete<ICard>(`/cards/by/${_c._id}`).pipe(
                mergeMap((card: ICard) => {
                    return [new RemoveCardSuccess(card)];
                }),
                catchError((err: any) => {
                    return of(new RemoveCardError(err));
                })
            )
        )
    );

    @Effect()
    public changeCard$: Observable<Action> = this.actions$.pipe(
        ofType<any>(BoardActions.CHANGE_CARD_PENDING),
        map((action: any) => action.payload),
        switchMap((_c: ICard) =>
            this._http.put<ICard>(`/cards/by/${_c._id}`, _c).pipe(
                mergeMap((card: ICard) => {
                    return [new ChangeCardSuccess(card)];
                }),
                catchError((err: any) => {
                    return of(new ChangeCardError(err));
                })
            )
        )
    );

    public constructor(private actions$: Actions<BoardActionsTypes>, private _http: HttpClient) {}
}
