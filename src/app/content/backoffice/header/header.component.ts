import {Logout} from './../../../store/actions/auth.action';
import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IRootState} from 'src/app/store/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input()
  public drawer: any;

  public constructor(
    private _store: Store<IRootState>,
  ) {
  }

  public ngOnInit(): void {
  }

  public logout(): void {
    this._store.dispatch(new Logout());
  }

  public toggleSideBar(): void {
    this.drawer.toggle();
  }
}
