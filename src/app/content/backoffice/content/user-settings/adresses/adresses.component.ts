import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRootState } from '@rootStore/reducers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAdress, IUser } from '@rootStore/reducers/user.reducer';
import { EdittUserPending } from '@rootStore/actions/user.action';
import { ValidatorService } from '@shared/services/validator.service';

@Component({
    selector: 'app-adresses',
    templateUrl: './adresses.component.html',
    styleUrls: ['./adresses.component.scss'],
})
export class AdressesComponent implements OnInit, OnDestroy {
    public get address(): FormArray {
        return this.form.get('address') as FormArray;
    }

    public form: FormGroup = new FormGroup({
        address: new FormArray([
            new FormGroup({
                street: new FormControl('', [Validators.required, this._validatorService.usernameValidator]),
                city: new FormControl('', [Validators.required, this._validatorService.usernameValidator]),
                state: new FormControl('', [Validators.required, this._validatorService.usernameValidator]),
                zip: new FormControl('', [Validators.required, this._validatorService.zipCodeValidator]),
            }),
        ]),
    });
    private _controlUnsubscribe$$: Subject<boolean> = new Subject();
    private user!: IUser;

    public constructor(private _store: Store<IRootState>, private _validatorService: ValidatorService) {}

    public ngOnInit(): void {
        this._store
            .select('user')
            .pipe(takeUntil(this._controlUnsubscribe$$))
            .subscribe((user: IUser) => {
                this.user = user;
            });
        this.fillAddress(this.user.adress);
    }

    public ngOnDestroy(): void {
        this._controlUnsubscribe$$.next(true);
        this._controlUnsubscribe$$.complete();
    }

    public onSubmit(): void {
        this._store.dispatch(
            new EdittUserPending({
                ...this.user,
                adress: this.address.getRawValue(),
            })
        );
    }

    public addAddress(): void {
        this.address.push(
            new FormGroup({
                street: new FormControl('', [Validators.required, this._validatorService.usernameValidator]),
                city: new FormControl('', [Validators.required, this._validatorService.usernameValidator]),
                state: new FormControl('', [Validators.required, this._validatorService.usernameValidator]),
                zip: new FormControl('', [Validators.required, this._validatorService.zipCodeValidator]),
            })
        );
    }

    public removeAdr(index: number): void {
        this.address.removeAt(index);
    }

    private fillAddress(address: IAdress[] | undefined): void {
        if (address && address.length > 0) {
            this.address.removeAt(0);
            address.forEach((item: IAdress) =>
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
