export interface OmsTable {
  totalRowCount: number;
  pageSize: number;
  pageNumber: number;
  data: {
    header: string[];
    body: unknown[];
  };
}
