import { BaseChart } from '../../interfaces/dashboard.models';

export interface TotalSalesTable {
  paging: Pagination;
  data: TotalSalesTableDTO[];
}

export interface TotalSalesTableApiResponse {
  detailTotalSales: TotalSalesTable;
}

export interface CompareDataApiResponse {
  compareData: TotalSalesChartDTO[];
  selectedData: TotalSalesChartDTO[];
}

export interface TotalSalesApiResponse {
  totalSales: CompareDataApiResponse[];
}

export interface ReturnApiResponse {
  return: CompareDataApiResponse[];
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

export type FilterKey = 'week' | 'month' | 'year';

export type FilterValues = {
  [K in FilterKey]: [Date, Date];
};
