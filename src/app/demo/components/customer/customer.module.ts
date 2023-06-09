import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { ShareModule } from '../share/share.module';
import { CustomerItemComponent } from './components/customer-item/customer-item.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerItemComponent,
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    AppTopBarModule,
    TabMenuModule,
    ShareModule,
    CustomerRoutingModule,
    RouterModule,
  ],
})
export class CustomerModule {}
