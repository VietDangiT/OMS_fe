import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareChartComponent } from './share-chart/share-chart.component';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    ShareChartComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    NgApexchartsModule,
  ],
  exports: [ShareChartComponent]
})
export class ShareModule { }
