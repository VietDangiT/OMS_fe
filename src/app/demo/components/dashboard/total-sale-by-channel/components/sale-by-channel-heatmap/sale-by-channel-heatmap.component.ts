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

  // chartOptions!: Partial<OmsChartOptions> | any;

  // fullConfig = resolveConfig(tailwindConfig);

  // ngOnInit(): void {
  //   this.chartOptions = {
  //     series: this.data ? this.data : [],
  //     ...heatmapChartOptions,
  //   };
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['data']?.currentValue) {
  //     this.chartOptions.series = [...this.data];
  //   }
  // }
}
