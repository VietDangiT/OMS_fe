import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseChart, TotalOrderApiResponse } from '../interfaces/interfaces';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'dashboard-total-orders',
  templateUrl: './total-orders.component.html',
  styleUrls: ['./total-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardTotalOrdersComponent {
  @Input() basicOptions!: ChartOptions;

  @Input() filterArr: string[];

  totalOrderData: ChartData;

  totalOrder: string = '0';

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.dashboardService
      .getTotalOrders(changes['filterArr'].currentValue)
      .pipe(
        tap((result: TotalOrderApiResponse) => {
          const { totalOrdersBy: totalOrders } = result;

          this.initTotalOrderChart(totalOrders);
        })
      )
      .subscribe();
  }

  initTotalOrderChart(result: BaseChart[]) {
    var totalArr: number[] = [];

    var labelArr: string[] = [];

    var order: number = 0;

    result.map((item: BaseChart) => {
      totalArr.push(item.value);
      labelArr.push(new Date(item.text).toLocaleDateString());
      order += item.value;
    });

    this.totalOrder = order.toLocaleString('en-US');

    this.totalOrderData = {
      labels: labelArr,
      datasets: [
        {
          label: 'Total Orders',
          data: totalArr,
          borderColor: environment.primaryColor,
          backgroundColor: environment.primaryColor,
        },
      ],
    };
  }
}
