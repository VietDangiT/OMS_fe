import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'dashboard-total-return',
  templateUrl: './total-return.component.html',
  styleUrls: ['./total-return.component.scss'],
})
export class TotalReturnComponent {
  @Input() pieData: ChartData;

  @Input() pieOptions: any;

  @Input() totalReturn: string = '0' ;
}
