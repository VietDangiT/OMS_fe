import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TotalSaleByLocationComponent } from './total-sale-by-location/total-sale-by-channel.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'total-sale-by-channel', component: TotalSaleByLocationComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
