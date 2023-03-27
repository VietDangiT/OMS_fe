import { Component } from '@angular/core';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardTable } from '../interfaces/dashboard-table';

@Component({
  selector: 'dashboard-total-sale-by-location',
  templateUrl: './total-sale-by-channel.component.html',
  styleUrls: ['./total-sale-by-channel.component.css'],
})
export class TotalSaleByChannelComponent {
  tableData: DashboardTable = {
    headerData: ['Channel', 'Status', 'Number of Orders', 'Total Sales'],
    bodyData: [
      {
        channelName: 'abc',
        status: 'Active',
        numberOrder: 10,
        totalSale: 12,
      },
      {
        channelName: 'abc',
        status: 'Active',
        numberOrder: 10,
        totalSale: 12,
      },
      {
        channelName: 'abc',
        status: 'Active',
        numberOrder: 10,
        totalSale: 12,
      },
      {
        channelName: 'abc',
        status: 'Active',
        numberOrder: 10,
        totalSale: 12,
      },
      {
        channelName: 'abc',
        status: 'Active',
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
  constructor(private _dashboardService: DashboardService) {}

  ngOnInit() {
    this.handleFilterChange();
  }

  handleFilterChange(filter: string = 'weekly') {
    console.log(filter);
    
    this._dashboardService
      .getSaleOnChannel(`assets/api/countries-sale-by-${filter}.json`)
      .subscribe((data: any) => {
        console.log(data.data);
        this.saleOnChannelData.datasets[0].data = data.data.map(
          (item: any) => item.sales
        );
      });
  }
}
