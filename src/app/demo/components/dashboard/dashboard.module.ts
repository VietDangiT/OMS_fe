import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { ChartsModule } from '../charts/charts.module';
import { GlobalFilterComponent } from '../global-filter/global-filter.component';
import { DateFilterComponent } from '../share/date-filter/date-filter.component';
import { ShareModule } from '../share/share.module';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { DashboardStatisticComponent } from './dashboard-statistic/dashboard-statistic.component';
import { DetailStatisticComponent } from './dashboard-statistic/detail-statistic/detail-statistic.component';
import { DashboardTotalOrdersComponent } from './dashboard-total-orders/total-orders.component';
import { DashboardComponent } from './dashboard.component';
import { OverviewBoxComponent } from './overview-box/overview-box.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { SaleByChannelComponent } from './sale-by-channel/sale-by-channel.component';
import { SaleByLocationItemComponent } from './sale-by-location/components/sale-by-location-item/sale-by-location-item.component';
import { SaleTotalBoxComponent } from './sale-by-location/components/sale-total-box/sale-total-box.component';
import { SaleByLocationComponent } from './sale-by-location/sale-by-location.component';
import { SaleStoreComponent } from './sale-store/sale-store.component';
import { TopSellingProductComponent } from './top-selling-product/top-selling-product.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { TotalReturnComponent } from './total-return/total-return.component';
import { SaleByChannelHeatmapComponent } from './total-sale-by-channel/components/sale-by-channel-heatmap/sale-by-channel-heatmap.component';
import { TotalSaleByChannelItemComponent } from './total-sale-by-channel/components/total-sale-by-channel-item/total-sale-by-channel-item.component';
import { TotalSaleByChannelComponent } from './total-sale-by-channel/total-sale-by-channel.component';
import { TotalSaleByLocationComponent } from './total-sale-by-location/total-sale-by-location.component';
import { TotalSaleChartComponent } from './total-sale-chart/total-sale-chart.component';
import { TotalSalesComponent } from './total-sales/total-sales.component';

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
    NgApexchartsModule,
    AppTopBarModule,
    PaginatorModule,
    ShareModule,
    ChartsModule,
    DateFilterComponent,
    CalendarModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardStatisticComponent,
    TotalSaleByChannelComponent,
    SaleByChannelComponent,
    ProductCatalogComponent,
    DashboardTotalOrdersComponent,
    TotalReturnComponent,
    SaleByChannelHeatmapComponent,
    TotalSaleChartComponent,
    DetailStatisticComponent,
    SaleByLocationComponent,
    TopSellingProductComponent,
    GlobalFilterComponent,
    TotalSaleByLocationComponent,
    TotalSalesComponent,
    OverviewBoxComponent,
    TotalOrdersComponent,
    SaleStoreComponent,
    TotalSaleByChannelItemComponent,
    SaleByLocationItemComponent,
    SaleTotalBoxComponent,
  ],
})
export class DashboardModule {}
