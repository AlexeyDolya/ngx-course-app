import { UserActions } from '../actions/user.action';

export type IAdress = {
    street: string;
    city: string;
    state: string;
    zip: string;
};

export interface IUser {
    name: string;
    surname: string;
    accessToken: string;
    createdAt: Date;
    email: string;
    username: string;
    _id: string;
    adress?: IAdress[];
}

export const initialState: IUser = {
    name: '',
    surname: '',
    username: '',
    email: '',
    accessToken: '',
    createdAt: new Date(),
    _id: '',
    adress: [],
};

// tslint:disable-next-line: no-any
export function userReducer(state: IUser = initialState, action: any): IUser {
    switch (action.type) {
        case UserActions.SET_USER: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case UserActions.EDIT_USER_SUCCESS: {
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
