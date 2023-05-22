import { Component, Input } from '@angular/core';

@Component({
  selector: 'oms-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.scss'],
})
export class SalesDetailComponent {
  @Input() dateRange: string;

  @Input() total: number = 0;

  @Input() percentage: number = 0;

  @Input() styleClass: string;

  @Input() type: string;
}
