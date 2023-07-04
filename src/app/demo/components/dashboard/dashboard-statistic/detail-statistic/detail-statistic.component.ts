import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { HelperService } from 'src/app/demo/service/helper.service';
import { BaseChart, Statistic } from '../../interfaces/dashboard.models';

@Component({
  selector: 'dashboard-detail-statistic',
  templateUrl: './detail-statistic.component.html',
  styleUrls: ['./detail-statistic.component.scss'],
})
export class DetailStatisticComponent {
  @Input() detailStatistic: Statistic[];

  @Input() stockStatistic: BaseChart[];

  @Input() heading: string;

  @Input() routerLink: string;

  @Input() queryParams: { [key: string]: string };

  helperService = inject(HelperService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stockStatistic']?.currentValue) {
      this.stockStatistic = this.stockStatistic.map(s => {
        return {
          ...s,
          displayText:
            this.helperService.stockStatuses[s.displayText.toLowerCase()],
        };
      });
    }
  }
}
