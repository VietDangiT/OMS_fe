import { Component, Input, SimpleChange, ViewEncapsulation } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'sale-on-channel',
  templateUrl: './sale-on-channel.component.html',
  styleUrls: ['./sale-on-channel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SaleOnChannelComponent {
  @Input() data: ChartData;
  @Input() option: ChartOptions;
  @Input() type: ChartType = 'line';
}
