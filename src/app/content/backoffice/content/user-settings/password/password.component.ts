import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRootState } from '../../../../../store/reducers';
import { EdittUserPending } from '../../../../../store/actions/user.action';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
    public constructor(private _store: Store<IRootState>) {}

    public onSubmit(value: any): void {
        this._store.dispatch(new EdittUserPending({ oldPass: value.oldPass, pass: value.password.password }));
    }
}
