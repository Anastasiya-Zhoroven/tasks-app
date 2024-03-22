import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator, ipv4Validator } from './email.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  emailForm: FormGroup;
  isEmailControlFocused: boolean = false;
  isIPv4ControlFocused: boolean = false;

  constructor (private readonly formBuilder: FormBuilder) {
    this.emailForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, emailValidator()]),
      ipv4: new FormControl('', [Validators.required, ipv4Validator()])
    });
  }

  onSubmit (): void {
    this.emailForm.markAllAsTouched();
    if (this.emailForm.valid) {
      console.log('Form submitted successfully!');
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

  handleEmailControlFocus (): void {
    this.isEmailControlFocused = true;
  }

  handleEmailControlBlur (): void {
    this.isEmailControlFocused = false;
  }

  handleIPv4ControlFocus (): void {
    this.isIPv4ControlFocused = true;
  }

  handleIPv4ControlBlur (): void {
    this.isIPv4ControlFocused = false;
  }

  get email (): AbstractControl<any, any> | null {
    return this.emailForm.get('email');
  }

  get ipv4 (): AbstractControl<any, any> | null {
    return this.emailForm.get('ipv4');
  }
}
