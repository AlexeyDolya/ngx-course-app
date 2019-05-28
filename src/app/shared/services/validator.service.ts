import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ValidatorService {
    public constructor(private _http: HttpClient) {}
    public equalValidator(value: FormControl): ValidationErrors | null {
        const [password, cpassword] = Object.values(value);
        return password !== cpassword
            ? {
                  'Passwords do not match': true,
              }
            : null;
    }

    public usernameValidator(control: AbstractControl): ValidationErrors | null {
        let checkControl: string = '';
        if (control && control.value) {
            checkControl = control.value;
        }
        const valid: boolean = /^[a-zA-Zа-яА-Я]*$/.test(checkControl);
        const err: ValidationErrors | null = valid
            ? null
            : {
                  'Only letters': true,
              };
        return err;
    }

    public zipCodeValidator(control: AbstractControl): ValidationErrors | null {
        let checkControl: string = '';
        if (control && control.value) {
            checkControl = control.value;
        }
        const valid: boolean = /^\d+$/.test(checkControl);
        const err: ValidationErrors | null = valid
            ? null
            : {
                  'Only numbers': true,
              };
        return err;
    }
    public oldPass(control: FormGroup): Observable<ValidationErrors | null> {
        if (control && control.value) {
            control = control.value;
        }
        return this._http.post('/user/checkPassword', { data: control }).pipe(
            map((data: ValidationErrors) => (data ? data : null)),
            catchError(() => {
                return of({ ERROR: true });
            })
        );
    }

    public username(control: FormGroup): Observable<ValidationErrors | null> {
        if (control && control.value) {
            control = control.value;
        }
        return this._http.post('/auth/checkUsername', { username: control }).pipe(
            map((data: ValidationErrors) => (data ? data : null)),
            catchError(() => {
                return of({ ERROR: true });
            })
        );
    }
}
