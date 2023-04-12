import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SaleByLocationComponent } from './sale-by-location/sale-by-location.component';
import { TotalSaleByChannelComponent } from './total-sale-by-channel/total-sale-by-channel.component';
import { OmsTableComponent } from '../share/oms-table/oms-table.component';

const route:Routes = [
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
  ];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
