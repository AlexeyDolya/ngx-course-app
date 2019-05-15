import { Logout } from '@rootStore/actions/auth.action';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootState } from '@rootStore/reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { unread } from '@rootStore/selectors/notify.selectors';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input()
    public drawer: any;
    public counter: number = 0;
    public headerTitleColor: SafeStyle = this._sanitizer.bypassSecurityTrustStyle('color:orange;');

    private _controlUnsubscribe$$: Subject<boolean> = new Subject();

    public constructor(private _sanitizer: DomSanitizer, private _store: Store<IRootState>) {}

    public ngOnInit(): void {
        this._store
            .select(unread)
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
        this._controlUnsubscribe$$.complete();
    }
}
