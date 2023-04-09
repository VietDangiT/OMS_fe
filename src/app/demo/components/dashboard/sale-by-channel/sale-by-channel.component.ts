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
import { SaleStore } from '../sale-store/sale-store.component';

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
  @Input() filter: string = '';
  @Input() rangeDate: (string | undefined)[] = [undefined, undefined];

  chartData: TreeMapData[] = [];
  saleStoreData: SaleStore[];

  chartOptions: Partial<OmsChartOptions> | any;

  constructor(private _dashboardService: DashboardService) {
    this.chartOptions = {
      chart: {
        height: 300,
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
    if (
      changes['filter']?.currentValue &&
      changes['filter']?.currentValue !== ''
    ) {
      this.getTotalSaleByChannel(changes['filter'].currentValue);
    }
    if (changes['rangeDate']?.currentValue) {
      if (this.rangeDate[0] && this.rangeDate[1])
        this.getTotalSaleByChannel(changes['rangeDate']?.currentValue);
    }
  }

  getTotalSaleByChannel(
    filter: string = '',
    rangeDate: (string | null)[] = [null, null]
  ) {
    this._dashboardService
      .getSaleByChannel(
        filter,
        rangeDate[0] ? rangeDate[0] : '',
        rangeDate[1] ? rangeDate[1] : ''
      )
      .subscribe((data: SaleStore[]) => {
        this.saleStoreData = [...data];
        const tmp = this.chartOptions;
        this.chartData = data.map((item: SaleStore) => ({
          x: item.channelName,
          y: item.actualValue,
        }));

        tmp.series[0].data = this.chartData;
        this.chartOptions = { ...tmp };
      });
  }
}
