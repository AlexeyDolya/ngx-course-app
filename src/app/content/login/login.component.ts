import { IRootState } from './../../store/reducers/index';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/store/actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public constructor(
    private _store: Store<IRootState>,
  ) { }

  ngOnInit() {
  }


  public login(email: string): void {
    this._store.dispatch(new Login({
      username: 'igor12334',
      password: '1212334'
    }));
  }

}
