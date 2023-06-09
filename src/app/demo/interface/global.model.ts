export interface TableHeader {
  field: string;
  col: string;
}

export interface PagingParams {
  fromDate?: Date;
  toDate?: Date;
  keyword?: string;
  status?: string | number;
  limit: number;
  page: number;
}

export interface TableConfig {
  pageLimit: number;
  page: number;
  keyword: string;
  gapPageNumber: number;
}

export type DateFilterKey = 'week' | 'month' | 'year';

export type DateFilterValues = {
  [K in DateFilterKey]: [Date, Date];
};

export interface ResultItem {
  name: string;
  data: { x: string | number | Date; y: number }[];
}