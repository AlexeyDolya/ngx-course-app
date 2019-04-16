import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';

import {authReducer, IAuthState} from './auth.reducer';

import {AuthActions, LOGOUT_SUCCESS} from '../actions/auth.action';
import {userReducer} from './user.reducer';

export interface IRootState {
  auth: IAuthState;
  user: any;
}

export const reducers: ActionReducerMap<IRootState> = {
  auth: authReducer,
  user: userReducer,
};

export function logoutAndClearState(reducer: ActionReducer<IRootState>): ActionReducer<IRootState> {
  return (state: IRootState | undefined, action: AuthActions): IRootState => {
    switch (action.type) {
      case LOGOUT_SUCCESS: {
        state = undefined;
      }
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<IRootState>[] = [logoutAndClearState];
