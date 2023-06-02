import { Product } from 'src/app/demo/api/product';

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

export interface OrderParams {
  channelId: number;
  fromDate: Date;
  toDate: Date;
  keyword: string;
  status: string;
  limit: number;
  page: number;
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
