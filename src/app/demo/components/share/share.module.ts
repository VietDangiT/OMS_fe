import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OMSChartComponent } from './oms-chart/oms-chart.component';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    OMSChartComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    NgApexchartsModule,
  ],
  exports: [OMSChartComponent]
})
export class ShareModule { }
