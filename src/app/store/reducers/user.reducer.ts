import { UserActions } from '../actions/user.action';

export type IAddress = {
    street: string;
    city: string;
    state: string;
    zip: string;
};

export interface IUser {
    name: string;
    surname: string;
    accessToken?: string;
    createdAt?: Date;
    email?: string;
    username?: string;
    _id?: string;
    address?: IAddress[];
    gender: boolean;
}

export const initialState: IUser = {
    name: '',
    surname: '',
    username: '',
    email: '',
    accessToken: '',
    createdAt: new Date(),
    _id: '',
    gender: false,
    address: [],
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
              // ...state,
              ...action.payload
            };
        }
        default: {
            return state;
        }
    }
}
