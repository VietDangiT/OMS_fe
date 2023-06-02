import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { tap } from 'rxjs';
import {
  BaseChart,
  TotalSalesByLocationApiResponse,
} from '../interfaces/interfaces';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'dashboard-total-sale-by-location',
  templateUrl: './total-sale-by-location.component.html',
  styleUrls: ['./total-sale-by-location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TotalSaleByLocationComponent {
  @Input() filterArr: string[] = ['', ''];

  totalSale: number = 0;

  chartData: string[][];

  locationSale: { displayText: string; value: number }[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterArr'].currentValue) {
      if (this.filterArr[0] && this.filterArr[1]) {
        this.filterArr = changes['filterArr']?.currentValue;

        this.getTotalSaleByLocation(this.filterArr);
      }
    }
  }

  getTotalSaleByLocation(filterArr = ['', '']) {
    this.dashboardService
      .getTotalSalesByLocation(filterArr)
      .pipe(
        tap((result: TotalSalesByLocationApiResponse) => {
          const { totalSaleByLocation: data } = result;

          this.totalSale = 0;

          this.locationSale.length = 0;

          const temp = [['Country', 'Sale']];

          data.forEach((item: BaseChart) => {
            this.totalSale += item.value;

            temp.push([`${item.displayText}`, item.value.toString()]);

            this.locationSale.push({
              displayText: item.displayText,

              value: item.value,
            });
          });

          this.chartData = [...temp];
        })
      )
      .subscribe();
  }
}
