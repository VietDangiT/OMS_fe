import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { HelperService } from 'src/app/demo/service/helper.service';
import { BaseChart } from '../../dashboard/interfaces/dashboard.models';

@Component({
  selector: 'app-List-card',
  templateUrl: './List-card.component.html',
  styleUrls: ['./List-card.component.scss'],
})
export class ListCardComponent {
  @Input() card: BaseChart[];

  helperService = inject(HelperService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'].currentValue) {
      this.card = this.card.map(c => {
        return {
          ...c,
          displayText:
            this.helperService.stockStatuses[c.displayText.toLowerCase()],
        };
      });
    }
  }
}
