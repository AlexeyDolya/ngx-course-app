import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';

import { INotify } from '@rootStore/reducers/notify.reducer';
import { ChangeEventStatus } from '@rootStore/actions/notify.actions';
import { skip, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Go } from '@rootStore/actions/router.action';
import { ChangePagePending } from '@rootStore/actions/eventsTable.actions';
import { getTable } from '@rootStore/selectors/notify.selectors';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
    public numbers: number[] = [1, 2, 3];
    public searchText: string = '';
    public displayedColumns: string[] = ['status', 'title', 'text', 'author', 'date'];
    public dataSource: INotify[] = [];
    public length: number = 0;
    public page: number = 0;
    private _controlUnsubscribe$$: Subject<boolean> = new Subject();
    private _curPage: number = 0;

    public constructor(private _store: Store<EntityState<INotify>>, private _activatedRoute: ActivatedRoute) {}

    public ngOnInit(): void {
        this._activatedRoute.queryParams
            .pipe(
                skip(1),
                takeUntil(this._controlUnsubscribe$$)
            )
            .subscribe((query: Params) => {
                this._curPage = Number(query.page);
            });

        this._store.dispatch(new ChangePagePending(this._curPage));
        this._store
            .select(getTable())
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe(({ page, events, count }: { page: number; events: INotify[]; count: number }) => {
                this.dataSource = events;
                this.length = count;
                this.page = page;
            });
    }

    public applyFilter(event: KeyboardEvent): void {
        const inputEl: HTMLInputElement = event.target as HTMLInputElement;
        this.searchText = inputEl.value;
    }

    public changeStatus(_id: string): void {
        this._store.dispatch(new ChangeEventStatus(_id));
    }

    public changePage(index: number): void {
        this._store.dispatch(
            new Go({
                path: ['/backoffice/events'],
                extras: { queryParams: { page: index } },
            })
        );
        this._store.dispatch(new ChangePagePending(index));
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
        this._controlUnsubscribe$$.complete();
    }
}
