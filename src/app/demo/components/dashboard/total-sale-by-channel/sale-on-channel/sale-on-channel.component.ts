import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-sale-on-channel',
  templateUrl: './sale-on-channel.component.html',
  styleUrls: ['./sale-on-channel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SaleOnChannelComponent {
  @Input() data: ChartData | any = {};
  @Input() option: ChartOptions = {};
  @Input() type: ChartType = 'line';
}
