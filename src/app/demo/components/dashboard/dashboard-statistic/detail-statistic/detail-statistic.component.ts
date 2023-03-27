import { Component, Input } from '@angular/core';

export interface DetailStatistic {
  title: string;
  nameManage: string;
  manageUrl: string;
  data: {
    displayText: string;
    value: string | number;
    hasCircle?: boolean;
    circleColor?: 'red' | 'green' | 'yellow';
  }[];
  hasFooter?: boolean;
  footer?: {
    displayText: string;
    value: string | number;
    url: string;
  };
}

@Component({
  selector: 'dashboard-detail-statistic',
  templateUrl: './detail-statistic.component.html',
  styleUrls: ['./detail-statistic.component.scss'],
})
export class DetailStatisticComponent {
  @Input() detailStatistic: DetailStatistic = {
    title: '',
    nameManage: '',
    manageUrl: '',
    data: [],
  };
}
