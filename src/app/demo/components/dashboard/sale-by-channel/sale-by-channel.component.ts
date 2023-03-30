import { Component, Input, SimpleChanges } from '@angular/core';
import { OmsChartOptions } from '../../share/oms-chart/oms-chart.component';

export interface SaleByChannelData {
  x: string;
  y: string | number;
}

@Component({
  selector: 'dashboard-sale-by-channel',
  templateUrl: './sale-by-channel.component.html',
  styleUrls: ['./sale-by-channel.component.scss'],
})
export class SaleByChannelComponent {
  chartOptions!: Partial<OmsChartOptions> | any;
  @Input() data: SaleByChannelData[] = [];

  constructor() {
    this.chartOptions = {
      chart: {
        height: 350,
        type: 'treemap',
      },
      series: [
        {
          data: this.data ? this.data : [],
        },
      ],
      colors: ['#27447C']
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.chartOptions.series[0].data = [...this.data];
    }
  }
}
