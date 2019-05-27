import { ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ValidatorService {
    public constructor(private _http: HttpClient) {}
    public equalValidator(value: any): ValidationErrors | null {
        const [password, cpassword] = Object.values(value);
        return password !== cpassword
            ? {
                  'Passwords do not match': true,
              }
            : null;
    }

    public usernameValidator(value: any): ValidationErrors | null {
        if (value && value.value) {
            value = value.value;
        }
        const valid: boolean = /^[a-zA-Zа-яА-Я]*$/.test(value);
        const err: ValidationErrors | null = valid
            ? null
            : {
                  'Only letters': true,
              };
        return err;
    }

    public zipCodeValidator(value: any): ValidationErrors | null {
        if (value && value.value) {
            value = value.value;
        }
        const valid: boolean = /^\d+$/.test(value);
        const err: ValidationErrors | null = valid
            ? null
            : {
                  'Only numbers': true,
              };
        return err;
    }
    public oldPass(value: any): Observable<ValidationErrors | null> {
        if (value && value.value) {
            value = value.value;
        }
        return this._http.post('/user/checkPassword', { data: value }).pipe(
            map((data: ValidationErrors) => (data ? data : null)),
            catchError(() => {
                return of({ ERROR: true });
            })
        );
    }

    public username(value: any): Observable<ValidationErrors | null> {
        if (value && value.value) {
            value = value.value;
        }
        return this._http.post('/auth/checkUsername', { username: value }).pipe(
            map((data: ValidationErrors) => (data ? data : null)),
            catchError(() => {
                return of({ ERROR: true });
            })
        );
    }
}
