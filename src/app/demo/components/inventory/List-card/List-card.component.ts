import { Component, OnInit } from '@angular/core';
import { CHANNEL_ID } from '../constrants/inventory.constrants';
import { InventoryService } from '../services/inventory.service';
import { Observable } from 'rxjs';
import { CardInventory, CardInventoryApiResponse, InventoryParams } from '../interfaces/inventory.component';

@Component({
  selector: 'app-List-card',
  templateUrl: './List-card.component.html',
  styleUrls: ['./List-card.component.scss']
})
export class ListCardComponent implements OnInit {
  cardInventory:CardInventory[];
  channelId = CHANNEL_ID;
  constructor(private inventoryService : InventoryService) { }
  params : InventoryParams;
  ngOnInit() {
    this.getInventoryCard();
    console.log(this.cardInventory);
  }
getInventoryCard():void {
  this.inventoryService.getCardInventory(this.params).subscribe((res : CardInventoryApiResponse)=> {
    const  {productStatistic : data } = res;
    this.cardInventory = data;
  })

}
}
