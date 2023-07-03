import { Component, Input } from '@angular/core';
import { CardInventory } from '../interfaces/inventory.models';

@Component({
  selector: 'app-List-card',
  templateUrl: './List-card.component.html',
  styleUrls: ['./List-card.component.scss'],
})
export class ListCardComponent {
  @Input() card: CardInventory;
}
