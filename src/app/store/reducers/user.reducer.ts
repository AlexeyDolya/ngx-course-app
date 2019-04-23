import { SET_USER } from '../actions/user.action';

export type IAdress = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
};

export interface IUser {
    accessToken: string;
    createdAt: Date;
    email: string;
    username: string;
    _id: string;
    adress?:  IAdress[];
}

export const initialState: IUser = {
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
