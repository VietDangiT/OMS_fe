import { Console, log } from 'console';
import { Component, Input } from '@angular/core';
import { ListCustomer } from '../../interfaces/customer.models';


@Component({
  selector: 'oms-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss'],
})
export class CustomerItemComponent {
  @Input() customerlist: ListCustomer;

  ngOnInit(){
    
  }

}

