import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { catchError, tap } from 'rxjs';
import { User } from '../../../login/models/login.models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'oms-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserEditComponent implements OnInit {
  @HostBinding('class') hostClass = 'oms-user-edit';

  userService = inject(UserService);

  messageService = inject(MessageService);

  user: Partial<User> = {
    avatar: '',
    dob: '',
    gender: '',
    fullAddress: '',
    email: '',
    fullName: '',
    phoneNumber: '',
  };

  ngOnInit(): void {
    const id = localStorage.getItem('userId');

    this.getUser(Number(id));
  }

  getUser(id: number): void {
    this.userService
      .getUserDetail(Number(id))
      .pipe(
        tap(res => {
          let { userDetail: user } = res;

          user = this.userService.refactorUser(user);

          this.user = user;
        })
      )
      .subscribe();
  }

  edit(form: FormGroup): void {
    if (form.valid) {
      this.userService
        .editUser(form.value)
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
                detail: $localize`User edited`,
                closable: true,
              });
            }
          })
        )
        .subscribe();
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: $localize`Edit form must be valid or filled`,
      closable: true,
    });
  }

  handleEdit(): void {}
}
