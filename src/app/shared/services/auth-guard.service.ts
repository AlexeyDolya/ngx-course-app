import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IRootState } from '@rootStore/reducers';

@Injectable()
export class AuthGuardService implements CanActivate {
    public constructor(private _store: Store<IRootState>, private _router: Router) {}

    public canActivate(_activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const url: string = state.url;
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
