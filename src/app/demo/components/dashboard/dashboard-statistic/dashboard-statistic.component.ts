import { Component, Input } from '@angular/core';
import { DashboardStatistic } from '../interfaces/dashboard-statistic';

@Component({
  selector: 'app-dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrls: ['./dashboard-statistic.component.css']
})
export class DashboardStatisticComponent {
  @Input() data: DashboardStatistic  = {
    orderData: {
      newOrders: 0,
      issue: 0
    },
    productInventoryData: {
      productOutOfStock: 0,
      nearlyOutOfStock: 0,
      notSellingProductInLastThreeMonth: 0
    },
    productData: {
      Inactive: 0
    },
    channelData: {
      activeChannel: 0,
      inactiveChannel: 0
    }
  };
}
