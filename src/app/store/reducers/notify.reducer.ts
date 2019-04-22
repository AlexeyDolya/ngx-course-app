import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { GetNotifySuccess, NotifyActions } from '../actions/notify.actions';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export interface INotify {
    _id: string;
    title: string;
    text: string;
    users: any;
    dateSend: Date;
    author?: string;
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
            return notifys.filter((notify: INotify) => notify.users.status).length;
        }
    );
}
