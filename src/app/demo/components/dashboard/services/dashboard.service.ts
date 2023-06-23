import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_ORDERS_STATISTIC,
  GET_PRODUCT_CHANNEL_BY_STATUS,
  GET_PRODUCT_CHANNEL_STOCK,
  GET_PRODUCT_VARIANTS,
  GET_PRODUCT_VARIANT_ITEMS_SOLD,
  GET_RETURNS_BY,
  GET_STOCK,
  GET_TOTAL_ORDERS,
  GET_TOTAL_SALES,
  GET_TOTAL_SALES_BY_CHANNEL,
  GET_TOTAL_SALES_BY_LOCATION,
  GET_TOTAL_SALES_BY_PRODUCT,
} from '../constants/dashboard.constants';
import {
  ProductVariantApiResponse,
  ProductVariantItemsSoldApiResponse,
  StatisticOrderStatusApiResponse,
  StatisticProductChannelByStatusApiResponse,
  StatisticProductMarketplaceStockApiResponse,
  StockApiResponse,
  TotalOrderApiResponse,
  TotalReturnByApiResponse,
  TotalSalesApiResponse,
  TotalSalesByChannelApiResponse,
  TotalSalesByLocationApiResponse,
  TotalSalesByProductApiResponse,
} from '../interfaces/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apollo: Apollo) {}

  getTotalSale(filter: string[]): Observable<TotalSalesApiResponse> {
    return this.apollo
      .watchQuery<TotalSalesApiResponse>({
        query: GET_TOTAL_SALES,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getTotalReturn(filter: string[]): Observable<TotalReturnByApiResponse> {
    return this.apollo
      .watchQuery<TotalReturnByApiResponse>({
        query: GET_RETURNS_BY,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getTotalSaleByProducts(
    filter: string[]
  ): Observable<TotalSalesByProductApiResponse> {
    return this.apollo
      .watchQuery<TotalSalesByProductApiResponse>({
        query: GET_TOTAL_SALES_BY_PRODUCT,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getTotalOrders(filter: string[] | Date[]): Observable<TotalOrderApiResponse> {
    return this.apollo
      .watchQuery<TotalOrderApiResponse>({
        query: GET_TOTAL_ORDERS,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getTotalSalesByLocation(
    filter: string[]
  ): Observable<TotalSalesByLocationApiResponse> {
    return this.apollo
      .watchQuery<TotalSalesByLocationApiResponse>({
        query: GET_TOTAL_SALES_BY_LOCATION,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getTotalSaleByChannel(
    filter: Date[] | string[],
    channelId: number | null = null
  ): Observable<TotalSalesByChannelApiResponse> {
    return this.apollo
      .watchQuery<TotalSalesByChannelApiResponse>({
        query: GET_TOTAL_SALES_BY_CHANNEL,
        variables: {
          channelId,
          fromDate: filter[0],
          toDate: filter[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getProductVariantItemsSold(
    id: number,
    filter: string[]
  ): Observable<ProductVariantItemsSoldApiResponse> {
    return this.apollo
      .watchQuery<ProductVariantItemsSoldApiResponse>({
        query: GET_PRODUCT_VARIANT_ITEMS_SOLD,
        variables: {
          productCatalogId: id,
          fromDate: filter[0],
          toDate: filter[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getProductVariants(): Observable<ProductVariantApiResponse> {
    return this.apollo
      .watchQuery<ProductVariantApiResponse>({
        query: GET_PRODUCT_VARIANTS,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getOrderStatistic(
    id: number,
    filter: string[]
  ): Observable<StatisticOrderStatusApiResponse> {
    return this.apollo
      .watchQuery<StatisticOrderStatusApiResponse>({
        query: GET_ORDERS_STATISTIC,
        variables: {
          channelId: id,
          fromDate: filter[0],
          toDate: filter[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getProductMarketplaceStock(
    id: number
  ): Observable<StatisticProductMarketplaceStockApiResponse> {
    return this.apollo
      .watchQuery<StatisticProductMarketplaceStockApiResponse>({
        query: GET_PRODUCT_CHANNEL_STOCK,
        variables: {
          channelId: id,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getStock(channelId: number): Observable<StockApiResponse> {
    return this.apollo
      .watchQuery<StockApiResponse>({
        query: GET_STOCK,
        variables: {
          channelId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getProductChannelByStatus(
    id: number
  ): Observable<StatisticProductChannelByStatusApiResponse> {
    return this.apollo
      .watchQuery<StatisticProductChannelByStatusApiResponse>({
        query: GET_PRODUCT_CHANNEL_BY_STATUS,
        variables: {
          channelId: id,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
