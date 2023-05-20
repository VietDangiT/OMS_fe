import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { ShareModule } from '../share/share.module';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { DialogModule } from 'primeng/dialog';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

@NgModule({
  declarations: [OrdersComponent, OrderListComponent, OrderItemComponent, OrderDetailComponent],
  imports: [
    AppTopBarModule,
    CommonModule,
    OrdersRoutingModule,
    TabMenuModule,
    ShareModule,
    DialogModule,
  ],
})
export class OrdersModule {}
