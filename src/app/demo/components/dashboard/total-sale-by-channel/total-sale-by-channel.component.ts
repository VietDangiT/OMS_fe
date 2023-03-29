import { Component } from '@angular/core';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardTable } from '../interfaces/dashboard-table';
import { SaleByChannelHeatmap } from './sale-by-channel-heatmap/sale-by-channel-heatmap.component';

export interface OrderOnChannelData {
  headerData: string[];
  bodyData: {
    channelImage: string;
    channelName: string;
    isActive: true;
    numberOrder: number;
    totalSale: number;
  }[];
}

@Component({
  selector: 'dashboard-total-sale-by-location',
  templateUrl: './total-sale-by-channel.component.html',
  styleUrls: ['./total-sale-by-channel.component.css'],
})
export class TotalSaleByChannelComponent {
  tableData: OrderOnChannelData = {
    headerData: ['Channel', 'Status', 'Number of Orders', 'Total Sales'],
    bodyData: [
      {
        channelImage: "",
        channelName: 'abc',
        isActive: true,
        numberOrder: 10,
        totalSale: 12,
      },
      {
        channelImage: "",
        channelName: 'abc',
        isActive: true,
        numberOrder: 10,
        totalSale: 12,
      },
      {
        channelImage: "",
        channelName: 'abc',
        isActive: true,
        numberOrder: 10,
        totalSale: 12,
      },
      {
        channelImage: "",
        channelName: 'abc',
        isActive: true,
        numberOrder: 10,
        totalSale: 12,
      },
      {
        channelImage: "",
        channelName: 'abc',
        isActive: true,
        numberOrder: 10,
        totalSale: 12,
      },
      {
        channelImage: "",
        channelName: 'abc',
        isActive: true,
        numberOrder: 10,
        totalSale: 12,
      },
    ],
  };

  saleOnChannelData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
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

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit() {
    this.handleFilterChange();
  }

  handleFilterChange(filter: string = 'weekly') {
    this.getSaleOnChannel(filter);
  }
  getSaleOnChannel(filter: string = 'weekly') {
    this._dashboardService
      .getSaleOnChannel(`assets/api/countries-sale-by-${filter}.json`)
      .subscribe((data: any) => {
        const tmp = this.saleOnChannelData;

        tmp.datasets[0].data = data.data.map((item: any) => item.sales);

        this.saleOnChannelData = { ...tmp };
      });
  }
}
