import { gql } from 'apollo-angular';
import { TableHeader } from 'src/app/demo/interface/global.model';

export const totalSaleByChannelTableHeader: TableHeader[] = [
  { field: 'channel', col: 'Channel' },
  { field: 'status', col: 'Status' },
  { field: 'numberOfOrder', col: 'Number Of Orders' },
  { field: 'totalSales', col: 'Total Sales' },
];

export const GET_CHANNEL_ORDER_TABLE = gql`
  query GetChannelOrderTable(
    $fDate: String
    $tDate: String
    $limit: Int
    $page: Int
  ) {
    channelOrderTableData(
      fDate: $fDate
      tDate: $tDate
      limit: $limit
      page: $page
    ) {
      page
      first
      pageCount
      rows
      totalRecord
      data {
        channelImage
        channelName
        status
        numberOfOrder
        totalSales
      }
    }
  }
`;

export const GET_CHANNEL_SALE_BY_DATE = gql`
  query GetChannelSaleByDate($fDate: String, $tDate: String) {
    channelSaleByConditionDate(fDate: $fDate, tDate: $tDate) {
      displayText
      value
      date
    }
  }
`;
