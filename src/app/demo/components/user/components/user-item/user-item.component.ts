import { Component, Input } from '@angular/core';
import { UserItem } from '../../models/user.models';
import { HelperService } from 'src/app/demo/service/helper.service';

@Component({
  selector: 'oms-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Input() user: UserItem;

  modalVisible = false;

  constructor(private _helperService: HelperService){}

  ngOnInit(): void {
    this.user = {
      ...this.user,
      avatar: this._helperService.refactorImg(
        this._helperService.arrayBufferToBase64(this.user.avatar)
      ),
    };
  }

  handleAction(e: Event): void {
    e.stopPropagation();
    console.log('click action icon');
  }

  handleUserDetail(e: Event): void {
    this.modalVisible = !this.modalVisible;
  }
}
