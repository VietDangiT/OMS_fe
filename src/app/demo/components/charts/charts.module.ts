import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexChartComponent } from './apex-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartModule } from 'primeng/chart';
import { PieChartComponent } from './pie-chart.component';
import { LineChartComponent } from './line-chart.component';
import { BarChartComponent } from './bar-chart.component';



@NgModule({
  declarations: [
    ApexChartComponent,
    PieChartComponent,
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    ChartModule
  ],
  exports:[
    ApexChartComponent,
    PieChartComponent,
    LineChartComponent,
    BarChartComponent
  ]
})
export class ChartsModule { }
