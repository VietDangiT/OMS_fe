import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseChart, TotalSalesApiResponse } from '../interfaces/interfaces';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'dashboard-total-sale-chart',
  templateUrl: './total-sale-chart.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TotalsalechartComponent {
  @Input() option: ChartOptions;

  @Input() filterArr: string[];

  totalSaleData: ChartData;

  totalSale: string;

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.dashboardService
      .getTotalSale(changes['filterArr'].currentValue)
      .pipe(
        tap((result: TotalSalesApiResponse) => {
          const { totalSale } = result;

          this.initTotalSaleChart(totalSale);
        })
      )
      .subscribe();
  }

  initTotalSaleChart(result: BaseChart[]) {
    let sale: number = 0;

    let totalArr: number[] = [];

    let labelArr: string[] = [];

    result.forEach((item: BaseChart) => {
      totalArr.push(item.value);

      labelArr.push(new Date(item.date).toLocaleDateString());

      sale += item.value;
    });

    this.totalSale = sale.toLocaleString('en-US');

    this.totalSaleData = {
      labels: labelArr,
      datasets: [
        {
          label: 'Total Sales',
          data: totalArr,
          borderColor: environment.primaryColor,
          backgroundColor: environment.primaryColor,
          tension: 0.4,
          pointBorderWidth: 2,
        },
      ],
    };
  }
}
