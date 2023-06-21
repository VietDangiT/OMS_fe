import { Component, OnInit } from '@angular/core';
import { CardInventory, CardInventoryApiResponse, InventoryParams } from '../../interfaces/inventory.component';
import { CHANNEL_ID } from '../../constrants/inventory.constrants';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-card',
  templateUrl: './inventory-card.component.html',
  styleUrls: ['./inventory-card.component.scss']
})
export class InventoryCardComponent implements OnInit {

  cardInventory:CardInventory[];
  channelId = CHANNEL_ID;
  constructor(private inventoryService : InventoryService) { }
  params : InventoryParams;
  ngOnInit() {
    this.getInventoryCard();
  }
getInventoryCard():void {
  this.inventoryService.getCardInventory(this.params).subscribe((res : CardInventoryApiResponse)=> {
    const  {productStatistic : cardInventory } = res;
    this.cardInventory = cardInventory;
    console.log(this.cardInventory);
  })

}
}
