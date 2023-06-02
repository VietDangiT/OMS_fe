import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { MenuItem } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { TableHeader } from 'src/app/demo/interface/global.model';
import {
  OrderApiResponse,
  OrderDetailApiResponse,
  OrderParams,
} from '../models/orders.models';

export const orderHeaderTable: TableHeader[] = [
  { field: 'order', col: 'Order' },
  { field: 'date', col: 'Date' },
  { field: 'channelName', col: 'Channel name' },
  { field: 'productUnits', col: 'Product Units' },
  { field: 'price', col: 'Price' },
  { field: 'shippingCarrier', col: 'Shipping carrier' },
  { field: 'status', col: 'Status' },
  { field: 'actions', col: 'Actions' },
];

export const orderLabelItems: MenuItem[] = [
  { label: '', id: '0', badge: '0', title: 'All' },
  { label: 'completed', id: '1', badge: '0', title: 'Completed' },
  { label: 'delivery', id: '2', badge: '0', title: 'Delivery' },
  { label: 'pending', id: '3', badge: '0', title: 'Pending' },
  { label: 'failed', id: '4', badge: '0', title: 'Failed' },
  { label: 'return', id: '5', badge: '0', title: 'Return' },
];

export const orderDetailHeaderTable: TableHeader[] = [
  { field: 'product', col: 'Product' },
  { field: 'barcode', col: 'Barcode' },
  { field: 'quantity', col: 'Quantity' },
  { field: 'price', col: 'Price' },
];

const GET_ORDERS = gql`
  query GetOrders(
    $channelId: Int
    $fromDate: DateTime
    $toDate: DateTime
    $keyword: String
    $status: String
    $limit: Int
    $page: Int
  ) {
    orders(
      channelId: $channelId
      fromDate: $fromDate
      toDate: $toDate
      keyword: $keyword
      status: $status
      limit: $limit
      page: $page
    ) {
      page
      first
      rows
      pageCount
      totalRecord
      data {
        id
        orderedAt
        channelImage
        channelName
        productUnit
        price
        shippingCarrier
        status
      }
    }
  }
`;

const GET_ORDER_DETAIL = gql`
  query GetOrderDetail($orderId: Int!) {
    orderDetail(id: $orderId) {
      id
      customerName
      phoneNumber
      address
      products {
        name
        barcode
        quantity
        price
      }
    }
  }
`;

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
}
