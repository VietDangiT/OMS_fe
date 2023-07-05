import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_AVG_PRICE,
  GET_ORDER_BY_CHANNEL,
  GET_ORDER_SUMMARY,
  GET_TOP_SOLD_PRODUCT,
  GET_TOTAL_ORDER_TABLE,
} from '../constants/total-orders.constants';
import {
  AvgPriceApiResponse,
  OrderByChannelApiResponse,
  OrderParams,
  TopSoldProductApiResponse,
  TotalOrderByStatusApiResponse,
  TotalOrderSummaryApiResponse,
} from '../models/total-orders.models';

@Injectable({
  providedIn: 'root',
})
export class TotalOrdersService {
  constructor(private readonly apollo: Apollo) {}

  getOrderSummary(dates: Date[]): Observable<TotalOrderSummaryApiResponse> {
    return this.apollo
      .watchQuery<TotalOrderSummaryApiResponse>({
        query: GET_ORDER_SUMMARY,
        variables: {
          fDate: dates[0],
          tDate: dates[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getOrderTable(
    params: Partial<OrderParams>
  ): Observable<TotalOrderByStatusApiResponse> {
    const { fromDate, toDate, limit, page, channelId } = params;

    return this.apollo
      .watchQuery<TotalOrderByStatusApiResponse>({
        query: GET_TOTAL_ORDER_TABLE,
        variables: {
          channelId,
          fromDate,
          toDate,
          limit,
          page,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getOrderByChannel(
    params: Partial<OrderParams>
  ): Observable<OrderByChannelApiResponse> {
    const { channelId, fromDate, toDate } = params;

    return this.apollo
      .watchQuery<OrderByChannelApiResponse>({
        query: GET_ORDER_BY_CHANNEL,
        variables: {
          channelId,
          fromDate,
          toDate,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getAvgPricePerOrder(
    params: Partial<OrderParams>
  ): Observable<AvgPriceApiResponse> {
    const { channelId, fromDate, toDate } = params;

    return this.apollo
      .watchQuery<AvgPriceApiResponse>({
        query: GET_AVG_PRICE,
        variables: {
          channelId,
          fromDate,
          toDate,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getTopSoldProducts(
    params: Partial<OrderParams>,
    top: number
  ): Observable<TopSoldProductApiResponse> {
    const { channelId, fromDate, toDate } = params;

    return this.apollo
      .watchQuery<TopSoldProductApiResponse>({
        query: GET_TOP_SOLD_PRODUCT,
        variables: {
          channelId,
          fromDate,
          toDate,
          top,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
