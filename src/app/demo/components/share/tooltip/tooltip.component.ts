import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'oms-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() destination: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['destination']?.currentValue) {
      const destinationArr = changes['destination']?.currentValue.split('/');
      if (destinationArr.length > 1) this.destination = destinationArr[1];
    }
  }
}
