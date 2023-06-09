import { gql } from 'apollo-angular';
import { TableHeader } from 'src/app/demo/interface/global.model';

export const GET_ORDER_SUMMARY = gql`
  query GetTotalOrderSummary($fDate: String, $tDate: String) {
    totalOrderSummary(fDate: $fDate, tDate: $tDate) {
      percentage
      displayText
      value
    }
  }
`;

export const GET_TOTAL_ORDER_TABLE = gql`
  query GetTotalOrderTable(
    $fDate: String
    $tDate: String
    $limit: Int
    $page: Int
  ) {
    totalOrderByStatus(
      fDate: $fDate
      tDate: $tDate
      limit: $limit
      page: $page
    ) {
      page
      first
      rows
      pageCount
      totalRecord
      data {
        date
        numberOfCompleted
        numberOfFailed
        numberOfReturn
        numberOfOrders
      }
    }
  }
`;

export const totalOrdersTableHeader: TableHeader[] = [
  { field: 'date', col: 'Date' },
  { field: 'numberOfCompleted', col: 'Completed' },
  { field: 'numberOfFailed', col: 'Failed' },
  { field: 'numberOfReturn', col: 'Return' },
  { field: 'numberOfOrders', col: 'Number of Orders' },
];
