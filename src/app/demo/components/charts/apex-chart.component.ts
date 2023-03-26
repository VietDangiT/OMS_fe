import { Component, Input } from "@angular/core";
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexTitleSubtitle } from "ng-apexcharts";

export type heatChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
    colors: any;
  };

@Component({
    selector: 'app-apex-chart',
    templateUrl: './apex-chart.component.html',
  })
  export class ApexChartComponent {
    @Input() heatChartOptions: Partial<heatChartOptions> | any;
  }