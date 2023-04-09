import { Component, Input } from '@angular/core';

export interface DetailStatistic {
  title: string;
  data: {
    displayText: string;
    value: string | number;
    percent:string | number;
    hasCircle?: boolean;
    circleColor?: '#FCA310FF' | '#117B34FF' ;
    hasArrow?:boolean;
    ArrowActivity: 'pi pi-arrow-up'|'pi pi-arrow-down',
  }[];

}

@Component({
  selector: 'dashboard-detail-statistic',
  templateUrl: './detail-statistic.component.html',
  styleUrls: ['./detail-statistic.component.scss'],
})
export class DetailStatisticComponent {
  @Input() detailStatistic: DetailStatistic = {
    title: '',
    data: [],
  };
}
