import { Component, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { DateFilterKey } from 'src/app/demo/interface/global.model';
import { OmsTable } from '../../share/model/oms-table';
import { PagingInfo } from '../../share/model/paginginfo';
import { baseChartOptions } from '../../share/oms-chart/oms-chart.component';
import { SaleByChannelHeatmap } from './components/sale-by-channel-heatmap/sale-by-channel-heatmap.component';
import { totalSaleByChannelTableHeader } from './constants/total-sale-by-channel.constants';
import { TotalSaleByChannel } from './models.ts/total-sale-by-channel.models';
import { TotalSaleByChannelService } from './services/total-sale-by-channel.service';

@Component({
  selector: 'dashboard-total-sale-by-channel',
  templateUrl: './total-sale-by-channel.component.html',
  styleUrls: ['./total-sale-by-channel.component.css'],
})
export class TotalSaleByChannelComponent {
  private readonly service = inject(TotalSaleByChannelService);

  baseChartOption = baseChartOptions;

  tableData: OmsTable<TotalSaleByChannel> = {
    first: 0,
    page: 0,
    pageCount: 0,
    rows: 0,
    totalRecord: 0,
    data: {
      header: totalSaleByChannelTableHeader,
      body: [],
    },
  };

  saleOnChannelData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'First Dataset',
        data: [1, 1, 1, 1, 1],
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.3,
      },
    ],
  };

  saleByChannelHeatmapData: SaleByChannelHeatmap[] = [
    {
      name: 'Lazada SG',
      data: [
        {
          x: 'Jul',
          y: 800,
        },
        {
          x: 'Aug',
          y: 1500,
        },
        {
          x: 'Sep',
          y: 4000,
        },
        {
          x: 'Oct',
          y: 4000,
        },
        {
          x: 'Nov',
          y: 1500,
        },
        {
          x: 'Dec',
          y: 800,
        },
      ],
    },
    {
      name: 'Tiki VN',
      data: [
        {
          x: 'Jul',
          y: 800,
        },
        {
          x: 'Aug',
          y: 1500,
        },
        {
          x: 'Sep',
          y: 4000,
        },
        {
          x: 'Oct',
          y: 4000,
        },
        {
          x: 'Nov',
          y: 1500,
        },
        {
          x: 'Dec',
          y: 800,
        },
      ],
    },
    {
      name: 'Shopee VN',
      data: [
        {
          x: 'Jul',
          y: 1500,
        },
        {
          x: 'Aug',
          y: 1500,
        },
        {
          x: 'Sep',
          y: 4000,
        },
        {
          x: 'Oct',
          y: 4000,
        },
        {
          x: 'Nov',
          y: 4000,
        },
        {
          x: 'Dec',
          y: 1500,
        },
      ],
    },
    {
      name: 'Lazada VN',
      data: [
        {
          x: 'Jul',
          y: 1500,
        },
        {
          x: 'Aug',
          y: 4000,
        },
        {
          x: 'Sep',
          y: 4000,
        },
        {
          x: 'Oct',
          y: 1500,
        },
        {
          x: 'Nov',
          y: 1500,
        },
        {
          x: 'Dec',
          y: 4000,
        },
      ],
    },
  ];

  ngOnInit(): void {}

  dateFilterChanged(dateRange: Date[]): void {
    console.log(dateRange);
  }

  filterChanged(val: DateFilterKey): void {
    console.log(val);
  }

  pagingInfo(e: PagingInfo): void {
    console.log(e);
  }
}
