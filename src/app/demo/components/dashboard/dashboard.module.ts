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
import { TotalSaleByChannelComponent } from './total-sale-by-channel/total-sale-by-channel.component';
import { SaleOnChannelComponent } from './total-sale-by-channel/sale-on-channel/sale-on-channel.component';
import { TableComponent } from './table/table.component';
import { CalendarModule } from 'primeng/calendar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { SaleByChannelComponent } from './sale-by-channel/sale-by-channel.component';
import { TreemapChartComponent } from './sale-by-channel/treemap-chart/treemap-chart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { SaleByChannelHeatmapComponent } from './total-sale-by-channel/sale-by-channel-heatmap/sale-by-channel-heatmap.component';
import { LinechartComponent } from './totalsalechart/linechart/linechart.component';
import { TotalsalechartComponent } from './totalsalechart/totalsalechart.component';
import { DetailStatisticComponent } from './dashboard-statistic/detail-statistic/detail-statistic.component';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { SubmenuModule } from 'src/app/layout/app.submenu.module';
import { PaginatorModule } from 'primeng/paginator';
import { ShareModule } from '../share/share.module';
import { SaleByLocationComponent } from './sale-by-location/sale-by-location.component';
import { ChartsModule } from '../charts/charts.module';
import { TopsellingproductComponent } from './topsellingproduct/topsellingproduct.component';
import { SalestoreComponent } from './salestore/salestore.component';
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
    NgApexchartsModule,
    AppTopBarModule,
    SubmenuModule,
    PaginatorModule,
    ShareModule,
    ChartsModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardStatisticComponent,
    TotalSaleByChannelComponent,
    SaleOnChannelComponent,
    TableComponent,
    SaleByChannelComponent,
    ProductCatalogComponent,
    TotalOrdersComponent,
    TreemapChartComponent,
    DonutChartComponent,
    SaleByChannelHeatmapComponent,
    LinechartComponent,
    TotalsalechartComponent,
    DetailStatisticComponent,
    SaleByLocationComponent,
    TopsellingproductComponent,
    SalestoreComponent
  ],
})
export class DashboardModule {}
