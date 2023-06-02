export interface TableHeader {
  field: string;
  col: string;
}

export interface PagingParams {
  fromDate: Date;
  toDate: Date;
  keyword: string;
  status: string;
  limit: number;
  page: number;
}
