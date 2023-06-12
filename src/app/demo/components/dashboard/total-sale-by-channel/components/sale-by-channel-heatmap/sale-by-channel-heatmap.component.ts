import { Component, Input } from '@angular/core';
import { heatChartOptions } from 'src/app/demo/components/charts/apex-chart.component';

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
  @Input() data: Partial<heatChartOptions> | unknown[];
}
