import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutes } from './inventory.routing';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { ShareModule } from '../share/share.module';
import { ListCardComponent } from './List-card/List-card.component';
import { InventoryCardComponent } from './List-card/inventory-card/inventory-card.component';
import { MenuModule } from 'primeng/menu';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { ListStockOnChannelComponent } from './list-stock-on-channel/list-stock-on-channel.component';
import { AvatarModule } from 'primeng/avatar';
import { ChannelStockComponent } from './channel-stock/channel-stock.component';
import { ItemStatisticComponent } from './item-statistic/item-statistic.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TabMenuComponent } from "../share/tab-menu/tab-menu.component";

@NgModule({
    declarations: [InventoryComponent,
        ListCardComponent,
        InventoryCardComponent,
        InventoryDetailComponent,
        ListStockOnChannelComponent,
        ChannelStockComponent,
        ItemStatisticComponent,
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
        DropdownModule,
        FormsModule,
        TabMenuComponent
    ]
})
export class InventoryModule { }
