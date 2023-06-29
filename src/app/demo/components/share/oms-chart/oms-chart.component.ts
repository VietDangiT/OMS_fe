import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { UIChart } from 'primeng/chart';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { environment } from 'src/environments/environment';
import resolveConfig from 'tailwindcss/resolveConfig';
import { heatChartOptions } from '../../charts/apex-chart.component';

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

export const baseChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

export const pieChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};

export const barBaseChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const barHorizontalBaseChartOptions: ChartOptions = {
  responsive: true,
  indexAxis: 'y',
  maintainAspectRatio: false,
  aspectRatio: 1,
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const heatmapChartOptions: Partial<heatChartOptions> | any = {
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      radius: 10,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 20000,
            color: colors.primaryLight3,
          },
          {
            from: 20000,
            to: 70000,
            color: colors.primaryLight2,
          },
          {
            from: 70000,
            to: 100000,
            color: colors.primary,
          },
        ],
      },
    },
  },
  chart: {
    height: 350,
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
  colors: [colors.primary],
};

export const pieChartColors: string[] = [
  colors.primary,
  colors.primaryLight,
  colors.primaryLight1,
  colors.primaryLight2,
  colors.primaryLight3,
];

export const colorObj: { [key: string]: any } = {
  primary: colors.primary,
  secondary: colors.secondary,
  third: colors.third,
  forth: colors.forth,
  fifth: colors.fifth,
  errors: colors.errors,
  warning: colors.warning,
  success: colors.success,
  danger: colors.danger,
  brightOrange: colors.brightOrange,
  geomapBackground: colors.geomapBackground,
  datalessRegion: colors.datalessRegion,
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

  @Input() type: ChartType | 'heatmap' | 'treemap' | 'geomap';
  @Input() data: ChartData | any[][];
  @Input() options: OmsChartOptions | any;

  @Output() dataSelect = new EventEmitter();

  onDataSelect(e: any): void {
    this.dataSelect.emit(e);
  }

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
      region: '035',
    };

    let chart = new google.visualization.GeoChart(
      document.getElementById('regions_div')
    );

    chart.draw(data, options);
  }
}
