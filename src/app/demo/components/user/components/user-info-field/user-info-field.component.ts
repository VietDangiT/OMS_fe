import { Component, Input } from '@angular/core';

@Component({
  selector: 'oms-user-info-field',
  templateUrl: './user-info-field.component.html',
  styleUrls: ['./user-info-field.component.scss'],
})
export class UserInfoFieldComponent {
  @Input() value: string;

  @Input() displayText: string;
}
