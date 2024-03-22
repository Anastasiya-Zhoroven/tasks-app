import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator (): ValidatorFn {
  return (control: AbstractControl): Record<string, any> | null => {
    if (!control.value) {
      return null;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  };
}

export function ipv4Validator (): ValidatorFn {
  return (control: AbstractControl): Record<string, any> | null => {
    if (!control.value) {
      return null;
    }

    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    const isValid = ipv4Pattern.test(control.value);

    return isValid ? null : { invalidIpv4: true };
  };
}
