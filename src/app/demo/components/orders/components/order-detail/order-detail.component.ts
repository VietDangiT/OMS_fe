import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  SimpleChanges,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/demo/api/product';
import { HelperService } from 'src/app/demo/service/helper.service';
import { OmsTable } from '../../../share/model/oms-table';
import { orderDetailHeaderTable } from '../../constants/orders.constants';
import { Order, OrderDetail } from '../../models/orders.models';
import { OrdersService } from '../../services/orders.service';

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

  helperService = inject(HelperService);

  orderDetail: OrderDetail = {
    id: 1,
    status: 'completed',
    customerName: '',
    shippingAddress: '',
    phoneNumber: '',
    address: '',
    products: [],
  };

  tableData: OmsTable<Product> = {
    data: {
      header: orderDetailHeaderTable,
      body: [
        {
          image: '',
          name: '',
          description: '',
          barcode: '',
          quantity: 1,
          price: 1,
        },
      ],
    },
  };

  constructor(private orderService: OrdersService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const id: number = changes['order'].currentValue.id;

    this.orderService
      .getOrderDetail(id)
      .pipe(
        tap(res => {
          const { orderDetail } = res;

          this.orderDetail = orderDetail;

          this.tableData.data.body = this.orderDetail.products;
        })
      )
      .subscribe();
  }

  closeModal() {
    this.onClose.emit();
  }
}
