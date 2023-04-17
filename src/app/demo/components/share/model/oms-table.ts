export interface OmsTable {
  page: number; 
  first: number; 
  rows: number; 
  pageCount: number;
  totalRecord: number;
  data: {
    header: string[];
    body: any[];
  };
}
