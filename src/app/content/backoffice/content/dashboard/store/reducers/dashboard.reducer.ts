import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { BoardActions } from '../actions/dashboard.action';

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
        case BoardActions.GET_BOARD_SUCCESS: {
            return adapter.upsertMany(action.payload, state);
        }
        case BoardActions.CHANGE_CARD_SUCCESS: {
            return adapter.upsertOne(action.payload, state);
        }
        case BoardActions.CREATE_CARD_SUCCESS: {
            return adapter.addOne(action.payload, state);
        }
        case BoardActions.REMOVE_CARD_SUCCESS: {
            return adapter.removeOne(action.payload._id, state);
        }
        default: {
            return state;
        }
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
