import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'oms-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss'],
})
export class UserChangePasswordComponent {
  changePasswordForm: FormGroup;

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup(
      {
        currentPassword: new FormControl(),
        newPassword: new FormControl(),
        confirmPassword: new FormControl(),
      },
      { validators: this.checkPasswords }
    );
  }

  changePassword(): void {}

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('newPassword')!.value;

    let confirmPass = group.get('confirmPassword')!.value;

    return pass === confirmPass ? null : { notSame: true };
  };
}
