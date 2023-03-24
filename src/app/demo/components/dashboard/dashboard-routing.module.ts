import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TotalSaleByChannelComponent } from './total-sale-by-channel/total-sale-by-channel.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'total-sale-by-channel', component: TotalSaleByChannelComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
