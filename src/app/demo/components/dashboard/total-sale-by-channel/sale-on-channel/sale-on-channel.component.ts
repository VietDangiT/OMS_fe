import {
  Component,
  Input,
  SimpleChange,
  ViewEncapsulation,
} from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

export interface SaleOnChannel {}

@Component({
  selector: 'sale-on-channel',
  templateUrl: './sale-on-channel.component.html',
  styleUrls: ['./sale-on-channel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SaleOnChannelComponent {
  @Input() data: ChartData;
  @Input() type: ChartType = 'line';
  @Input() option: ChartOptions = {
    elements: {
      point: {
        pointStyle: '',
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxHeight: 5,
          boxWidth: 10,
          color: '#495057',
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  };
}
