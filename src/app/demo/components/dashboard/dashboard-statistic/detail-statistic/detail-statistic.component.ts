import { Component, Input, SimpleChanges } from '@angular/core';
import { Statistic } from '../dashboard-statistic.component';



@Component({
  selector: 'dashboard-detail-statistic',
  templateUrl: './detail-statistic.component.html',
  styleUrls: ['./detail-statistic.component.scss'],
})
export class DetailStatisticComponent {
  @Input() detailStatistic: Statistic[];
  @Input() heading: string;
  ngOnChanges(changes: SimpleChanges){    
  }
}
