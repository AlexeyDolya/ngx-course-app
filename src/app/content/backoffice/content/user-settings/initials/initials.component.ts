import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from '../../../../../store/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { IRootState } from '../../../../../store/reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-initials',
    templateUrl: './initials.component.html',
    styleUrls: ['./initials.component.scss'],
})
export class InitialsComponent implements OnInit, OnDestroy {
    @Input()
    public user!: IUser;

    public userInfoForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        surname: new FormControl(''),
    });
    private _controlUnsubscribe$$: Subject<boolean> = new Subject();
    public constructor(private _store: Store<IRootState>) {}

    public ngOnInit(): void {
        this._store
            .select('user')
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((user: IUser) => {
                this.user = user;
                this.userInfoForm.patchValue({ name: this.user.name, surname: this.user.surname });
            });
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
    }

    public onSubmit(): void {
        this.user = {
            ...this.user,
            name: this.userInfoForm.value.name,
            surname: this.userInfoForm.value.surname,
        };
        // TODO dispatch
        this._store.dispatch();
    }
}
