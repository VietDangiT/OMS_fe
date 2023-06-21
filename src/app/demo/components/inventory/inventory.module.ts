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


@NgModule({
  imports: [
    CommonModule,
    InventoryRoutes,
    MenuModule,
    AppTopBarModule,
    TabMenuModule,
    ShareModule,
  ],
  declarations: [InventoryComponent,
                 ListCardComponent,
                 InventoryCardComponent,
                ]
})
export class InventoryModule { }
