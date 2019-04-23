import { SET_USER } from '../actions/user.action';

export interface IUser {
    name: string;
    surname: string;
    accessToken: string;
    createdAt: Date;
    email: string;
    username: string;
    _id: string;
}

export const initialState: IUser = {
    name: 'qwe',
    surname: 'qwe',
    username: '',
    email: '',
    accessToken: '',
    createdAt: new Date(),
    _id: '',
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
