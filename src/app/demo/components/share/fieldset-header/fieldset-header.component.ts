import { Component, Input } from '@angular/core';

@Component({
  selector: 'oms-fieldset-header',
  templateUrl: './fieldset-header.component.html',
  styleUrls: ['./fieldset-header.component.scss']
})
export class FieldsetHeaderComponent {
  @Input() title: string;
  @Input() iconClass: string;
  @Input() isDropDown: boolean = true;
  @Input() linkText: string; 
}
