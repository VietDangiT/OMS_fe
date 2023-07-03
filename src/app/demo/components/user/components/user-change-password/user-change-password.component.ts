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
import { catchError, tap } from 'rxjs';
import { NotificationService } from '../../../share/message/notification.service';
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

  notificationService = inject(NotificationService);

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
      this.notificationService.successNotification(
        $localize`Form must be valid or filled`
      );
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

          this.notificationService.errorNotification(errMes);
        }),
        tap(res => {
          if (res) {
            this.notificationService.successNotification(
              $localize`Success change password`
            );
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
