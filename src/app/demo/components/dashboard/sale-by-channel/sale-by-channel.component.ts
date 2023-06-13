import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import tailwindConfig from 'tailwind.config.js';
import resolveConfig from 'tailwindcss/resolveConfig';
import { OmsChartOptions } from '../../share/oms-chart/oms-chart.component';
import {
  BaseChart,
  TotalSalesByChannelApiResponse,
} from '../interfaces/dashboard.models';
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
  @Input() filterArr: string[] = [];

  private readonly dashboardService = inject(DashboardService);

  private readonly router = inject(Router);

  chartData: TreeMapData[] = [];

  saleStoreData: BaseChart[];

  chartOptions: Partial<OmsChartOptions> | any;

  routerLink = 'total-sale-by-channel';

  queryParams: { [key: string]: string } = {
    fDate: '',
    tDate: '',
  };

  ngOnInit(): void {
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
    if (changes['filterArr']?.currentValue && this.filterArr[1]) {
      this.getTotalSaleByChannel(changes['filterArr']?.currentValue);

      this.queryParams = {
        fDate: this.filterArr[0],
        tDate: this.filterArr[1],
      };
    }
  }

  getTotalSaleByChannel(filterArr = ['', '']) {
    this.dashboardService
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
