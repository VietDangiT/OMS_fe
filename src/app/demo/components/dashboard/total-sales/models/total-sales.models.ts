export interface TotalSalesTableApiResponse {
  paging: Pagingation;
  data: TotalSalesTableDTO[];
}

export interface TotalSalesApiResponse {
  compareData: TotalSalesChartDTO[];
  selectedData: TotalSalesChartDTO[];
}

export interface Pagingation {
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

export interface TotalSalesChartDTO {
  date: string;
  id: number;
  text: string;
  value: number;
  percentage: number;
  numberOfOrders: number;
}
