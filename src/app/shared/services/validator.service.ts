import { ValidationErrors } from '@angular/forms';

export class ValidatorService {
    public equalValidator(value: any): ValidationErrors | null {
        const [password, cpassword] = Object.values(value);
        return password !== cpassword
            ? {
                  'Значение паролей не совпадает': true,
              }
            : null;
    }

    public usernameValidator(value: any): ValidationErrors | null {
        if (value && value.value) {
            value = value.value;
        }
        const valid: boolean = /^[a-zA-Z]*$/.test(value);
        const err: ValidationErrors | null = valid
            ? null
            : {
                  'Только буквы': true,
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
                  'Только чила': true,
              };
        return err;
    }
}
