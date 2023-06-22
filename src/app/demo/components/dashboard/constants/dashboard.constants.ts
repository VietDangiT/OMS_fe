import { gql } from 'apollo-angular';

export const GET_TOTAL_SALES = gql`
  query GetTotalSale($fromDate: String!, $toDate: String!) {
    totalSale(fromDate: $fromDate, toDate: $toDate) {
      date
      value
    }
  }
`;

export const GET_RETURNS_BY = gql`
  query GetReturnsBy($fromDate: String!, $toDate: String!) {
    returnsBy(fromDate: $fromDate, toDate: $toDate) {
      numberOfReturn
      value
      text
    }
  }
`;

export const GET_TOTAL_SALES_BY_PRODUCT = gql`
  query GetTotalSaleProductsBy($fromDate: String!, $toDate: String!) {
    totalSaleProductsBy(fromDate: $fromDate, toDate: $toDate) {
      text
      value
    }
  }
`;

export const GET_TOTAL_SALES_BY_LOCATION = gql`
  query GetTotalSalesByLocation($fromDate: String!, $toDate: String!) {
    totalSaleByLocation(fromDate: $fromDate, toDate: $toDate) {
      displayText
      value
    }
  }
`;

export const GET_TOTAL_ORDERS = gql`
  query GetTotalOrders($fromDate: String!, $toDate: String!) {
    totalOrdersBy(fromDate: $fromDate, toDate: $toDate) {
      text
      value
    }
  }
`;

export const GET_TOTAL_SALES_BY_CHANNEL = gql`
  query GetTotalSalesByChannel(
    $channelId: Int
    $fromDate: String!
    $toDate: String!
  ) {
    totalSaleByChannel(
      channelId: $channelId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      percentage
      displayText
      value
    }
  }
`;

export const GET_PRODUCT_VARIANT_ITEMS_SOLD = gql`
  query GetProductVariantItemSold(
    $productCatalogId: Int!
    $fromDate: String!
    $toDate: String!
  ) {
    itemsSoldByProductVariant(
      productCatalogId: $productCatalogId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      date
      value
    }
  }
`;

export const GET_ORDERS_STATISTIC = gql`
  query GetOrdersStatistic(
    $channelId: Int!
    $fromDate: String!
    $toDate: String!
  ) {
    statisticOrders(
      channelId: $channelId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      current
      previous
      text
      value
    }
  }
`;

export const GET_PRODUCT_CHANNEL_STOCK = gql`
  query GetProductChannelStock($channelId: Int!) {
    productChannelStock(channelId: $channelId) {
      current
      previous
      text
      value
    }
  }
`;

export const GET_PRODUCT_CHANNEL_BY_STATUS = gql`
  query GetProductChannelByStatus($channelId: Int!) {
    productChannelByStatus(channelId: $channelId) {
      current
      previous
      text
      value
    }
  }
`;

export const GET_PRODUCT_VARIANTS = gql`
  query GetProductVariants {
    productVariants {
      name
      description
      id
    }
  }
`;
