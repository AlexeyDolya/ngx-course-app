import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import {
    BoardActions,
    ChangeCardSuccess,
    CreateCardSuccess,
    GetBoardSuccess,
    RemoveCardSuccess,
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

export function dashboardReducer(state: EntityState<ICard> = initialState, action: BoardActions): EntityState<ICard> {
    if (action instanceof GetBoardSuccess) {
        return adapter.upsertMany(action.payload, state);
    }
    if (action instanceof ChangeCardSuccess) {
        return adapter.upsertOne(action.payload, state);
    }
    if (action instanceof CreateCardSuccess) {
        return adapter.addOne(action.payload, state);
    }
    if (action instanceof RemoveCardSuccess) {
        return adapter.removeOne(action.payload._id, state);
    }
    return state;
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
