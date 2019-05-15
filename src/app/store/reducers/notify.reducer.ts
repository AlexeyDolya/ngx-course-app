import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { NotifyActions } from '../actions/notify.actions';
import { EventsTableActions } from '@rootStore/actions/eventsTable.actions';

export interface INotify {
    status: boolean;
    title: string;
    text: string;
    author?: string;
    dateSend: Date;
    _id: string;
}

export interface INotifyState {
    events: EntityState<INotify>;
    page: number;
    length: number;
    unreadEvents: number;
}

export const adapter: EntityAdapter<INotify> = createEntityAdapter({
    selectId: (notify: INotify) => notify._id,
});

const initialState: INotifyState = {
    events: adapter.getInitialState([]),
    page: 0,
    length: 0,
    unreadEvents: 0,
};

export function notifyReducer(state: INotifyState = initialState, action: any): INotifyState {
    switch (action.type) {
        case NotifyActions.GET_UNREAD_PENDING: {
            return { ...state, unreadEvents: 0 };
        }
        case NotifyActions.GET_UNREAD_SUCCESS: {
            return { ...state, unreadEvents: action.payload };
        }
        case NotifyActions.CHANGE_NOTIFY_STATUS_SUCCESS: {
            return { ...state, events: adapter.upsertOne(action.payload, state.events) };
        }
        case EventsTableActions.CHANGE_PAGE_PENDING: {
            return { ...state, events: adapter.removeAll(state.events), page: action.payload.page, length: 0 };
        }
        case EventsTableActions.CHANGE_PAGE_SUCCESS: {
            return {
                ...state,
                events: adapter.upsertMany(action.payload.events, state.events),
                page: action.payload.page,
                length: action.payload.length,
            };
        }
        default: {
            return state;
        }
    }
}
