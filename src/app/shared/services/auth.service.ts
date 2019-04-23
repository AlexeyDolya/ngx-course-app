import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
    public constructor(private _http: HttpClient) {}

    public login(user: any): Observable<any> {
        return this._http.post(`/auth/signin`, { ...user });
    }

    // public getCurrentUser(): Observable<User> {
    //   return this._http.authorizedRequest(`/account`, '', 'GET');
    // }

    public signUp(user: any): Observable<any> {
        return this._http.post(`/auth/signup`, { ...user });
    }

    public checkUser(token: string | null): Observable<any> {
        return this._http.post(`/auth/checkuser`, { token });
    }

    public tokenToLocalStorage(user: any): Observable<any> {
        if (!user || !user.accessToken) {
            return of(null);
        }
        localStorage.setItem('accessToken', user.accessToken);
        return of(user);
    }

    public getTokenFromLocalStorage(): Observable<any> {
        return of(localStorage.getItem('accessToken'));
    }

    public removeFromLocalStorage(name: string): Observable<boolean> {
        localStorage.removeItem(name);
        return of(true);
    }
}
