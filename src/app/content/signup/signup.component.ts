import {SignUp} from './../../store/actions/auth.action';
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IRootState} from 'src/app/store/reducers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  public constructor(
    private _store: Store<IRootState>,
  ) {
  }

  ngOnInit() {
  }

  public signup(value: any): void {
    const {password: passwordGroup, ...user} = value;
    this._store.dispatch(new SignUp({...user, password: passwordGroup.password}));
  }
}