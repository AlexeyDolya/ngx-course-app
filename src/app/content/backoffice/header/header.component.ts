import { Logout } from '@rootStore/actions/auth.action';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootState } from '@rootStore/reducers';
import { getUnread } from '@rootStore/reducers/notify.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input()
    public drawer: any;
    public counter: number = 0;
    private _controlUnsubscribe$$: Subject<boolean> = new Subject();

    public constructor(private _store: Store<IRootState>) {}

    public ngOnInit(): void {
        this._store
            .select(getUnread())
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((counter: number) => {
                this.counter = counter;
            });
    }

    public logout(): void {
        this._store.dispatch(new Logout());
    }

    public toggleSideBar(): void {
        this.drawer.toggle();
    }
    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
    }
}
