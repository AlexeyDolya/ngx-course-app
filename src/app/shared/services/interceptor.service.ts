import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { filter, map, switchMap } from 'rxjs/operators';
import { BASE_URL_TOKEN } from '../../config';
import { AuthService } from './auth.service';

export interface IRes {
    data: any;
    error?: string;
}

@Injectable()
export class InterceptorService implements HttpInterceptor {
    public constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _authService: AuthService) {}

    public intercept<T extends IRes>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpResponse<T>> {
        return this._authService.getTokenFromLocalStorage().pipe(
            switchMap((accessToken: string) => {
                let headers: HttpHeaders = req.headers.append('Content-Type', 'application/json');
                if (req.url !== '/auth/signup' && req.url !== '/auth/signin' && req.url !== '/auth/checkUsername') {
                    headers = headers.append('Authorization', `Bearer ${accessToken}`);
                }
                const jsonReq: HttpRequest<T> = req.clone({
                    headers,
                    url: `${this._baseUrl}${req.url}`,
                });
                return next.handle(jsonReq).pipe(
                    filter(this._isHttpResponse),
                    map((res: HttpResponse<IRes>) => {
                        return res.clone({ body: res.body && res.body.data });
                    })
                );
            })
        );
    }

    private _isHttpResponse(event: HttpEvent<any>): event is HttpResponse<IRes> {
        if (event instanceof HttpResponse) {
            return true;
        }
        return false;
    }
}
