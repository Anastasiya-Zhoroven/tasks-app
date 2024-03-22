import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';


export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null; // Возвращаем null, если значение пустое
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const valid = emailRegex.test(control.value);
        return valid ? null : { invalidEmail: true };
    }
}

export function ipv4Validator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // Возвращаем null, если значение пустое
      }
  
      // Паттерн для проверки IPv4 адреса
      const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
      // Проверяем соответствие значения паттерну
      const isValid = ipv4Pattern.test(control.value);
  
      // Возвращаем результат валидации
      return isValid ? null : { 'invalidIpv4': true };
    };
  }