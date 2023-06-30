import { Component, Input, OnInit } from '@angular/core';
import { CardInventory, CardInventoryApiResponse, Inventory } from '../interfaces/inventory.component';
import { InventoryService } from '../services/inventory.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-List-card',
  templateUrl: './List-card.component.html',
  styleUrls: ['./List-card.component.scss']
})
export class ListCardComponent implements OnInit {
  @Input()card:CardInventory;

  constructor(private inventoryService:InventoryService) { }
  ngOnInit() {
    console.log(this.card);

  }
}
