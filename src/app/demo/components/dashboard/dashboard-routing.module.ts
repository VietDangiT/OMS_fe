import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SaleByLocationComponent } from './sale-by-location/sale-by-location.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { TotalSaleByChannelComponent } from './total-sale-by-channel/total-sale-by-channel.component';
import { TotalSalesComponent } from './total-sales/total-sales.component';

const route: Routes = [
  {
    path: '',
    data: { breadcrumbs: ['Dashboard'] },
    component: DashboardComponent,
  },
  {
    path: 'total-sale-by-channel',
    data: { breadcrumbs: ['Dashboard', 'Sale by Channel Analytics'] },
    component: TotalSaleByChannelComponent,
  },
  {
    path: 'sale-by-location',
    data: { breadcrumbs: ['Dashboard', 'Sales by Location Analytics'] },
    component: SaleByLocationComponent,
  },
  {
    path: 'total-sales',
    data: { breadcrumbs: ['Dashboard', 'Sales Analytics'] },
    component: TotalSalesComponent,
  },
  {
    path: 'total-orders',
    data: { breadcrumbs: ['Dashboard', 'Orders Analytics'] },
    component: TotalOrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
