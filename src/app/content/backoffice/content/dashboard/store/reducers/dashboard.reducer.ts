import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import {
    CHANGE_CARD_SUCCESS,
    CREATE_CARD_SUCCESS,
    GET_BOARD_SUCCESS,
    REMOVE_CARD_SUCCESS,
} from '../actions/dashboard.action';

// export type CardStatus = 'backlog' | 'progress' | 'qa' | 'done';

export enum CardStatus {
    BACKLOG = 'backlog',
    PROGRESS = 'progress',
    QA = 'qa',
    DONE = 'done',
}

export interface ICard {
    _id: string;
    description: string;
    status: CardStatus;
    owner?: any;
    date?: Date;
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
        case CHANGE_CARD_SUCCESS: {
            return adapter.upsertOne(action.payload, state);
        }
        case REMOVE_CARD_SUCCESS: {
            return adapter.removeOne(action.payload._id, state);
        }
        case CREATE_CARD_SUCCESS: {
            return adapter.addOne(action.payload, state);
        }
        default:
            return state;
    }
}

export const { selectAll } = adapter.getSelectors(createFeatureSelector('dashboard'));

export function filteredByStatusCards(status: CardStatus): MemoizedSelector<any, any> {
    return createSelector(
        selectAll,
        (cards: ICard[]) => {
            return cards.filter((card: ICard) => card.status === status);
        }
    );
}
