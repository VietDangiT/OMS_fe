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
  @Input() rangeDate: string[] = ['', ''];
  @Input() chartData: TreeMapData[] = [];
  saleStoreData: SaleStore[];

  chartOptions: Partial<OmsChartOptions> | any = {
    chart: {
      height: 300,
      type: 'treemap',
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        data: this.chartData ? this.chartData : [],
      },
    ],
    colors: [`${fullConfig.theme?.colors!['primary']}`],
  };

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getTotalSaleByChannel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.chartOptions.series[0].data = [...changes['data'].currentValue];
    }
    if (changes['filter']?.currentValue) {
      this.getTotalSaleByChannel(changes['filter'].currentValue);
    }
    if (changes['rangeDate']?.currentValue) {
      this.getTotalSaleByChannel(changes['rangeDate']?.currentValue);
    }
  }

  getTotalSaleByChannel(filter: string = '', rangeDate: any[] = ['', '']) {
    this._dashboardService
      .getSaleByChannel(filter, rangeDate)
      .subscribe((data: any) => {
        console.log(data);
        this.saleStoreData = [...data.data];
        const tmp = this.chartData;
        data.data.map((item: SaleStore) => {
          tmp.push({
            x: item.channelName,
            y: item.actualValue,
          });
        });
        this.chartOptions.series[0].data = [...tmp];
      });
  }
}
