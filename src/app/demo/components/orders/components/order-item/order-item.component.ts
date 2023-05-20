import { Component, HostBinding, Input } from '@angular/core';
import { Order } from '../../models/orders.models';

@Component({
  selector: 'oms-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @HostBinding('class') hostClass = 'oms-order-item';

  @Input() order: Order;

  modalVisible = false;

  handleAction(e: Event): void {
    e.stopPropagation();
    console.log('click action icon');
  }

  handleOrderDetail(e: Event): void {
    this.modalVisible = !this.modalVisible;
  }

  handleCloseModal() {
    this.modalVisible = false;
  }
}
