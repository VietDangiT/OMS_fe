import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OmsTable } from '../../../share/model/oms-table';
import { Order } from '../../models/orders.models';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'oms-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OrderListComponent {
  labelItems: MenuItem[];

  activeItem: MenuItem;

  tableData: OmsTable<Order> = {
    page: 0,
    first: 0,
    rows: 0,
    pageCount: 0,
    totalRecord: 0,
    data: {
      header: [
        'Order',
        'Date',
        'Channel name',
        'Product Units',
        'Price',
        'Shipping carrier',
        'Status',
        'Actions',
      ],
      body: [
        {
          orderNumber: '123123',
          orderedAt: '5/19/2023',
          channelId: 1,
          channelName: 'shopee',
          totalProduct: 3,
          totalPrice: 123,
          shipmentProvider: 'Tiki',
          orderStatus: 'completed',
          buyerName: 'Trung Tin',
          shippingAddress: 'Quang trung software center, Anna building',
          customerPaymentMethod: 'card',
          recipientPhoneNumber: '0981449214',
          recipientName: 'Trung Tin',
        },
        {
          orderNumber: '123123',
          orderedAt: '5/19/2023',
          channelId: 1,
          channelName: 'shopee',
          totalProduct: 3,
          totalPrice: 123,
          shipmentProvider: 'Tiki',
          orderStatus: 'return',
        },
      ],
    },
  };

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.labelItems = this.ordersService.getLabelItems();

    this.activeItem = this.labelItems[0];
  }

  dateFilterChange(dates: Date[]): void {
    console.log(`order list dates ${dates}`);
  }

  searchValue(search: string): void {
    console.log(`order list search ${search}`);
  }

  onActiveItemChange(label: MenuItem): void {
    this.activeItem = label;
    console.log(this.activeItem);
  }

  onPageChange(e: Event): void {}
}
