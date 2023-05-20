export interface OmsTable<T> {
  page?: number;
  first?: number;
  rows?: number;
  pageCount?: number;
  totalRecord?: number;
  data: {
    header: string[];
    body: T[];
  };
}
