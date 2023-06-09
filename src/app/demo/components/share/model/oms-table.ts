import { TableHeader } from "src/app/demo/interface/global.model";

export interface OmsTable<T> {
  page?: number;
  first?: number;
  rows?: number;
  pageCount?: number;
  totalRecord?: number;
  data: {
    header: TableHeader[];
    body: T[];
  };
}
