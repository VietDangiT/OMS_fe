import { Component, Input } from '@angular/core';

@Component({
  selector: 'oms-item-statistic',
  templateUrl: './item-statistic.component.html',
  styleUrls: ['./item-statistic.component.scss']
})
export class ItemStatisticComponent {
  @Input() displayText: string;
  @Input() value: number = 0;
  @Input() colorClass: string;
}
