import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRootState } from '../../../../../store/reducers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAdress, IUser } from '../../../../../store/reducers/user.reducer';
import { EdittUserPending } from '../../../../../store/actions/user.action';

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
                street: new FormControl(''),
                city: new FormControl(''),
                state: new FormControl(''),
                zip: new FormControl(''),
            }),
        ]),
    });
    private _controlUnsubscribe$$: Subject<boolean> = new Subject();
    private user!: IUser;

    public constructor(private _store: Store<IRootState>) {}

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
                street: new FormControl(''),
                city: new FormControl(''),
                state: new FormControl(''),
                zip: new FormControl(''),
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
                        street: new FormControl(item.street),
                        city: new FormControl(item.city),
                        state: new FormControl(item.state),
                        zip: new FormControl(item.zipCode),
                    })
                )
            );
        }
    }
}
