import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IRootState } from '@rootStore/reducers';
import { Host } from '@angular/core';
import { ChangePage, GetNotifyPending } from '@rootStore/actions/notify.actions';
import { map, skip, take } from 'rxjs/operators';
import { INotify, selectAll } from '@rootStore/reducers/notify.reducer';

export class EventsGuardService implements CanActivate {
    public constructor(@Host() private _store: Store<IRootState>) {}

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this._store.dispatch(new GetNotifyPending());
        return this._store.select(selectAll).pipe(
            skip(1),
            take(1),
            map((_events: INotify[] | null) => {
                // TODO problem if page don't exist
                const page: string | null = route.queryParamMap.get('page');
                if (!page) {
                    return true;
                }
                this._store.dispatch(new ChangePage(Number(page)));
                return true;
            })
        );
    }
}
