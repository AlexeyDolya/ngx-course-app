/* tslint:disable */
import { Action } from '@ngrx/store';
import { IEvent } from '../reducers/events.reducer';

export const GET_EVENTS_PENDING: string = '[Board] GET_EVENTS_PENDING';
export const GET_EVENTS_SUCCESS: string = '[Board] GET_EVENTS_SUCCESS';
export const GET_EVENTS_ERROR: string = '[Board] GET_EVENTS_ERROR';

// tslint:disable-next-line: max-classes-per-file
export class GetEventsPending implements Action {
    public readonly type: string = GET_EVENTS_PENDING;
}

// tslint:disable-next-line: max-classes-per-file
export class GetEventsSuccess implements Action {
    public readonly type: string = GET_EVENTS_SUCCESS;

    public constructor(public payload: IEvent[]) {}
}

// tslint:disable-next-line: max-classes-per-file
export class GetEventsError implements Action {
    public readonly type: string = GET_EVENTS_ERROR;

    public constructor(public payload: Error) {}
}

export type EventsActions = GetEventsPending | GetEventsSuccess | GetEventsError;
