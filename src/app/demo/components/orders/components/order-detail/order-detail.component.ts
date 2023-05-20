import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { OmsTable } from '../../../share/model/oms-table';
import { Order } from '../../models/orders.models';

@Component({
  selector: 'oms-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderDetailComponent {
  @HostBinding('class') hostClass: 'oms-order-detail';

  @Input() visible: boolean;

  @Input() order: Order;

  @Output('onClose') onClose: EventEmitter<boolean> = new EventEmitter();

  tableData: OmsTable<Product> = {
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
