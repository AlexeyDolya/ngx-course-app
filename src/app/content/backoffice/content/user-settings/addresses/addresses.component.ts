import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRootState } from '@rootStore/reducers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAddress, IUser } from '@rootStore/reducers/user.reducer';
import { EdittUserPending } from '@rootStore/actions/user.action';
import { ValidatorService } from '@shared/services/validator.service';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit, OnDestroy {
    public get address(): FormArray {
        return this.form.get('address') as FormArray;
    }
    public emptyForm: FormGroup = this.fb.group({
        street: ['', [Validators.required, this._validatorService.usernameValidator]],
        city: ['', [Validators.required, this._validatorService.usernameValidator]],
        state: ['', [Validators.required, this._validatorService.usernameValidator]],
        zip: ['', [Validators.required, this._validatorService.zipCodeValidator]],
    });
    public form: FormGroup = this.fb.group({
        address: new FormArray([this.emptyForm]),
    });
    private _controlUnsubscribe$$: Subject<boolean> = new Subject();

    public constructor(
        private _store: Store<IRootState>,
        private _validatorService: ValidatorService,
        private fb: FormBuilder
    ) {}

    public ngOnInit(): void {
        this._store
            .select('user')
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((user: IUser) => {
                this.fillAddress(user.address);
            });
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
        this._controlUnsubscribe$$.complete();
    }

    public onSubmit(): void {
        this._store.dispatch(
            new EdittUserPending({
                address: this.address.getRawValue(),
            })
        );
    }

    public addAddress(): void {
        this.address.push(this.emptyForm);
    }

    public removeAdr(_index: number): void {
        this._store.dispatch(
            new EdittUserPending({
                index: _index,
            })
        );
    }
    private fillAddress(address: IAddress[] | undefined): void {
        if (address && address.length > 0) {
            while (this.address.length !== 0) {
              this.address.removeAt(0);
            }
            address.forEach((item: IAddress) =>
                this.address.push(
                    new FormGroup({
                        street: new FormControl(item.street, [
                            Validators.required,
                            this._validatorService.usernameValidator,
                        ]),
                        city: new FormControl(item.city, [
                            Validators.required,
                            this._validatorService.usernameValidator,
                        ]),
                        state: new FormControl(item.state, [
                            Validators.required,
                            this._validatorService.usernameValidator,
                        ]),
                        zip: new FormControl(item.zip, [Validators.required, this._validatorService.zipCodeValidator]),
                    })
                )
            );
        }
    }
}
