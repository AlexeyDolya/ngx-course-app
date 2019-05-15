import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ValidatorService } from '@shared/services/validator.service';

@Directive({
    selector: '[appUsernameValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: UsernameValidatorDirective, multi: true }],
})
export class UsernameValidatorDirective implements Validator {
    public constructor(private _validatorService: ValidatorService) {}
    public validate({ value }: FormControl): ValidationErrors | null {
        return this._validatorService.usernameValidator(value);
    }
}
