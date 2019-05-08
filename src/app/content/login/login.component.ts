import { IRootState } from '@rootStore/reducers';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Login } from '@rootStore/actions/auth.action';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public constructor(private _store: Store<IRootState>) {}

    public login(userData: { username: string; password: string }): void {
        this._store.dispatch(new Login(userData));
    }
}
