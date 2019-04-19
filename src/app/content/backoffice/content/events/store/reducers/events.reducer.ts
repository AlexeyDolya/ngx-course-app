import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { EventsActions, GetEventsSuccess } from '../actions/events.action';

export interface IEvent {
    _id: string;
}

export const adapter: EntityAdapter<IEvent> = createEntityAdapter({
    selectId: (cart: IEvent) => cart._id,
});

const initialState: EntityState<IEvent> = adapter.getInitialState([]);

export function eventsReducer(state: EntityState<IEvent> = initialState, action: EventsActions): EntityState<IEvent> {
    if (action instanceof GetEventsSuccess) {
        return adapter.upsertMany(action.payload, state);
    }
    return state;
}

export const { selectAll } = adapter.getSelectors(createFeatureSelector('dashboard'));

// export function filteredByStatusCards(status: CardStatus): MemoizedSelector<any, any> {
//   return createSelector(
//     selectAll,
//     (cards: ICard[]) => {
//       return cards.filter((card: ICard) => card.status === status);
//     }
//   );
// }
