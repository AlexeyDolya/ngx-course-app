import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { GetNotifySuccess, NotifyActions } from '../actions/notify.actions';
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

export function notifyReducer(state: EntityState<INotify> = initialState, action: NotifyActions): EntityState<INotify> {
    if (action instanceof GetNotifySuccess) {
        return adapter.upsertMany(action.payload, state);
    }
    return state;
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
