import { IRootState } from '@rootStore/reducers';
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Login } from '@rootStore/actions/auth.action';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @ViewChild('f', { static: true })
    public form!: FormGroup;

    public constructor(private _store: Store<IRootState>) {}

    public ngOnInit(): void {
        // console.log(this.form);
    }

    public login(userData: { username: string; password: string }): void {
        this._store.dispatch(new Login(userData));
    }
}
