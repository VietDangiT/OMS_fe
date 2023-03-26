import { Component, Input } from "@angular/core";
import { ChartData, ChartOptions } from "chart.js";

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
  })
  export class LineChartComponent {
    @Input() chartData!: ChartData;
    @Input() baseChartOptions!: ChartOptions;
    ngOnInit(){
    }
  }