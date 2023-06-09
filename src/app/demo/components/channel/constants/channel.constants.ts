import { gql } from 'apollo-angular';

export const GET_COUNTRIES = gql`
  query {
    countries {
      id
      countryName
      shortCode
    }
  }
`;

export const GET_CHANNELS_TABLE = gql`
  query GetChannelsTableDate(
    $countryId: Int
    $fromDate: DateTime
    $toDate: DateTime
    $keyword: String
    $status: Byte
    $limit: Int
    $page: Int
  ) {
    channelsTableData(
      countryId: $countryId
      fromDate: $fromDate
      toDate: $toDate
      limit: $limit
      page: $page
      keyword: $keyword
      status: $status
    ) {
      page
      first
      rows
      pageCount
      totalRecord
      data {
        channelName
        numberOfOrder
        totalSale
        status
        createdAt
      }
    }
  }
`;

export const channelTableHeader = [
  { field: 'channel', col: 'Channel' },
  { field: 'numberOfOrders', col: 'Number Of Orders' },
  { field: 'totalSales', col: 'Total Sales' },
  { field: 'status', col: 'Status' },
  { field: 'createdAt', col: 'Created At' },
  { field: 'updatedAt', col: 'Updated At' },
];

export const channelLabelItems = [
  { label: '0', id: '1', badge: '0', title: 'Active' },
  { label: '1', id: '2', badge: '0', title: 'Inactive' },
];
