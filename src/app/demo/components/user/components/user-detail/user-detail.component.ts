import {
  Component,
  HostBinding,
  OnInit,
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
export class UserDetailComponent implements OnInit {
  @HostBinding('class') hostClass = 'oms-user-detail';

  userService = inject(UserService);

  user: Partial<User> = {
    id: 1,
    avatar: '',
    fullName: '',
    email: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    fullAddress: '',
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
}
