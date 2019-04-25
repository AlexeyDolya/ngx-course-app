import { Directive } from '@angular/core';
import { AsyncValidator, FormGroup, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { ValidatorService } from '@shared/services/validator.service';
import { Observable } from 'rxjs';
@Directive({
    selector: '[appOldPassValidator]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: OldPasswordValidatorDirective, multi: true }],
})
export class OldPasswordValidatorDirective implements AsyncValidator {
    public constructor(private _validatorService: ValidatorService) {}
    public validate({ value }: FormGroup): Observable<ValidationErrors | null> {
        return this._validatorService.oldPass(value);
    }
}
