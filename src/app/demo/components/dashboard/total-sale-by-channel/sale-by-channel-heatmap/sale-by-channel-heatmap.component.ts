import { Component, Input, ViewChild } from '@angular/core';

import { OmsChartOptions } from '../../../share/oms-chart/oms-chart.component';

export interface SaleByChannelHeatmap {
  name: string;
  data: {
    x: string;
    y: string | number;
  }[];
}

@Component({
  selector: 'sale-by-channel-heatmap',
  templateUrl: './sale-by-channel-heatmap.component.html',
  styleUrls: ['./sale-by-channel-heatmap.component.scss'],
})
export class SaleByChannelHeatmapComponent {
  chartOptions!: Partial<OmsChartOptions> | any;
  @Input() data: SaleByChannelHeatmap[];

  constructor() {
    this.chartOptions = {
      series: this.data ? this.data : [],
      chart: {
        type: 'heatmap',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#008FFB'],
      title: {
        text: '',
      },
    };
  }

  ngOnChanges() {
    this.chartOptions.series = [...this.data];
  }
}
