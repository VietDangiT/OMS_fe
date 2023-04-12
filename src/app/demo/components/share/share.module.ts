import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OMSChartComponent } from './oms-chart/oms-chart.component';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { OmsTableComponent } from './oms-table/oms-table.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    OMSChartComponent,
    DateFilterComponent,
    OmsTableComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    NgApexchartsModule,
    CalendarModule,
    FormsModule,
    TableModule,
    PaginatorModule
  ],
  exports: [OMSChartComponent, DateFilterComponent, OmsTableComponent]
})
export class ShareModule { }
