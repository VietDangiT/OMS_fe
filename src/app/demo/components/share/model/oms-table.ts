export interface OmsTable {
  totalRowCount: number;
  pageSize: number;
  pageNumber: number;
  first: number;
  data: {
    header: string[];
    body: unknown[];
  };
}
