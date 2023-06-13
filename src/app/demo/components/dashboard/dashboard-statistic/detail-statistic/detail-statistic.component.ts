import { Component, Input } from '@angular/core';
import { Statistic } from '../../interfaces/dashboard.models';

@Component({
  selector: 'dashboard-detail-statistic',
  templateUrl: './detail-statistic.component.html',
  styleUrls: ['./detail-statistic.component.scss'],
})
export class DetailStatisticComponent {
  @Input() detailStatistic: Statistic[];
  @Input() heading: string;
}
