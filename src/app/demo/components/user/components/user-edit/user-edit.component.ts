import {
  Component,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { NotificationService } from '../../../share/message/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'oms-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserEditComponent {
  @HostBinding('class') hostClass = 'oms-user-edit';

  userService = inject(UserService);

  notificationService = inject(NotificationService);

  route = inject(Router);

  edit(form: FormGroup): void {
    if (!form.valid) {
      this.notificationService.errorNotification(
        $localize`Edit form must be valid or filled`
      );

      return;
    }

    this.userService
      .editUser(form.value)
      .pipe(
        catchError(async err => {
          const errMes = err.networkError.error.errors[0].extensions?.message;

          this.notificationService.errorNotification(errMes);
        }),
        tap(() => {
          this.notificationService.successNotification($localize`User edited`);
        })
      )
      .subscribe();
  }
}
