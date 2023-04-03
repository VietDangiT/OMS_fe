import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

import { UIChart } from 'primeng/chart';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexPlotOptions,
  ApexLegend,
  ApexDataLabels,
  ApexYAxis,
} from 'ng-apexcharts';

type ApexChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

export interface OmsChartOptions
  extends Partial<ApexChartOptions>,
    ChartOptions {}

@Component({
  selector: 'oms-chart',
  templateUrl: './oms-chart.component.html',
  styleUrls: ['./oms-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OMSChartComponent implements OnChanges {
  @ViewChild('chartJS') chartJS: UIChart;
  @ViewChild('apexChart') apexChart: ChartComponent;

  @Input() type: ChartType | 'heatmap' | 'treemap';
  @Input() data: ChartData;
  @Input() options: OmsChartOptions | any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      // update this.data here

      this.data = changes['data'].currentValue;
      // then chart is getting updated
      setTimeout(() => {
        this.chartJS?.refresh();
      }, 100);
    };
    if (changes['options']?.currentValue) {
      // update this.data here

      this.options = changes['options'].currentValue;
      // then chart is getting updated
      setTimeout(() => {
        this.apexChart?.render();
      }, 100);
    }
  }
}
