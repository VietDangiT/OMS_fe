import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_CARD_INVENTORY,
  GET_CHANNEL_BY_PRODUCT_VARIANT,
  GET_CHANNEL_INVENTORY,
  GET_CHANNEL_STOCK_INFO,
  GET_INVENTORY_TABLE,
  GET_LISTED_STOCK_ON_CHANNEL,
  GET_PRODUCT_INVENTORY_INFO,
  GET_SALES_CHANNEL_STATISTIC,
} from '../constrants/inventory.constants';
import {
  CardInventoryApiResponse,
  ChannelByProductVariantApiResponse,
  ChannelStockApiResponse,
  InventoryByChannelResponse,
  InventoryParams,
  InventoryTableApiResponse,
  ListedStockOnChannelApiResponse,
  ProductInventoryInfoApiResponse,
  SaleChannelParams,
  SaleChannelStatisticApiResponse,
} from '../interfaces/inventory.models';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private apollo: Apollo) {}

  transformStatus(status: string): string {
    const transformedWords = status
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(
        /\b(\w)(\w+)\b/g,
        (_, firstChar, restOfWord) =>
          `${firstChar.toUpperCase()}${restOfWord.toLowerCase()}`
      );
    return transformedWords;
  }

  getInventoryTableData(
    params: InventoryParams
  ): Observable<InventoryTableApiResponse> {
    const {
      channelId,
      keyword,
      limit,
      page,
      status,
      fromDate,
      toDate,
      stockStatusFilter,
    } = params;
    return this.apollo
      .watchQuery<InventoryTableApiResponse>({
        query: GET_INVENTORY_TABLE,
        variables: {
          fromDate,
          stockStatusFilter,
          toDate,
          channelId,
          keyword,
          status,
          limit,
          page,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
  getSubmenuInventory(): Observable<InventoryByChannelResponse> {
    return this.apollo
      .watchQuery<InventoryByChannelResponse>({
        query: GET_CHANNEL_INVENTORY,
        variables: {},
      })
      .valueChanges.pipe(map(res => res.data));
  }
  getCardInventory(channelId: number): Observable<CardInventoryApiResponse> {
    return this.apollo
      .watchQuery<CardInventoryApiResponse>({
        query: GET_CARD_INVENTORY,
        variables: {
          channelId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getListedProductOnChannelInfo(
    productVariantId: number
  ): Observable<ListedStockOnChannelApiResponse> {
    return this.apollo
      .watchQuery<ListedStockOnChannelApiResponse>({
        query: GET_LISTED_STOCK_ON_CHANNEL,
        variables: {
          productVariantId: productVariantId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getChannelByProductVariant(
    productVariantId: number
  ): Observable<ChannelByProductVariantApiResponse> {
    return this.apollo
      .watchQuery<ChannelByProductVariantApiResponse>({
        query: GET_CHANNEL_BY_PRODUCT_VARIANT,
        variables: {
          productVariantId: productVariantId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getChannelStockInfo(
    productVariantId: number,
    channelId: number
  ): Observable<ChannelStockApiResponse> {
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

  getProductInventoryInfo(
    productVariantId: number
  ): Observable<ProductInventoryInfoApiResponse> {
    return this.apollo
      .watchQuery<ProductInventoryInfoApiResponse>({
        query: GET_PRODUCT_INVENTORY_INFO,
        variables: {
          productVariantId: productVariantId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getSaleChannelStatistic(
    saleChannelParams: SaleChannelParams
  ): Observable<SaleChannelStatisticApiResponse> {
    return this.apollo
      .watchQuery<SaleChannelStatisticApiResponse>({
        query: GET_SALES_CHANNEL_STATISTIC,
        variables: {
          productVariantId: saleChannelParams.Id,
          fromDate: saleChannelParams.fromDate,
          toDate: saleChannelParams.toDate,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
