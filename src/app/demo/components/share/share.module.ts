import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OMSChartComponent } from './oms-chart/oms-chart.component';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ScreenFilterComponent } from './screen-filter/screen-filter.component';
import { OmsTableComponent } from './oms-table/oms-table.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { PaginationComponent } from './pagination/pagination.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    OMSChartComponent,
    ScreenFilterComponent,
    OmsTableComponent,
    PaginationComponent,
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
    CalendarModule,
  ],
  exports: [OMSChartComponent, ScreenFilterComponent, OmsTableComponent],
})
export class ShareModule {}
