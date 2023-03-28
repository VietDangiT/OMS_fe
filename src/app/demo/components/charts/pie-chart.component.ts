import { Component, Input } from "@angular/core";
import { ChartData, ChartOptions } from "chart.js";

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
  })
  export class PieChartComponent {
    @Input() chartData!: ChartData;
    @Input() baseChartOptions!: ChartOptions;
    ngOnInit(){
     
    }
  }