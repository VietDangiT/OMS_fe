import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
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

  user: Partial<User> = {
    id: 1,
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

  handleEditForm(form: FormGroup): void {
    console.log(form.value);
  }
}
