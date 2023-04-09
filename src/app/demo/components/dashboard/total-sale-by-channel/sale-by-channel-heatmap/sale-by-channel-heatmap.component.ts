import { Component, Input, SimpleChanges } from '@angular/core';
import { OmsChartOptions } from '../../../share/oms-chart/oms-chart.component';
import resolveConfig from 'tailwindcss/resolveConfig';

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
  chartOptions!: Partial<OmsChartOptions> | any;
  @Input() data: SaleByChannelHeatmap[];
  fullConfig = resolveConfig(tailwindConfig);

  ngOnInit() {
    console.log(this.fullConfig.theme['colors']['primary']);
  }

  constructor() {
    this.chartOptions = {
      series: this.data ? this.data : [],
      chart: {
        height: 400,
        type: 'heatmap',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: '',
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 2,
          useFillColorAsStroke: true,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 1500,
                name: 'low',
                color: '#FF0000',
              },
              {
                from: 6,
                to: 20,
                name: 'medium',
                color: '#128FD9',
              },
              {
                from: 21,
                to: 45,
                name: 'high',
                color: '#FFB200',
              },
              {
                from: 46,
                to: 55,
                name: 'extreme',
                color: '#FF0000',
              },
            ],
          },
        },
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.chartOptions.series = [...this.data];
    }
  }
}
