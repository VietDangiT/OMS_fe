import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_ORDERS,
  GET_ORDER_DETAIL,
  GET_ORDER_STATUS,
} from '../constants/orders.constants';
import {
  OrderApiResponse,
  OrderDetailApiResponse,
  OrderParams,
  OrderStatusApiResponse,
} from '../models/orders.models';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly apollo: Apollo) {}

  getOrders(orderParams: OrderParams): Observable<OrderApiResponse> {
    const { channelId, fromDate, keyword, limit, page, status, toDate } =
      orderParams;

    return this.apollo
      .watchQuery<OrderApiResponse>({
        query: GET_ORDERS,
        variables: {
          channelId,
          fromDate,
          toDate,
          keyword,
          status,
          limit,
          page,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getOrderDetail(id: number): Observable<OrderDetailApiResponse> {
    return this.apollo
      .watchQuery<OrderDetailApiResponse>({
        query: GET_ORDER_DETAIL,
        variables: {
          orderId: id,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getOrderStatus(id: number): Observable<OrderStatusApiResponse> {
    return this.apollo
      .watchQuery<OrderStatusApiResponse>({
        query: GET_ORDER_STATUS,
        variables: {
          channelId: id,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
