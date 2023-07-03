import { Component, HostBinding, Input, inject } from '@angular/core';
import { HelperService } from 'src/app/demo/service/helper.service';
import { Order } from '../../models/orders.models';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'oms-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @HostBinding('class') hostClass = 'oms-order-item';

  @Input() order: Order;

  orderService = inject(OrdersService);

  helperService = inject(HelperService);

  modalVisible = false;

  ngOnInit(): void {
    this.refactorImage();
  }

  refactorImage(): void {
    this.order = {
      ...this.order,
      channelImage: this.helperService.refactorImg(this.order.channelImage!),
    };
  }

  handleOrderDetail(e: Event): void {
    this.modalVisible = !this.modalVisible;
  }

  handleCloseModal() {
    this.modalVisible = false;
  }
}
