import { Component, Input } from '@angular/core';

@Component({
  selector: 'overview-box',
  templateUrl: './overview-box.component.html',
  styleUrls: ['./overview-box.component.scss'],
})
export class OverviewBoxComponent {
  @Input() dateRange: Date[];

  @Input() total: number = 0;

  @Input() percentage: number = 0;

  @Input() styleClass: string = '';

  @Input() type: string = '';
}
