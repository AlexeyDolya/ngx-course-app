import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { authReducer, IAuthState } from './auth.reducer';

import { AuthActions, AuthActionsType } from '../actions/auth.action';
import { userReducer } from './user.reducer';

import { INotifyState, notifyReducer } from './notify.reducer';
import * as fromRouter from '@ngrx/router-store';
import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface IRouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface IRootState {
    auth: IAuthState;
    user: any;
    eventsTable: INotifyState;
    routerReducer?: fromRouter.RouterReducerState<IRouterStateUrl>;
}

export const reducers: ActionReducerMap<IRootState> = {
    auth: authReducer,
    user: userReducer,
    eventsTable: notifyReducer,
    routerReducer: fromRouter.routerReducer,
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

export class CustomRouterSerializer implements RouterStateSerializer<IRouterStateUrl> {
    public serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
        const {
            url,
            root: { queryParams },
        } = routerState;

        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }
        const { params } = state;
        return { url, queryParams, params };
    }
}

export const metaReducers: MetaReducer<IRootState>[] = [logoutAndClearState];
