import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { OmsTable } from '../../share/model/oms-table';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent  {

  @HostBinding('class') hostClass: 'app-detail-customer';

  @Input() visible: boolean;

  // @Input() order: Order;

  @Output('onClose') onClose: EventEmitter<boolean> = new EventEmitter();

  tableData: OmsTable = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: ['Product', 'Barcode', 'Quantity', 'Price'],
      body: [
        {
          image: '123',
          name: 'strawberry',
          description: 'very good',
          code: '123',
          quantity: 2,
          price: 30,
        },
        {
          image: '123',
          name: 'strawberry',
          description: 'very good',
          code: '123',
          quantity: 2,
          price: 30,
        },
      ],
    },
  };

  closeModal() {
    this.onClose.emit();
  }


}

