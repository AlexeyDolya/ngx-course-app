import { inject, TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BASE_URL, BASE_URL_TOKEN } from '../../config';
import { InterceptorService } from '@shared/services/interceptor.service';
import { ValidatorService } from '@shared/services/validator.service';
import { environment } from '@env/environment';
import { AuthService } from '@shared/services/auth.service';
import { Observable, of } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

describe('Validation service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [
                { provide: BASE_URL_TOKEN, useValue: BASE_URL },
                {
                    provide: AuthService,
                    useValue: {
                        getTokenFromLocalStorage(): Observable<string> {
                            return of('');
                        },
                    },
                },
                { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
                ValidatorService,
            ],
        });
    });

    it('async check user', inject(
        [ValidatorService, HttpTestingController],
        (validatorService: ValidatorService, backend: HttpTestingController) => {
            validatorService.username({ value: 'inep' }).subscribe((err: ValidationErrors | null) => {
                expect(err).toEqual(null);
            });
            backend
                .expectOne({
                    method: 'POST',
                    url: `${environment.baseUrl}/auth/checkUsername`,
                })
                .flush({ data: null });
        }
    ));

    it('async check user error', inject(
        [ValidatorService, HttpTestingController],
        (validatorService: ValidatorService, backend: HttpTestingController) => {
            validatorService.username({ value: 'inep' }).subscribe((err: ValidationErrors | null) => {
                expect(err).toEqual({ ERROR: true });
            });
            backend
                .expectOne({
                    method: 'POST',
                    url: `${environment.baseUrl}/auth/checkUsername`,
                })
                .error(new ErrorEvent('custom err'));
        }
    ));
});
