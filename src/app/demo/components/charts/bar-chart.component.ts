import { Component, Input } from "@angular/core";
import { ChartData, ChartOptions } from "chart.js";

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
  })
  export class BarChartComponent {
    @Input() chartData!: ChartData;
    @Input() baseChartOptions!: ChartOptions;
    ngOnInit(){
     
    }
  }