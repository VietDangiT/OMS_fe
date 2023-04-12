import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OMSChartComponent } from './oms-chart/oms-chart.component';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  declarations: [
    OMSChartComponent,
    DateFilterComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    NgApexchartsModule,
    CalendarModule,
    FormsModule,
    PaginatorModule
  ],
  exports: [OMSChartComponent, DateFilterComponent]
})
export class ShareModule { }
