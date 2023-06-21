import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  BaseChart,
  TotalOrderApiResponse,
} from '../interfaces/dashboard.models';
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

  routerLink = 'total-orders';

  queryParams: { [key: string]: string } = {
    fDate: '',
    tDate: '',
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.filterArr = changes['filterArr'].currentValue;
    this.dashboardService
      .getTotalOrders(this.filterArr)
      .pipe(
        tap((result: TotalOrderApiResponse) => {
          const { totalOrdersBy: totalOrders } = result;

          this.initTotalOrderChart(totalOrders);
        })
      )
      .subscribe();

    this.queryParams = {
      fDate: this.filterArr[0],
      tDate: this.filterArr[1],
    };
  }

  initTotalOrderChart(result: BaseChart[]) {
    let totalArr: number[] = [];

    let labelArr: string[] = [];

    let order: number = 0;

    result.forEach((item: BaseChart) => {
      totalArr.push(item.value);
      labelArr.push(new Date(item.text).toLocaleDateString());
      order += item.value;
    });

    this.totalOrder = order.toLocaleString('en-US');

    this.totalOrderData = {
      labels: labelArr,
      datasets: [
        {
          label: $localize`Total Orders`,
          data: totalArr,
          borderColor: environment.primaryColor,
          backgroundColor: environment.primaryColor,
        },
      ],
    };
  }
}
