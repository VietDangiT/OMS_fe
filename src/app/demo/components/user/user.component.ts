import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'oms-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent {
  @HostBinding('class') hostClass = 'oms-user';
}
