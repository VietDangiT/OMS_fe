import {
  Component,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../../../login/models/login.models';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'oms-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailComponent {
  @HostBinding('class') hostClass = 'oms-user-detail';

  userService = inject(UserService);

  user: Partial<User> = {
    avatar: '',
    email: '',
    fullAddress: '',
    fullName: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    password: '',
  };

  ngOnInit(): void {
    this.initUser();
  }

  initUser(): void {
    this.userService
      .getUser()
      .pipe(
        tap(res => {
          let { userDetail: user } = res;

          user = this.userService.refactorUser(user);

          this.user = user;
        })
      )
      .subscribe();
  }
}
