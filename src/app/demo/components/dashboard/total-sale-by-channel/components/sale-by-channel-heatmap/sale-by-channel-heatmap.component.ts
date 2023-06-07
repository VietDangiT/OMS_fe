import { Component, Input, SimpleChanges } from '@angular/core';
import resolveConfig from 'tailwindcss/resolveConfig';
import {
  OmsChartOptions,
  heatmapChartOptions,
} from '../../../../share/oms-chart/oms-chart.component';

export interface SaleByChannelHeatmap {
  name: string;
  data: {
    x: string;
    y: string | number;
  }[];
}

const tailwindConfig = require('tailwind.config.js');

@Component({
  selector: 'sale-by-channel-heatmap',
  templateUrl: './sale-by-channel-heatmap.component.html',
  styleUrls: ['./sale-by-channel-heatmap.component.scss'],
})
export class SaleByChannelHeatmapComponent {
  @Input() data: SaleByChannelHeatmap[];

  chartOptions!: Partial<OmsChartOptions> | any;

  fullConfig = resolveConfig(tailwindConfig);

  ngOnInit() {
    console.log(this.fullConfig.theme['colors']['primary']);
  }

  constructor() {
    this.chartOptions = {
      series: this.data ? this.data : [],
      ...heatmapChartOptions,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.chartOptions.series = [...this.data];
    }
  }
}
