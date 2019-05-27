import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { adapter, INotify, INotifyState } from '@rootStore/reducers/notify.reducer';

export const page: any = createSelector(
    createFeatureSelector<any>('eventsTable'),
    (eventsTable: INotifyState) => {
        return eventsTable.page;
    }
);

export const length: any = createSelector(
    createFeatureSelector<any>('eventsTable'),
    (eventsTable: INotifyState) => {
        return eventsTable.length;
    }
);

export const { selectAll } = adapter.getSelectors(
    createSelector(
        createFeatureSelector<any>('eventsTable'),
        (eventsTable: INotifyState) => {
            return eventsTable.events;
        }
    )
);

export const unread: any = createSelector(
    createFeatureSelector<any>('eventsTable'),
    (eventsTable: INotifyState) => {
        return eventsTable.unreadEvents;
    }
);

export function getTable(): MemoizedSelector<any, any> {
    return createSelector(
        selectAll,
        ( notifies: INotify[]) => {
            return {
                events: notifies,
            };
        }
    );
}
