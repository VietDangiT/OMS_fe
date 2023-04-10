import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'dashboard-total-sale-chart',
  templateUrl: './total-sale-chart.component.html',
  styleUrls: ['./total-sale-chart.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TotalsalechartComponent {
  @Input() data: any;
  @Input() option: ChartOptions;
  @Input() totalSale: any;
}
