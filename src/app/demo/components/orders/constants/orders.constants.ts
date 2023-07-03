import { gql } from 'apollo-angular';
import { MenuItem } from 'primeng/api';
import { TableHeader } from 'src/app/demo/interface/global.model';

export const orderHeaderTable: TableHeader[] = [
  { field: 'order', col: 'Order' },
  { field: 'date', col: 'Date' },
  { field: 'channelName', col: 'Channel name' },
  { field: 'productUnits', col: 'Product Units' },
  { field: 'price', col: 'Price' },
  { field: 'shippingCarrier', col: 'Shipping carrier' },
  { field: 'status', col: 'Status' },
  { field: 'view', col: 'View' },
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

export const GET_ORDERS = gql`
  query GetOrders(
    $channelId: Int
    $fromDate: String
    $toDate: String
    $keyword: String
    $status: String
    $limit: Int
    $page: Int
    $userId: Int
  ) {
    orders(
      channelId: $channelId
      fromDate: $fromDate
      toDate: $toDate
      keyword: $keyword
      status: $status
      limit: $limit
      page: $page
      userId: $userId
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

export const GET_ORDER_DETAIL = gql`
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

export const GET_ORDER_STATUS = gql`
  query GetOrderStatus($channelId: Int, $fromDate: String, $toDate: String) {
    orderStatus(channelId: $channelId, fromDate: $fromDate, toDate: $toDate) {
      displayText
      value
    }
  }
`;
