import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IRootState } from '@rootStore/reducers';
import { Host } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ChangePagePending } from '@rootStore/actions/eventsTable.actions';
import { Go } from '@rootStore/actions/router.action';

export class EventsGuardService implements CanActivate {
    public constructor(@Host() private _store: Store<IRootState>, private _http: HttpClient) {}

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        let page: string | null = route.queryParamMap.get('page');
        if (!page) {
            page = '0';
        }
        return this._http.get<any>(`/notification/checkPage?page=${Number(page)}`).pipe(
            map((data: any) => {
                if (data.pageExists) {
                    this._store.dispatch(new ChangePagePending(Number(page)));
                    return true;
                }
                this._store.dispatch(
                    new Go({
                        path: ['/backoffice/events'],
                        extras: { queryParams: { page: 0 } },
                    })
                );
                this._store.dispatch(new ChangePagePending(0));
                return true;
            })
        );
    }
}
