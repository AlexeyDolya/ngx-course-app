import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../shared/services/auth.service';
import {
    EdittUserFail,
    EdittUserPending,
    EdittUserSuccess,
    UserActions,
    UserActionsTypes,
} from '../actions/user.action';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IUser } from '../reducers/user.reducer';

@Injectable()
export class UserEffects {
    @Effect()
    public editUser$: Observable<any> = this.actions$.pipe(
        ofType<any>(UserActions.EDIT_USER_PENDING),
        map((action: EdittUserPending) => action.payload),
        switchMap((user: IUser) => this._authService.editUser(user)),
        map((user: IUser) => new EdittUserSuccess(user)),
        catchError((err: any) => {
            // tslint:disable-next-line
            console.log(err);
            return of(new EdittUserFail(err));
        })
    );

    public constructor(private actions$: Actions<UserActionsTypes>, private _authService: AuthService) {}
}
