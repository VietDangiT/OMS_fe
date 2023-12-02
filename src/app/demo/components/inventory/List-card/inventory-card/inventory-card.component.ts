import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inventory-card',
  templateUrl: './inventory-card.component.html',
  styleUrls: ['./inventory-card.component.scss'],
})
export class InventoryCardComponent {
  @Input() displayText: string = '';
  @Input() value: number = 0;
}
