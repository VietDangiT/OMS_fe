import { BaseChart, Statistic } from '../../interfaces/dashboard.models';

export interface TotalSalesTable {
  paging: Pagination;
  data: TotalSalesTableDTO[];
}

export interface TotalSalesTableApiResponse {
  detailTotalSales: TotalSalesTable;
}

export interface TotalSalesApiResponse {
  revenue: BaseChart[];
}

export interface Pagination {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalCount: number;
  totalPages: number;
  first: number;
}

export interface TotalSalesTableDTO {
  avgOrderSales: number;
  date: string;
  numberOfOrders: number;
  numberOfReturn: number;
  totalSales: number;
}

export interface TotalSalesChartDTO extends BaseChart {
  numberOfOrders: number;
}

export interface SaleStatisticApiResponse {
  totalSalesStatistic: Statistic[];
}
