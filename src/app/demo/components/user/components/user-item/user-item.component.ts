import { Component, Input } from '@angular/core';
import { UserItem } from '../../models/user.models';

@Component({
  selector: 'oms-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Input() user: UserItem;

  modalVisible = false;

  handleAction(e: Event): void {
    e.stopPropagation();
    console.log('click action icon');
  }

  handleUserDetail(e: Event): void {
    this.modalVisible = !this.modalVisible;
  }
}
