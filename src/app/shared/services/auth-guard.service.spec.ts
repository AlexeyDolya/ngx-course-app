import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';

import { AuthGuardService } from '@shared/services/auth-guard.service';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';

describe('Auth Guard', () => {
    let guard: AuthGuardService;
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let routerSpy: jasmine.Spy;
    let store: MockStore<{ auth: { isLogged: boolean } }>;
    const initialState: { auth: { isLogged: boolean } } = { auth: { isLogged: false } };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [AuthGuardService, provideMockStore({ initialState })],
        });

        guard = TestBed.get(AuthGuardService);
        store = TestBed.get(Store);
        router = TestBed.get(Router);
        activatedRoute = TestBed.get(ActivatedRoute);
        routerSpy = spyOn(router, 'navigate').and.stub();
    });

    it('should go to login and signup when isLogged false', () => {
        const expected: TestColdObservable = cold('(a|)', { a: true });

        expect(
            guard.canActivate(activatedRoute.snapshot, {
                url: '/login',
                root: activatedRoute.snapshot,
            })
        ).toBeObservable(expected);

        expect(
            guard.canActivate(activatedRoute.snapshot, {
                url: '/signup',
                root: activatedRoute.snapshot,
            })
        ).toBeObservable(expected);
    });

    it('should not go to backoffice isLogged false', () => {
        const expected: TestColdObservable = cold('(a|)', { a: false });
        expect(
            guard.canActivate(new ActivatedRouteSnapshot(), {
                url: '/backoffice',
                root: activatedRoute.snapshot,
            })
        ).toBeObservable(expected);
        expect(routerSpy).toHaveBeenCalledWith(['/login']);
    });
    it('should return true if go to backoffice', () => {
        store.setState({ auth: { isLogged: true } });

        const expected: TestColdObservable = cold('(a|)', { a: true });
        expect(
            guard.canActivate(new ActivatedRouteSnapshot(), {
                url: '/backoffice',
                root: activatedRoute.snapshot,
            })
        ).toBeObservable(expected);
        expect(routerSpy).not.toHaveBeenCalled();
    });
});
