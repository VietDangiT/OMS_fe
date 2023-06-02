import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { ShareModule } from '../share/share.module';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueListComponent } from './components/catalogue-list/catalogue-list.component';
import { CatalogueItemComponent } from './components/catalogue-item/catalogue-item.component';

@NgModule({
  declarations: [CatalogueComponent, CatalogueListComponent, CatalogueItemComponent],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    RouterModule,
    AppTopBarModule,
    TabMenuModule,
    ShareModule,
  ],
})
export class CatalogueModule {}
