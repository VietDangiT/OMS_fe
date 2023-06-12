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
