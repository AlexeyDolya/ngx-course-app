import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';

import { INotify, pagination } from '@rootStore/reducers/notify.reducer';
import { ChangeEventStatus } from '@rootStore/actions/notify.actions';
import { skip, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChangePage } from 'src/app/store/actions/notify.actions';
import { ActivatedRoute, Params } from '@angular/router';
import { Go } from '@rootStore/actions/router.action';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
    public searchText: string = '';
    public displayedColumns: string[] = ['status', 'title', 'text', 'author', 'date'];
    public dataSource: INotify[] = [];
    public length: number = 0;
    public page: number = 0;
    private _controlUnsubscribe$$: Subject<boolean> = new Subject();

    public constructor(private _store: Store<EntityState<INotify>>, private _activatedRoute: ActivatedRoute) {}

    public ngOnInit(): void {
        this._activatedRoute.queryParams
            .pipe(
                skip(1),
                takeUntil(this._controlUnsubscribe$$)
            )
            .subscribe((query: Params) => {
                this._store.dispatch(new ChangePage(Number(query.page)));
            });

        //  this._store.dispatch(new GetNotifyPending());
        this._store
            .select(pagination())
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
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
        this._controlUnsubscribe$$.complete();
    }
}
