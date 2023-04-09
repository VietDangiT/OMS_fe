import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { OmsChartOptions } from '../../share/oms-chart/oms-chart.component';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind.config.js';
import { DashboardItemPercentage } from '../sale-store/sale-store.component';

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
  @Input() filterArr: (string | undefined)[] = [undefined, undefined];

  chartData: TreeMapData[] = [];
  saleStoreData: DashboardItemPercentage[];

  chartOptions: Partial<OmsChartOptions> | any;

  constructor(private _dashboardService: DashboardService) {
    this.chartOptions = {
      chart: {
        width: '100%',
        type: 'treemap',
        toolbar: {
          show: false,
        },
        redrawOnParentResize: true,
        offsetX: 15,
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
        {
          breakpoint: 1024,
          options: {
            chart: {
              offsetX: 15,
            },
          },
        },
        {
          breakpoint: 1102,
          options: {
            chart: {
              offsetX: 0,
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void {
    this.getTotalSaleByChannel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.chartOptions.series[0].data = [...changes['data'].currentValue];
    }
    if (changes['rangeDate']?.currentValue) {
      if (this.filterArr[0] && this.filterArr[1])
        this.getTotalSaleByChannel(changes['rangeDate']?.currentValue);
    }
  }

  getTotalSaleByChannel(
    rangeDate: (string | null)[] = [null, null]
  ) {
    this._dashboardService
      .getSaleByChannel(
        rangeDate[0] ? rangeDate[0] : '',
        rangeDate[1] ? rangeDate[1] : ''
      )
      .subscribe((data: DashboardItemPercentage[]) => {
        this.saleStoreData = [...data];
        const tmp = this.chartOptions;
        this.chartData = data.map((item: DashboardItemPercentage) => ({
          x: item.displayText,
          y: item.value,
        }));

        tmp.series[0].data = this.chartData;
        this.chartOptions = { ...tmp };
      });
  }
}
