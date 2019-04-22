import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { getUnread, INotify } from '../../../../store/reducers/notify.reducer';
import { GetNotifyPending } from '../../../../store/actions/notify.actions';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface IPeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: IPeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
    public searchText: string = '';
    public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    public dataSource: IPeriodicElement[] = ELEMENT_DATA;

    private _controlUnsubscribe$$: Subject<boolean> = new Subject();

    public constructor(private _store: Store<EntityState<INotify>>) {}

    public applyFilter(event: KeyboardEvent): void {
        const inputEl: HTMLInputElement = event.target as HTMLInputElement;
        this.searchText = inputEl.value;
        //  this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public ngOnInit(): void {
        this._store.dispatch(new GetNotifyPending());
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
    }
}
