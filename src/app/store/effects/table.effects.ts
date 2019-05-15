import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MessagingService } from '@shared/services/notification.service';
import {
    ChangePageFail,
    ChangePagePending,
    ChangePageSuccess,
    EventsTableActions,
    EventsTableTypes,
} from '@rootStore/actions/eventsTable.actions';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class TableEffects {
    @Effect()
    public notify$: Observable<any> = this.actions$.pipe(
        ofType<any>(EventsTableActions.CHANGE_PAGE_PENDING),
        map((action: ChangePagePending) => action.payload),
        switchMap((page: number) => this._messagingService.getPerPage(page)),
        map((data: any) => new ChangePageSuccess({ page: data.page, events: data.table, length: data.length })),
        catchError((err: any) => {
            return of(new ChangePageFail(err));
        })
    );

    public constructor(private actions$: Actions<EventsTableTypes>, private _messagingService: MessagingService) {}
}
