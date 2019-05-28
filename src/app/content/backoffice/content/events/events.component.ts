import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';

import { INotify } from '@rootStore/reducers/notify.reducer';
import { ChangeEventStatus } from '@rootStore/actions/notify.actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getTable } from '@rootStore/selectors/notify.selectors';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
    public searchText: string = '';
    public dataSource: INotify[] = [];
    private _controlUnsubscribe$$: Subject<boolean> = new Subject();

    public constructor(private _store: Store<EntityState<INotify>>) {}

    public ngOnInit(): void {
        this._store
            .select(getTable())
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe(({ events }: { events: INotify[] }) => {
                this.dataSource = events;
            });
    }

    public applyFilter(event: KeyboardEvent): void {
        const inputEl: HTMLInputElement = event.target as HTMLInputElement;
        this.searchText = inputEl.value;
    }

    public changeStatus(_id: string): void {
        this._store.dispatch(new ChangeEventStatus(_id));
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
        this._controlUnsubscribe$$.complete();
    }
}
