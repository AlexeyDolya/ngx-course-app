import { SET_USER } from '../actions/user.action';

export interface IAuthState {
    isLogged: boolean;
    loading: boolean;
}

export interface IUser {
    accessToken: string;
    createdAt: Date;
    email: string;
    username: string;
    _id: string;
}

export const initialState: any = {
    username: '',
    email: '',
    accessToken: '',
    createdAt: new Date(),
    _id: '',
};

// tslint:disable-next-line: no-any
export function userReducer(state: IAuthState = initialState, action: any): IAuthState {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                ...action.payload,
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
        // tslint:disable-next-line
        console.log(err);
        localStorage.removeItem('accessToken');
        return {
            ...initialState,
            isLogged: false,
        };
    }
}
