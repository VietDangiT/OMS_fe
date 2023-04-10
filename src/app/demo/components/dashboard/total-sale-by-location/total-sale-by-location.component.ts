import {
  AfterViewInit,
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { DashboardService } from 'src/app/demo/service/dashboard.service';
import { environment } from 'src/environments/environment';
import resolveConfig from 'tailwindcss/resolveConfig';

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

  constructor(private _dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterArr'].currentValue) {
      if (this.filterArr[0] && this.filterArr[1]) {
        this.filterArr = changes['filterArr']?.currentValue;
        this.getTotalSaleByLocation(this.filterArr);
      }
    }
  }

  getTotalSaleByLocation(filterArr: string[] = ['', '']) {
    this._dashboardService
      .getTotalSaleByLocation(filterArr[0], filterArr[1])
      .subscribe((data: any[]) => {
        this.totalSale = 0;
        this.locationSale.length = 0;
        const temp = [['Country', 'Sale']];
        data.forEach((item: any) => {
          this.totalSale += item.value;
          temp.push([`${item.displayText}`, item.value]);
          this.locationSale.push({
            displayText: item.displayText,
            value: item.value,
          });
        });
        this.chartData = [...temp];
      });
  }
}
