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

export const adapter: EntityAdapter<INotify> = createEntityAdapter({
    selectId: (notify: INotify) => notify._id,
});

const initialState: EntityState<INotify> = adapter.getInitialState([]);

export function notifyReducer(state: EntityState<INotify> = initialState, action: any): EntityState<INotify> {
    switch (action.type) {
        case NotifyActions.GET_NOTIFY_PENDING: {
            return adapter.removeAll(state);
        }
        case NotifyActions.GET_NOTIFY_SUCCESS: {
            return adapter.upsertMany(action.payload, state);
        }
        case NotifyActions.CHANGE_NOTIFY_STATUS_SUCCESS: {
            return adapter.upsertOne(action.payload, state);
        }
        default: {
            return state;
        }
    }
}

export const { selectAll } = adapter.getSelectors(createFeatureSelector('events'));

export function getUnread(): MemoizedSelector<any, any> {
    return createSelector(
        selectAll,
        (notifys: INotify[]) => {
            return notifys.filter((notify: INotify) => notify.status).length;
        }
    );
}
