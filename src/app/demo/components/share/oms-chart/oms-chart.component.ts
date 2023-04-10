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
  ApexResponsive,
} from 'ng-apexcharts';
import resolveConfig from 'tailwindcss/resolveConfig';
import { environment } from 'src/environments/environment';

type ApexChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  apexResponsive: ApexResponsive[];
};

declare const google: any;
const tailwindConfig = require('tailwind.config.js');
const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig.theme['colors'];

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

  @Input() type: ChartType | 'heatmap' | 'treemap' | 'geomap';
  @Input() data: ChartData | any[][];
  @Input() options: OmsChartOptions | any;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['data']?.currentValue) {
      if (this.type === 'geomap') {
        await google.charts.load('current', {
          packages: ['geochart'],
          mapsApiKey: `${environment.mapsApiKey}`,
        });
        await google.charts.setOnLoadCallback(this.drawRegionsMap);
      }
      // update this.data here
      this.data = changes['data'].currentValue;
      // then chart is getting updated
      setTimeout(() => {
        this.type === 'geomap'
          ? this.drawRegionsMap(this.data)
          : this.chartJS?.refresh();
      }, 100);
    }
    if (changes['options']?.currentValue) {
      // update this.data here

      this.options = changes['options'].currentValue;
      // then chart is getting updated
      setTimeout(() => {
        this.apexChart?.updateSeries(this.options.series);
      }, 100);
    }
  }

  onResize($event: any) {
    this.type === 'geomap' && this.drawRegionsMap(this.data);
  }

  drawRegionsMap(apiData: any = undefined) {
    let data = google.visualization.arrayToDataTable(
      apiData ? apiData : [['Country', 'Value']]
    );

    let options = {
      legend: 'none',
      backgroundColor: `${colors.geomapBackground}`,
      colorAxis: { colors: [`${colors.primary}`, `${colors.primary}`] },
      // displayMode: 'markers',
      datalessRegionColor: `${colors.datalessRegion}`,
    };

    let chart = new google.visualization.GeoChart(
      document.getElementById('regions_div')
    );

    chart.draw(data, options);
  }
}
