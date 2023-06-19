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
    $fromDate: String
    $toDate: String
    $keyword: String
    $status: Byte
    $limit: Int
    $page: Int
  ) {
    channelsTableData(
      countryId: $countryId
      fDate: $fromDate
      tDate: $toDate
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

export const GET_CHANNELS_TABLE_DATA = gql`
  query GetTotalSaleChannels(
    $countryId: Int
    $currentPage: Int
    $limit: Int
    $fromDate: String
    $toDate: String
  ) {
    totalSaleChannels(
      countryId: $countryId
      currentPage: $currentPage
      limit: $limit
      fromDate: $fromDate
      toDate: $toDate
    ) {
      page
      first
      rows
      pageCount
      totalRecord
      data {
        numberOrders
        value
        status
        number
        name
        updatedAt
        createdAt
        id
      }
    }
  }
`;

export const GET_CHANNEL_STATUS = gql`
  query GetChannelStatus($channelId: Int) {
    channelStatus(countryId: $channelId) {
      displayText
      value
    }
  }
`;

export const channelTableHeader = [
  { field: 'channelName', col: 'Channel' },
  { field: 'numberOfOrders', col: 'Number Of Orders' },
  { field: 'totalSale', col: 'Total Sales' },
  { field: 'status', col: 'Status' },
  { field: 'createdAt', col: 'Created At' },
  { field: 'updatedAt', col: 'Updated At' },
];

export const channelLabelItems = [
  { label: '0', id: '1', title: 'Active' },
  { label: '1', id: '2', title: 'Inactive' },
];
