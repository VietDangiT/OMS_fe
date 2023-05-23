import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OmsTableComponent } from '../share/oms-table/oms-table.component';
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
    data: { breadcrumbs: ['Dashboard', 'Total sale by channel'] },
    component: TotalSaleByChannelComponent,
  },
  {
    path: 'sale-by-location',
    data: { breadcrumbs: ['Dashboard', 'Sale by location'] },
    component: SaleByLocationComponent,
  },
  {
    path: 'table-test',
    data: { breadcrumbs: ['TableTest', 'Table Test'] },
    component: OmsTableComponent,
  },
  {
    path: 'total-sales',
    data: { breadcrumbs: ['Dashboard', 'Total sales'] },
    component: TotalSalesComponent,
  },
  {
    path: 'total-orders',
    data: { breadcrumbs: ['Dashboard', 'Total orders'] },
    component: TotalOrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
