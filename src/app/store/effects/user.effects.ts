import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '@shared/services/auth.service';
import {
    EdittUserFail,
    EdittUserPending,
    EdittUserSuccess,
    UserActions,
    UserActionsTypes,
} from '../actions/user.action';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IUser } from '../reducers/user.reducer';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UserEffects {
    @Effect()
    public editUser$: Observable<any> = this.actions$.pipe(
        ofType<any>(UserActions.EDIT_USER_PENDING),
        map((action: EdittUserPending) => action.payload),
        switchMap((user: IUser) => this._authService.editUser(user)),
        map((user: IUser) => new EdittUserSuccess(user)),
        tap(() =>
            this._snackBar.open('Данные успешно обновлены', '', {
                duration: 1500,
                panelClass: ['color-snack'],
                horizontalPosition: 'center',
            })
        ),
        catchError((err: any) => {
            this._snackBar.open('Ошибка при редактировании данных', '', {
                duration: 1500,
                panelClass: ['color-snack'],
                horizontalPosition: 'center',
            });
            return of(new EdittUserFail(err));
        })
    );

    public constructor(
        private actions$: Actions<UserActionsTypes>,
        private _authService: AuthService,
        private _snackBar: MatSnackBar
    ) {}
}
