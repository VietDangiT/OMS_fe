import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerLoyaltyComponent } from './customer-loyalty/customer-loyalty.component';
import { CustomerRoutingModule } from './customer-routing.routing';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { SubmenuModule } from 'src/app/layout/app.submenu.module';
import { PaginatorModule } from 'primeng/paginator';
import { ShareModule } from '../share/share.module';
import { ChartsModule } from '../charts/charts.module';
import { CalendarModule } from 'primeng/calendar';
import { CustomerFeedbackComponent } from './customer-feedback/customer-feedback.component';
import { CustomerBychannelComponent } from './customer-bychannel/customer-bychannel.component';
import { CustomerLocationComponent } from './customer-location/customer-location.component';
import { CustomerRatingComponent } from './customer-rating/customer-rating.component';
import { CustomerTopproductComponent } from './customer-topproduct/customer-topproduct.component';
import { ListboxModule } from 'primeng/listbox';
import { TreeTableModule } from 'primeng/treetable';
import { CustomerAllcustomerComponent } from './customer-allcustomer/customer-allcustomer.component';
import { TabMenuModule } from 'primeng/tabmenu';
@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    NgApexchartsModule,
    AppTopBarModule,
    SubmenuModule,
    PaginatorModule,
    ShareModule,
    ChartsModule,
    CalendarModule,
    ListboxModule,
    TreeTableModule,
    TabMenuModule,
  ],
  declarations: [
    CustomerComponent,
    CustomerLoyaltyComponent,
    CustomerFeedbackComponent,
    CustomerBychannelComponent,
    CustomerLocationComponent,
    CustomerRatingComponent,
    CustomerTopproductComponent,
    CustomerAllcustomerComponent




  ]
})
export class CustomerModule { }
