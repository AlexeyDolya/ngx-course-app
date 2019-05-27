import { AuthActions, AuthActionsType } from '../actions/auth.action';

export interface IAuthState {
    isLogged: boolean;
    loading: boolean;
}

export const initialState: IAuthState = {
    isLogged: false,
    loading: false,
};

export function authReducer(state: IAuthState = initialLoggedState(), action: AuthActionsType): IAuthState {
    switch (action.type) {
        case AuthActions.SIGN_UP_SUCCESS: {
            return {
                ...state,
                loading: false,
                isLogged: true,
            };
        }

        case AuthActions.LOGIN: {
            return {
                ...state,
                loading: true,
            };
        }

        case AuthActions.LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                isLogged: true,
            };
        }

        case AuthActions.LOGIN_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }

        case AuthActions.SIGN_UP: {
            return {
                ...state,
                loading: true,
            };
        }

        case AuthActions.SIGN_UP_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }

        case AuthActions.LOGOUT_SUCCESS: {
            return {
                ...initialState,
            };
        }

        default: {
            return state;
        }
    }
}

function initialLoggedState(): IAuthState {
    try {
        const token: string = localStorage.getItem('accessToken') as string;
        return {
            ...initialState,
            isLogged: token ? true : false,
        };
    } catch (err) {
        localStorage.removeItem('accessToken');
        return {
            ...initialState,
            isLogged: false,
        };
    }
}
