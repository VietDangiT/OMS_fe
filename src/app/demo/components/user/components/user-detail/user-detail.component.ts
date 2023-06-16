import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'oms-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailComponent {
  @HostBinding('class') hostClass = 'oms-user-detail';

  ngOnInit(): void {
    if (!localStorage.getItem('reloadUser')) {
      localStorage.setItem('reloadUser', 'no reload');
      window.location.reload();
    } else {
      localStorage.removeItem('reloadUser');
    }
  }
}
