import { Component, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-sale-by-channel-heatmap',
  templateUrl: './sale-by-channel-heatmap.component.html',
  styleUrls: ['./sale-by-channel-heatmap.component.scss'],
})
export class SaleByChannelHeatmapComponent {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Metric1",
          data: this.generateData(6, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric2",
          data: this.generateData(6, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric3",
          data: this.generateData(6, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric4",
          data: this.generateData(6, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric5",
          data: this.generateData(6, {
            min: 0,
            max: 90
          })
        },
        {
          name: "Metric6",
          data: this.generateData(6, {
            min: 0,
            max: 90
          })
        }
      ],
      chart: {
        height: 350,
        type: "heatmap",
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
        text: ""
      }
    };
  }

  public generateData(count: number, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = 'w' + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  }
}
