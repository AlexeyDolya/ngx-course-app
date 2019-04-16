import {
    LOGIN,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS,
} from '../actions/auth.action';

export interface IAuthState {
    isLogged: boolean;
    loading: boolean;
}

export const initialState: IAuthState = {
    isLogged: false,
    loading: false,
};

// tslint:disable-next-line: no-any
export function authReducer(state: IAuthState = initialLoggedState(), action: any): IAuthState {
    switch (action.type) {
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                loading: false,
            };
        }

        case LOGIN: {
            return {
                ...state,
                loading: true,
            };
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                isLogged: true,
            };
        }

        case LOGIN_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }

        case SIGN_UP: {
            return {
                ...state,
                loading: true,
            };
        }

        case SIGN_UP_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }

        case LOGOUT_SUCCESS: {
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
        console.log(localStorage.getItem('accessToken'));
        const token: string = localStorage.getItem('accessToken') as string;
        return {
            ...initialState,
            isLogged: token ? true : false,
        };
    } catch (err) {
        // tslint:disable-next-line
        console.log(err);
        localStorage.removeItem('accessToken');
        return {
            ...initialState,
            isLogged: false,
        };
    }
}
