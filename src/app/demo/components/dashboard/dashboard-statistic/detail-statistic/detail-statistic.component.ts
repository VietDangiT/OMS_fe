import { Component, Input, SimpleChanges } from '@angular/core';
import { Statistic, StockStatus } from '../../interfaces/dashboard.models';

@Component({
  selector: 'dashboard-detail-statistic',
  templateUrl: './detail-statistic.component.html',
  styleUrls: ['./detail-statistic.component.scss'],
})
export class DetailStatisticComponent {
  @Input() detailStatistic: Statistic[];

  @Input() stockStatistic: StockStatus;

  @Input() heading: string;

  stockArr: [string, number][] = [];

  formattedArr: { name: string; value: number }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stockStatistic']?.currentValue) {
      this.stockArr = Object.entries(changes['stockStatistic']?.currentValue);

      this.formattedArr = this.stockArr.map(([name, value]) => ({
        name: name.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
          return str.toLocaleUpperCase();
        }),
        value,
      }));

      this.formattedArr.pop();
    }
  }
}
