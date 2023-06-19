import {
  Component,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, tap } from 'rxjs';
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

  messageService = inject(MessageService);

  route = inject(Router);

  edit(form: FormGroup): void {
    if (!form.valid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: $localize`Edit form must be valid or filled`,
        closable: true,
      });
    }

    this.userService
      .editUser(form.value)
      .pipe(
        catchError(async err => {
          const errMes = err.networkError.error.errors[0].extensions?.message;

          if (errMes) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errMes,
              closable: true,
            });
          }
        }),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: $localize`User edited`,
            closable: true,
          });
        })
      )
      .subscribe();
  }

  handleEdit(): void {}
}
