import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { AvatarComponent } from '../share/avatar/avatar.component';
import { ShareModule } from '../share/share.module';
import { TabMenuComponent } from '../share/tab-menu/tab-menu.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueItemComponent } from './components/catalogue-item/catalogue-item.component';
import { CatalogueListComponent } from './components/catalogue-list/catalogue-list.component';

@NgModule({
  declarations: [
    CatalogueComponent,
    CatalogueListComponent,
    CatalogueItemComponent,
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    RouterModule,
    AppTopBarModule,
    TabMenuModule,
    ShareModule,
    AvatarComponent,
    TabMenuComponent,
  ],
})
export class CatalogueModule {}
