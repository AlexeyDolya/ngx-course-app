import { IEvent } from '../reducers/events.reducer';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { EventsActions, GET_EVENTS_PENDING, GetEventsError, GetEventsSuccess } from '../actions/events.action';

@Injectable()
export class EventsEffects {
    @Effect()
    public getEvents$: Observable<Action> = this.actions$.pipe(
        ofType<any>(GET_EVENTS_PENDING),
        switchMap(() =>
            of([]).pipe(
                mergeMap((cards: IEvent[]) => {
                    return [new GetEventsSuccess(cards)];
                }),
                catchError((err: any) => {
                    // tslint:disable-next-line
                    console.log(err);
                    if (err.status !== 402) {
                        alert('Invalid username or password');
                    }
                    return of(new GetEventsError(err));
                })
            )
        )
    );

    public constructor(private actions$: Actions<EventsActions>) {}
}
