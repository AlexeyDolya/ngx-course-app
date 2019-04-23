import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { INotify, selectAll } from '../../../../store/reducers/notify.reducer';
import { ChangeEventStatus, GetNotifyPending } from '../../../../store/actions/notify.actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface IPeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
    public searchText: string = '';
    public displayedColumns: string[] = ['status', 'title', 'text', 'author', 'date'];
    public dataSource: INotify[] = [];

    private _controlUnsubscribe$$: Subject<boolean> = new Subject();

    public constructor(private _store: Store<EntityState<INotify>>) {}

    public applyFilter(event: KeyboardEvent): void {
        const inputEl: HTMLInputElement = event.target as HTMLInputElement;
        this.searchText = inputEl.value;
    }

    public ngOnInit(): void {
        this._store.dispatch(new GetNotifyPending());
        this._store
            .select(selectAll)
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((dataSource: INotify[]) => {
                this.dataSource = dataSource;
            });
    }

    public changeStatus(_id: string): void {
        this._store.dispatch(new ChangeEventStatus(_id));
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
    }
}
