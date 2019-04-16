import { Directive } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[appEqualValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true }],
})
export class EqualValidatorDirective implements Validator {
    public validate({ value }: FormGroup): ValidationErrors | null {
        const [password, cpassword] = Object.values(value);
        return password !== cpassword
            ? {
                  'Значение паролей не совпадает': true,
              }
            : null;
    }
}
