import {
  Component,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, tap } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'oms-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserChangePasswordComponent {
  @HostBinding('class') hostClass = 'oms-user-change-password';

  userService = inject(UserService);

  messageService = inject(MessageService);

  changePasswordForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.changePasswordForm = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.checkPasswords }
    );
  }

  changePassword(): void {
    const id = localStorage.getItem('userId');

    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword } = this.changePasswordForm.value;

      this.handleChangePassword(currentPassword, Number(id)!, newPassword);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Form must be valid or filled',
        closable: true,
      });
    }
  }

  handleChangePassword(
    currentPassword: string,
    id: number,
    newPassword: string
  ): void {
    this.userService
      .changePassword(currentPassword, id, newPassword)
      .pipe(
        catchError(async err => {
          const errMes = err.networkError.error.errors[0].extensions.message;

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errMes,
            closable: true,
          });
        }),
        tap(res => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: $localize`Success change password`,
              closable: true,
            });
          }
        })
      )
      .subscribe();
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('newPassword')!.value;

    let confirmPass = group.get('confirmPassword')!.value;

    return pass === confirmPass ? null : { notSame: true };
  };
}
