import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OMSChartComponent } from './oms-chart/oms-chart.component';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { GlobalFilterComponent } from './global-filter/global-filter.component';



@NgModule({
  declarations: [
    OMSChartComponent,
    DateFilterComponent,
    GlobalFilterComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    NgApexchartsModule,
    CalendarModule,
    FormsModule,
  ],
  exports: [OMSChartComponent, DateFilterComponent,GlobalFilterComponent]
})
export class ShareModule { }
