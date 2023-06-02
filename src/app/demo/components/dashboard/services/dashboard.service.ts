import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  ProductVariantApiResponse,
  ProductVariantItemsSoldApiResponse,
  StatisticOrderStatusApiResponse,
  StatisticProductChannelByStatusApiResponse,
  StatisticProductMarketplaceStockApiResponse,
  TotalOrderApiResponse,
  TotalReturnByApiResponse,
  TotalSalesApiResponse,
  TotalSalesByChannelApiResponse,
  TotalSalesByLocationApiResponse,
  TotalSalesByProductApiResponse,
} from '../interfaces/dashboard.models';

const GET_TOTAL_SALES = gql`
  query GetTotalSale($fromDate: DateTime!, $toDate: DateTime!) {
    totalSale(fromDate: $fromDate, toDate: $toDate) {
      date
      value
    }
  }
`;

const GET_RETURNS_BY = gql`
  query GetReturnsBy($fromDate: DateTime!, $toDate: DateTime!) {
    returnsBy(fromDate: $fromDate, toDate: $toDate) {
      numberOfReturn
      value
    }
  }
`;

const GET_TOTAL_SALES_BY_PRODUCT = gql`
  query GetTotalSaleProductsBy($fromDate: DateTime!, $toDate: DateTime!) {
    totalSaleProductsBy(fromDate: $fromDate, toDate: $toDate) {
      text
      value
    }
  }
`;

const GET_TOTAL_SALES_BY_LOCATION = gql`
  query GetTotalSalesByLocation($fromDate: String!, $toDate: String!) {
    totalSaleByLocation(fromDate: $fromDate, toDate: $toDate) {
      displayText
      value
    }
  }
`;

const GET_TOTAL_ORDERS = gql`
  query GetTotalOrders($fromDate: DateTime!, $toDate: DateTime!) {
    totalOrdersBy(fromDate: $fromDate, toDate: $toDate) {
      text
      value
    }
  }
`;

const GET_TOTAL_SALES_BY_CHANNEL = gql`
  query GetTotalSalesByChannel($fromDate: String!, $toDate: String!) {
    totalSaleByChannel(fromDate: $fromDate, toDate: $toDate) {
      percentage
      displayText
      value
    }
  }
`;

const GET_PRODUCT_VARIANT_ITEMS_SOLD = gql`
  query GetProductVariantItemSold(
    $productCatalogId: Int!
    $fromDate: DateTime!
    $toDate: DateTime!
  ) {
    itemsSoldByProductVariant(
      productCatalogId: $productCatalogId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      date
      value
    }
  }
`;

const GET_ORDERS_STATISTIC = gql`
  query GetOrdersStatistic(
    $channelId: Int!
    $fromDate: DateTime!
    $toDate: DateTime!
  ) {
    statisticOrders(
      channelId: $channelId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      current
      previous
      text
      value
    }
  }
`;

const GET_PRODUCT_CHANNEL_STOCK = gql`
  query GetProductChannelStock($channelId: Int!) {
    productChannelStock(channelId: $channelId) {
      current
      previous
      text
      value
    }
  }
`;

const GET_PRODUCT_CHANNEL_BY_STATUS = gql`
  query GetProductChannelByStatus($channelId: Int!) {
    productChannelByStatus(channelId: $channelId) {
      current
      previous
      text
      value
    }
  }
`;

const GET_PRODUCT_VARIANTS = gql`
  query {
    productVariants {
      name
      description
      id
    }
  }
`;

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

  getTotalOrders(filter: string[]): Observable<TotalOrderApiResponse> {
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
    filter: string[]
  ): Observable<TotalSalesByChannelApiResponse> {
    return this.apollo
      .watchQuery<TotalSalesByChannelApiResponse>({
        query: GET_TOTAL_SALES_BY_CHANNEL,
        variables: {
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

  getOrderStatus(
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
