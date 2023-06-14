import { Product } from 'src/app/demo/api/product';
import { PagingParams } from 'src/app/demo/interface/global.model';
import { BaseChart } from '../../dashboard/interfaces/dashboard.models';

export interface Order {
  id?: number;
  orderedAt?: string;
  price?: number;
  shippingAddress?: string;
  status?: string;
  totalProduct?: number;
  channelName?: string;
  channelImage?: string;
  productUnit?: number;
  shippingCarrier?: string;
}

export interface OrderDetail extends Order {
  customerName: string;
  phoneNumber: string;
  address: string;
  products: Partial<Product>[];
}

export interface OrderParams extends PagingParams {
  channelId: number | null;
}

export interface OrderApiResponse {
  orders: {
    data: Order[];
    first: number;
    page: number;
    pageCount: number;
    rows: number;
    totalRecord: number;
  };
}

export interface OrderDetailApiResponse {
  orderDetail: OrderDetail;
}

export interface OrderStatusApiResponse {
  orderStatus: BaseChart[];
}
