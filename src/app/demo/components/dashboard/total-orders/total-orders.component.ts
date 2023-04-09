import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'dashboard-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TotalOrdersComponent {
  @Input() chartData: any;
  @Input() basicOptions!: ChartOptions;
  @Input() totalOrder: string = '0';
  ngOnInit() {}
}
