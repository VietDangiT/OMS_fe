import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { DashboardStatisticComponent } from './dashboard-statistic/dashboard-statistic.component';
import { TotalSaleByLocationComponent } from './total-sale-by-location/total-sale-by-channel.component';
import { SaleOnChannelComponent } from './total-sale-by-location/sale-on-channel/sale-on-channel.component';
import { TableComponent } from './table/table.component';
import { CalendarModule } from 'primeng/calendar';
import { SaleByChannelComponent } from './total-sale-by-location/sale-by-channel/sale-by-channel.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { PieChartComponent } from '../pie-chart/pie-chart.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        CalendarModule,
        NgApexchartsModule
    ],
    declarations: [
        PieChartComponent
        ,DashboardComponent, DashboardStatisticComponent, TotalSaleByLocationComponent, SaleOnChannelComponent, TableComponent, SaleByChannelComponent]
})
export class DashboardModule { }
