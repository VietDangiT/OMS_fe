import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  pieData: ChartData;

  totalReturn: string = '0';

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.dashboardService
      .getTotalReturn(changes['filterArr'].currentValue)
      .pipe(
        tap((result: TotalReturnByApiResponse) => {
          const { returnsBy } = result;

          this.initTotalReturnChart(returnsBy);
        })
      )
      .subscribe();
  }

  initTotalReturnChart(result: TotalReturn[]) {
    var labelArr: string[] = [];

    var dataArr: number[] = [];

    var total: number = 0;

    result.map((item: TotalReturn) => {
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
          backgroundColor: [
            environment.primaryColor,
            environment.secondaryColor,
            environment.thirdColor,
          ],
          hoverBackgroundColor: [
            environment.primaryColor,
            environment.secondaryColor,
            environment.thirdColor,
          ],
        },
      ],
    };
  }
}
