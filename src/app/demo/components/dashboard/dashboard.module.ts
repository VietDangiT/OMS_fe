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
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { SaleByChannelComponent } from './sale-by-channel/sale-by-channel.component';
import { TotalReturnComponent } from './total-return/total-return.component';
import { SaleByChannelHeatmapComponent } from './total-sale-by-channel/sale-by-channel-heatmap/sale-by-channel-heatmap.component';
import { TotalsalechartComponent } from './total-sale-chart/total-sale-chart.component';
import { DetailStatisticComponent } from './dashboard-statistic/detail-statistic/detail-statistic.component';
import { AppTopBarModule } from 'src/app/layout/app.topbar.module';
import { SubmenuModule } from 'src/app/layout/app.submenu.module';
import { PaginatorModule } from 'primeng/paginator';
import { ShareModule } from '../share/share.module';
import { SaleByLocationComponent } from './sale-by-location/sale-by-location.component';
import { ChartsModule } from '../charts/charts.module';
import { TopSellingProductComponent } from './top-selling-product/top-selling-product.component';
import { SaleStoreComponent } from './sale-store/sale-store.component';
import { GlobalFilterComponent } from '../global-filter/global-filter.component';
import { CalendarModule } from 'primeng/calendar';
import { TotalSaleByLocationComponent } from './total-sale-by-location/total-sale-by-location.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/auth.interceptor';

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
    SubmenuModule,
    PaginatorModule,
    ShareModule,
    ChartsModule,
    CalendarModule
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
    TotalReturnComponent,
    SaleByChannelHeatmapComponent,
    TotalsalechartComponent,
    DetailStatisticComponent,
    SaleByLocationComponent,
    TopSellingProductComponent,
    SaleStoreComponent, 
    GlobalFilterComponent,
    TotalSaleByLocationComponent
  ],
 
})
export class DashboardModule {}
