import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TotalSaleByChannelComponent } from './total-sale-by-channel/total-sale-by-channel.component';

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
  ];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
