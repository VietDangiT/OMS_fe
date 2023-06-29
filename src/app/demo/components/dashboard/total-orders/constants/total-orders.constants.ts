import { gql } from 'apollo-angular';
import { TableHeader } from 'src/app/demo/interface/global.model';

export const GET_ORDER_SUMMARY = gql`
  query GetTotalOrderSummary($fDate: String, $tDate: String) {
    totalOrderSummary(fromDate: $fDate, toDate: $tDate) {
      percentage
      displayText
      value
    }
  }
`;

export const GET_TOTAL_ORDER_TABLE = gql`
  query GetTotalOrderTable(
    $fromDate: String
    $toDate: String
    $limit: Int
    $page: Int
    $channelId: Int
  ) {
    totalOrderByStatus(
      fromDate: $fromDate
      toDate: $toDate
      limit: $limit
      page: $page
      channelId: $channelId
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

export const GET_ORDER_BY_CHANNEL = gql`
  query GetTotalOrderByChannel(
    $channelId: Int
    $fromDate: String
    $toDate: String
  ) {
    totalOrderByChannel(
      channelId: $channelId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      displayText
      date
      value
    }
  }
`;

export const NUMBER_OF_PRODUCT = 5;
