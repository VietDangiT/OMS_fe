import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  CardInventoryApiResponse,
  ChannelByProductVariantApiResponse,
  ChannelStockApiResponse,
  Inventory,
  InventoryByChannelResponse,
  InventoryParams,
  InventoryTableApiResponse,
  ListedStockOnChannelApiResponse,
  ProductInventoryInfoApiResponse,
} from '../interfaces/inventory.component';
import { Observable, map } from 'rxjs';
import {
  CHANNEL_ID,
  GET_CARD_INVENTORY,
  GET_CHANNEL_BY_PRODUCT_VARIANT,
  GET_CHANNEL_INVENTORY,
  GET_CHANNEL_STOCK_INFO,
  GET_INVENTORY_TABLE,
  GET_LISTED_STOCK_ON_CHANNEL,
  GET_PRODUCT_INVENTORY_INFO,
} from '../constrants/inventory.constrants';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private apollo: Apollo) {}

  getInventoryTableData(
    params: InventoryParams
  ): Observable<InventoryTableApiResponse> {
    return this.apollo
      .watchQuery<InventoryTableApiResponse>({
        query: GET_INVENTORY_TABLE,
        variables: {
          ...params,
          channelId: CHANNEL_ID,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
  getSubmenuInventory(): Observable<InventoryByChannelResponse> {
    return this.apollo
      .watchQuery<InventoryByChannelResponse>({
        query: GET_CHANNEL_INVENTORY ,
        variables: {
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
  getCardInventory(): Observable<CardInventoryApiResponse> {
    return this.apollo
      .watchQuery<CardInventoryApiResponse>({
        query: GET_CARD_INVENTORY,
        variables: {
          channelId: CHANNEL_ID,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getListedProductOnChannelInfo(productVariantId: number): Observable<ListedStockOnChannelApiResponse> {
    return this.apollo
      .watchQuery<ListedStockOnChannelApiResponse>({
        query: GET_LISTED_STOCK_ON_CHANNEL,
        variables: {
          productVariantId: productVariantId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getChannelByProductVariant(productVariantId: number): Observable<ChannelByProductVariantApiResponse> {
    return this.apollo
      .watchQuery<ChannelByProductVariantApiResponse>({
        query: GET_CHANNEL_BY_PRODUCT_VARIANT,
        variables: {
          productVariantId: productVariantId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getChannelStockInfo(productVariantId: number, channelId: number): Observable<ChannelStockApiResponse> {
    return this.apollo
      .watchQuery<ChannelStockApiResponse>({
        query: GET_CHANNEL_STOCK_INFO,
        variables: {
          channelId: channelId,
          productVariantId: productVariantId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getProductInventoryInfo(productVariantId: number): Observable<ProductInventoryInfoApiResponse> {
    return this.apollo
      .watchQuery<ProductInventoryInfoApiResponse>({
        query: GET_PRODUCT_INVENTORY_INFO,
        variables: {
          productVariantId: productVariantId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

}
