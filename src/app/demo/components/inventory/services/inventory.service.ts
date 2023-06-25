import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CardInventoryApiResponse, Inventory, InventoryByChannelResponse, InventoryParams, InventoryTableApiResponse } from '../interfaces/inventory.component';
import { Observable, map } from 'rxjs';
import { CHANNEL_ID, GET_CARD_INVENTORY, GET_CHANNEL_INVENTORY, GET_INVENTORY_TABLE, } from '../constrants/inventory.constrants';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

constructor(private apollo:Apollo) { }

getInventoryTableData(
  params: InventoryParams
): Observable<InventoryTableApiResponse> {
  return this.apollo
    .watchQuery<InventoryTableApiResponse>({
      query: GET_INVENTORY_TABLE,
      variables: {
        ...params,
        channelId : CHANNEL_ID,
      },
    })
    .valueChanges.pipe(map(res => res.data));
}
getCardInventory():Observable<CardInventoryApiResponse>{
  return this.apollo.watchQuery<CardInventoryApiResponse>({
    query: GET_CARD_INVENTORY,
    variables : {
      channelId : CHANNEL_ID,
    },
  })
  .valueChanges.pipe(map(res =>res.data));
}
getSubmenuInventory():Observable<InventoryByChannelResponse>{
  return this.apollo.watchQuery<InventoryByChannelResponse>({
    query: GET_CHANNEL_INVENTORY,
    variables : {
    },
  })
  .valueChanges.pipe(map(res =>res.data));
}
}
