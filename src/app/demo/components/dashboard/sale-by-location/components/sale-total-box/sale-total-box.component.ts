import { Component, Input } from '@angular/core';

@Component({
  selector: 'oms-sale-total-box',
  templateUrl: './sale-total-box.component.html',
  styleUrls: ['./sale-total-box.component.scss'],
})
export class SaleTotalBoxComponent {
  @Input() icon: string;

  @Input() color: string;

  @Input() dateRange: Date[];

  @Input() value: number;

  @Input() type: string;
}
