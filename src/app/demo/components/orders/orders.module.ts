import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { ShareModule } from '../share/share.module';
import { TabMenuComponent } from '../share/tab-menu/tab-menu.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,
    OrderItemComponent,
    OrderDetailComponent,
  ],
  imports: [
    AppTopBarModule,
    CommonModule,
    OrdersRoutingModule,
    TabMenuModule,
    ShareModule,
    DialogModule,
    AvatarModule,
    TabMenuComponent,
  ],
})
export class OrdersModule {}
