import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { NotifyActions } from '../actions/notify.actions';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

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
}

export const adapter: EntityAdapter<INotify> = createEntityAdapter({
    selectId: (notify: INotify) => notify._id,
});

const initialState: INotifyState = {
    events: adapter.getInitialState([]),
    page: 0
};

export function notifyReducer(state: INotifyState = initialState, action: any): INotifyState {
    switch (action.type) {
        case NotifyActions.GET_NOTIFY_PENDING: {
            return { ...state, events: adapter.removeAll(state.events) };
        }
        case NotifyActions.GET_NOTIFY_SUCCESS: {
            return { ...state, events: adapter.upsertMany(action.payload, state.events) };
        }
        case NotifyActions.CHANGE_NOTIFY_STATUS_SUCCESS: {
            return { ...state, events: adapter.upsertOne(action.payload, state.events) };
        }
        case NotifyActions.CHANGE_PAGE: {
            return { ...state, page: action.payload };
        }
        default: {
            return state;
        }
    }
}

export const page: any = createSelector(
    createFeatureSelector<any>('eventsTable'),
    (eventsTable: INotifyState) => {
        return eventsTable.page;
    }
);


export const { selectAll } = adapter.getSelectors(createSelector(
    createFeatureSelector<any>('eventsTable'),
    (eventsTable: INotifyState) => {
        return eventsTable.events;
    }
));


export function getUnread(): MemoizedSelector<any, any> {
    return createSelector(
        selectAll,
        (notifys: INotify[]) => {
            return notifys.filter((notify: INotify) => notify.status).length;
        }
    );
}

export function pagination(): MemoizedSelector<any, any> {
    return createSelector(
        page,
        selectAll,
        ( _page: number, notifys: INotify[]) => {
            const perPage: number = 10;
            return notifys.slice(_page * perPage, (_page + 1) * perPage);
        }
    );
}
