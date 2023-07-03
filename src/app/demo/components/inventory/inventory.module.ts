import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AvatarComponent } from '../share/avatar/avatar.component';
import { ShareModule } from '../share/share.module';
import { TabMenuComponent } from '../share/tab-menu/tab-menu.component';
import { ListCardComponent } from './List-card/List-card.component';
import { InventoryCardComponent } from './List-card/inventory-card/inventory-card.component';
import { ChannelStockComponent } from './channel-stock/channel-stock.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { InventoryRoutes } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { ItemStatisticComponent } from './item-statistic/item-statistic.component';
import { ListStockOnChannelComponent } from './list-stock-on-channel/list-stock-on-channel.component';
import { SalesChannelPerformanceComponent } from './sales-channel-performance/sales-channel-performance.component';

@NgModule({
  declarations: [
    InventoryComponent,
    ListCardComponent,
    InventoryCardComponent,
    InventoryDetailComponent,
    ListStockOnChannelComponent,
    ChannelStockComponent,
    ItemStatisticComponent,
    SalesChannelPerformanceComponent,
  ],
  imports: [
    CommonModule,
    InventoryRoutes,
    MenuModule,
    AppTopBarModule,
    TabMenuModule,
    ShareModule,
    SidebarModule,
    ButtonModule,
    TabViewModule,
    FieldsetModule,
    AvatarModule,
    AvatarComponent,
    DropdownModule,
    FormsModule,
    DashboardModule,
    TabMenuComponent,
  ],
})
export class InventoryModule {}
