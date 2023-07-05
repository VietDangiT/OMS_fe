import { PagingParams } from 'src/app/demo/interface/global.model';
import { BaseChart } from '../../interfaces/dashboard.models';

export interface TotalOrderSummaryApiResponse {
  totalOrderSummary: BaseChart[];
}

export interface TotalOrderByStatusApiResponse {
  totalOrderByStatus: {
    data: TotalOrder[];
    first: number;
    page: number;
    pageCount: number;
    rows: number;
    totalRecord: number;
  };
}

export interface TotalOrder {
  date: string;
  numberOfCompleted: number;
  numberOfFailed: number;
  numberOfReturn: number;
  numberOfOrders: number;
}

export interface OrderByChannelApiResponse {
  totalOrderByChannel: BaseChart[];
}

export interface OrderParams extends PagingParams {
  channelId?: number | null;
}

export interface AvgPriceApiResponse {
  averagePricePerOrder: BaseChart[];
}

export interface TopSoldProductApiResponse {
  topSoldProduct: BaseChart[];
}
