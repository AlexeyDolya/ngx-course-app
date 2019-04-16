import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IRootState } from 'src/app/store/reducers';
@Injectable()
export class AuthGuardService implements CanActivate {

  public constructor(
    private _store: Store<IRootState>,
    private _router: Router,
  ) { }

  public canActivate(_activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
 console.log(url)
//  return of(true);
    return this._store.select('auth', 'isLogged').pipe(
      take(1),
      switchMap((isLogged: boolean) => {
        if (!isLogged && (url === '/login' || url === '/signup')) {
          return of(true);
        }

        if (isLogged && (url === '/login' || url === '/signup')) {
          this._router.navigate(['/backoffice']);
          return of(false);
        }

        if (!isLogged) {
          this._router.navigate(['/login']);
        }
        return of(isLogged);
      })
    );

  }
}
