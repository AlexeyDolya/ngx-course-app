import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';

import { INotify, page, pagination  } from '@rootStore/reducers/notify.reducer';
import { ChangeEventStatus, GetNotifyPending } from '@rootStore/actions/notify.actions';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { selectAll } from 'src/app/store/reducers/notify.reducer';
import { ChangePage } from 'src/app/store/actions/notify.actions';

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
    public page!: Observable<number>;
    private _controlUnsubscribe$$: Subject<boolean> = new Subject();

    public constructor(private _store: Store<EntityState<INotify>>) {}

    public applyFilter(event: KeyboardEvent): void {
        const inputEl: HTMLInputElement = event.target as HTMLInputElement;
        this.searchText = inputEl.value;
    }

    public ngOnInit(): void {
        this._store.dispatch(new GetNotifyPending());
        this._store
            .select(pagination())
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((dataSource: INotify[]) => {
                this.dataSource = dataSource;
            });
        this.page = this._store.select(page);
         this._store.select(selectAll).pipe(takeUntil(this._controlUnsubscribe$$))
        .subscribe((dataSource: INotify[]) => {
            this.length = dataSource.length;
        });

    }

    public changeStatus(_id: string): void {
        this._store.dispatch(new ChangeEventStatus(_id));
    }

    public changePage(index: number): void {
        this._store.dispatch(new ChangePage(index));
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
    }
}
