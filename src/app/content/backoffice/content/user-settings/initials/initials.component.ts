import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from '@rootStore/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { IRootState } from '@rootStore/reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EdittUserPending } from '@rootStore/actions/user.action';

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
        male: new FormControl(true),
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
        this._store.dispatch(new EdittUserPending(this.user));
    }
}
