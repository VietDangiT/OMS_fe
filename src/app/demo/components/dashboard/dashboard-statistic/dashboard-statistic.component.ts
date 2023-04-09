import { Component, Input } from '@angular/core';
import { DetailStatistic } from './detail-statistic/detail-statistic.component';

@Component({
  selector: 'dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrls: ['./dashboard-statistic.component.css'],
})
export class DashboardStatisticComponent {
  @Input() data: DetailStatistic[] = [];
}
 