import { Component, Input } from '@angular/core';
import { Customer } from '../../models/customer.models';

@Component({
  selector: 'oms-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss'],
})
export class CustomerItemComponent {
  @Input() customer: Customer;
}
