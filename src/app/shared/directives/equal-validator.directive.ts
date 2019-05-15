import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ValidatorService } from '@shared/services/validator.service';

@Directive({
    selector: '[appEqualValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true }],
})
export class EqualValidatorDirective implements Validator {
    public constructor(private _validatorService: ValidatorService) {}
    public validate({ value }: FormGroup): ValidationErrors | null {
        return this._validatorService.equalValidator(value);
    }
}
