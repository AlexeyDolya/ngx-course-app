import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { CHANGE_CARD, GET_BOARD_SUCCESS } from '../actions/dashboard.action';

export type CardStatus = 'backlog' | 'inprogress' | 'qa' | 'done';

export interface ICard {
    _id: string;
    description: string;
    status: CardStatus;
}

export const adapter: EntityAdapter<ICard> = createEntityAdapter({
    selectId: (cart: ICard) => cart._id,
});

const initialState: EntityState<ICard> = adapter.getInitialState([]);

export function dashboardReducer(state: EntityState<ICard> = initialState, action: any): EntityState<ICard> {
    switch (action.type) {
        case GET_BOARD_SUCCESS: {
            return adapter.upsertMany(action.payload, state);
        }
        case CHANGE_CARD: {
            return adapter.upsertOne(action.payload, state);
        }

        //
        // case REMOVE_PRODUCT_FROM_CART:
        //   return adapter.removeOne(action.payload._id, state);
        // case INCREMENT_PRODUCT_IN_CART:
        //   return adapter.updateOne({
        //     id: action.payload._id,
        //     changes: { count: action.payload.count + 1 }
        //   }, state);
        // case DECREMENT_PRODUCT_IN_CART:
        //   return adapter.updateOne({
        //     id: action.payload._id,
        //     changes: { count: action.payload.count - 1 }
        //   }, state);
        default:
            return state;
    }
}

export const { selectAll } = adapter.getSelectors(createFeatureSelector('dashboard'));

export function filtredByStatusCards(status: CardStatus): MemoizedSelector<any, any> {
    return createSelector(
        selectAll,
        (cards: ICard[]) => {
            return cards.filter((card: ICard) => card.status === status);
        }
    );
}
