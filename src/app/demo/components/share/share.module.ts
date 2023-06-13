import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalFilterComponent } from './global-filter/global-filter.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { OMSChartComponent } from './oms-chart/oms-chart.component';
import { OmsTableComponent } from './oms-table/oms-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ScreenFilterComponent } from './screen-filter/screen-filter.component';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    OMSChartComponent,
    OmsTableComponent,
    PaginationComponent,
    GlobalFilterComponent,
    ScreenFilterComponent,

  ],
  imports: [
    DateFilterComponent,
    CommonModule,
    ChartModule,
    NgApexchartsModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    SkeletonModule,
    CalendarModule

  ],
  exports: [OMSChartComponent, DateFilterComponent, OmsTableComponent, GlobalFilterComponent, ScreenFilterComponent]

})
export class ShareModule {}
