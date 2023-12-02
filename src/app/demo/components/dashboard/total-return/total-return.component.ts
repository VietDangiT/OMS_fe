import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { ChartData } from 'chart.js';
import { tap } from 'rxjs';
import { pieChartColors } from '../../share/oms-chart/oms-chart.component';
import {
  TotalReturn,
  TotalReturnByApiResponse,
} from '../interfaces/dashboard.models';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'dashboard-total-return',
  templateUrl: './total-return.component.html',
  styleUrls: ['./total-return.component.scss'],
})
export class TotalReturnComponent {
  @Input() pieOptions: unknown;

  @Input() filterArr: string[];

  private readonly dashboardService = inject(DashboardService);

  pieData: ChartData;

  totalReturn: string = '0';

  routerLink = 'total-orders';

  queryParams: { [key: string]: string } = {
    fDate: '',
    tDate: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.filterArr = changes['filterArr'].currentValue;

    this.dashboardService
      .getTotalReturn(this.filterArr)
      .pipe(
        tap((result: TotalReturnByApiResponse) => {
          const { returnsBy } = result;

          this.initTotalReturnChart(returnsBy);
        })
      )
      .subscribe();
    this.queryParams = {
      fDate: this.filterArr[0],
      tDate: this.filterArr[1],
    };
  }

  initTotalReturnChart(result: TotalReturn[]) {
    let labelArr: string[] = [];

    let dataArr: number[] = [];

    let total: number = 0;

    result.forEach((item: TotalReturn) => {
      labelArr.push(`${item.value.toFixed(1)}% ${item.text}`);

      dataArr.push(item.numberOfReturn);

      total += item.numberOfReturn;
    });

    this.totalReturn = total.toLocaleString('en-US');

    this.pieData = {
      labels: labelArr,
      datasets: [
        {
          data: dataArr,
          backgroundColor: pieChartColors,
          hoverBackgroundColor: pieChartColors,
        },
      ],
    };
  }
}
