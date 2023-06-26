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
        id
        channelName
        numberOfOrder
        totalSale
        shortCode
        image
        updatedAt
        status
        createdAt
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

export const GET_STORES = gql`
  query GetStoresByChannel($channelId: Int, $limit: Int, $page: Int) {
    storesFromChannel(channelId: $channelId, limit: $limit, page: $page) {
      page
      first
      rows
      pageCount
      totalRecord
      data {
        totalSale
        totalOrders
        location
        storeImage
        displayText
        date
      }
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

export const storeTableHeader = [
  { field: 'storeImage', col: 'Image' },
  { field: 'displayText', col: 'Store Name' },
  { field: 'date', col: 'Created At' },
  { field: 'location', col: 'Location' },
  { field: 'totalOrders', col: 'Total Orders' },
  { field: 'totalSale', col: 'Total Sales' },
];

export const channelLabelItems = [
  { label: '0', id: '1', title: 'Active' },
  { label: '1', id: '2', title: 'Inactive' },
];
