import {
  Component,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { map } from 'rxjs';
import { HelperService } from 'src/app/demo/service/helper.service';
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

  helperService = inject(HelperService);

  user: Partial<User>;

  prefixFacebook = '';

  prefixInstagram = '';

  ngOnInit(): void {
    this.userService
      .getUser()
      .pipe(
        map(res => {
          const { userDetail: data } = res;

          this.user = this.userService.refactorUser(data);

          console.log(this.user);
        })
      )
      .subscribe();
  }
}
