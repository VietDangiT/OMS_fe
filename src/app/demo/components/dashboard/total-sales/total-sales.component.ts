import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'dashboard-total-sales',
  templateUrl: './total-sales.component.html',
  styleUrls: ['./total-sales.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TotalSalesComponent {
  @Input() chartData: any;
  @Input() basicOptions!: ChartOptions;
  ngOnInit() {}
}
