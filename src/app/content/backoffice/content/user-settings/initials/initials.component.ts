import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '@rootStore/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { IRootState } from '@rootStore/reducers';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EdittUserPending } from '@rootStore/actions/user.action';
import { ValidatorService } from '@shared/services/validator.service';

@Component({
    selector: 'app-initials',
    templateUrl: './initials.component.html',
    styleUrls: ['./initials.component.scss'],
})
export class InitialsComponent implements OnInit, OnDestroy {
    public userInfoForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, this._validatorService.usernameValidator]),
        surname: new FormControl('', [Validators.required, this._validatorService.usernameValidator]),
        male: new FormControl(true),
    });

    private _controlUnsubscribe$$: Subject<boolean> = new Subject();
    public constructor(private _store: Store<IRootState>, private _validatorService: ValidatorService) {}

    public ngOnInit(): void {
        this._store
            .select('user')
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((user: IUser) => {
                this.userInfoForm.patchValue({
                    name: user.name,
                    surname: user.surname,
                    male: user.gender,
                });
            });
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
        this._controlUnsubscribe$$.complete();
    }

    public onSubmit(): void {
        this._store.dispatch(new EdittUserPending(this.userInfoForm.value));
    }
}
