import { ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';

import { authReducer, IAuthState } from './auth.reducer';

import { AuthActions, AuthActionsType } from '../actions/auth.action';
import { userReducer } from './user.reducer';

import { notifyReducer } from './notify.reducer';
import * as fromRouter from '@ngrx/router-store';
import { Params } from '@angular/router';

export interface IRouterStateUrl {
    url: string;
    queryParams: Params;
}

export interface IRootState {
    auth: IAuthState;
    user: any;
    events: any;
    routerReducer?: fromRouter.RouterReducerState<IRouterStateUrl>;
}

export const reducers: ActionReducerMap<IRootState> = {
    auth: authReducer,
    user: userReducer,
    events: notifyReducer,
    routerReducer: fromRouter.routerReducer
};

export function logoutAndClearState(reducer: ActionReducer<IRootState>): ActionReducer<IRootState> {
    return (state: IRootState | undefined, action: AuthActionsType): IRootState => {
        switch (action.type) {
            case AuthActions.LOGOUT_SUCCESS: {
                state = undefined;
            }
        }
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<IRootState>[] = [logoutAndClearState];

// tslint:disable-next-line:typedef
export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<IRouterStateUrl>>('routerReducer');