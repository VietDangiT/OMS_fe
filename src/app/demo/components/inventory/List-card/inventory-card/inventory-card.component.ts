import { Component, Input, OnInit } from '@angular/core';
import { CardInventory, CardInventoryApiResponse, InventoryParams } from '../../interfaces/inventory.component';
import { CHANNEL_ID } from '../../constrants/inventory.constrants';
import { InventoryService } from '../../services/inventory.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-inventory-card',
  templateUrl: './inventory-card.component.html',
  styleUrls: ['./inventory-card.component.scss']
})
export class InventoryCardComponent implements OnInit {
  @Input() displayText : string = "";
   sku = "SKUs"
  @Input() value : number = 0;
  constructor() { }
  ngOnInit() {
   this.displayText =  this.displayText.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toLocaleUpperCase(); });
   this.displayText = `${this.displayText} ${this.sku}`;
    console.log(this.displayText);
  }
}
