import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { tap } from 'rxjs';
import tailwindConfig from 'tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';
import { OmsChartOptions } from '../../share/oms-chart/oms-chart.component';
import {
  BaseChart,
  TotalSalesByChannelApiResponse,
} from '../interfaces/interfaces';
import { DashboardService } from '../services/dashboard.service';

const fullConfig = resolveConfig(tailwindConfig);
export interface TreeMapData {
  x: string;
  y: string | number;
}

@Component({
  selector: 'dashboard-sale-by-channel',
  templateUrl: './sale-by-channel.component.html',
  styleUrls: ['./sale-by-channel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SaleByChannelComponent {
  @Input() filterArr: string[];

  chartData: TreeMapData[] = [];

  saleStoreData: BaseChart[];

  chartOptions: Partial<OmsChartOptions> | any;

  constructor(private _dashboardService: DashboardService) {
    this.chartOptions = {
      chart: {
        width: '105%',
        type: 'treemap',
        toolbar: {
          show: false,
        },
        redrawOnParentResize: true,
        offsetX: 2,
      },
      series: [
        {
          data: this.chartData ? this.chartData : [],
        },
      ],
      colors: [`${fullConfig.theme?.colors!['primary']}`],
      dataLabels: {
        enabled: false,
      },
      apexResponsive: [
        // {
        //   breakpoint: 1024,
        //   options: {
        //     chart: {
        //       offsetX: 2,
        //       width: '103%',
        //     },
        //   },
        // },
        // {
        //   breakpoint: 1102,
        //   options: {
        //     chart: {
        //       offsetX: 0,
        //       width: '110%',
        //     },
        //   },
        // },
      ],
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterArr']?.currentValue && this.filterArr[1])
      this.getTotalSaleByChannel(changes['filterArr']?.currentValue);
  }

  getTotalSaleByChannel(filterArr = ['', '']) {
    this._dashboardService
      .getTotalSaleByChannel(filterArr)
      .pipe(
        tap((data: TotalSalesByChannelApiResponse) => {
          const { totalSaleByChannel: total } = data;

          this.saleStoreData = [...total];

          const tmp = this.chartOptions;

          this.chartData = total.map((item: BaseChart) => ({
            x: item.displayText,

            y: item.value,
          }));

          tmp.series[0].data = this.chartData;

          this.chartOptions = { ...tmp };
        })
      )
      .subscribe();
  }
}
