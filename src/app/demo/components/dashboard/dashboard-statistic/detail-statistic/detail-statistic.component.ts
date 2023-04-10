import { Component, Input } from '@angular/core';

export interface DetailStatistic {
  title: string;
  data: {
    displayText: string;
    value: string | number;
    percent:string | number;
    hasCircle?: boolean;
    circleColor?: 'success' | 'danger' ;
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
  @Input() detailStatistic: DetailStatistic;
  ngOnInit(){
    console.log(this.detailStatistic);
    
  }
}
