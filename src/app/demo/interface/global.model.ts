export interface TableHeader {
  field: string;
  col: string;
}

export interface PagingParams {
  fromDate?: Date | null;
  toDate?: Date | null;
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

export interface DropdownChangeEvent {
  originalEvent: Event;
  value: any;
}
