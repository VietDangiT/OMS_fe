import { gql } from 'apollo-angular';

export const GET_TOTAL_SALES = gql`
  query GetTotalSale($fromDate: DateTime!, $toDate: DateTime!) {
    totalSale(fromDate: $fromDate, toDate: $toDate) {
      date
      value
    }
  }
`;

export const GET_RETURNS_BY = gql`
  query GetReturnsBy($fromDate: DateTime!, $toDate: DateTime!) {
    returnsBy(fromDate: $fromDate, toDate: $toDate) {
      numberOfReturn
      value
      text
    }
  }
`;

export const GET_TOTAL_SALES_BY_PRODUCT = gql`
  query GetTotalSaleProductsBy($fromDate: DateTime!, $toDate: DateTime!) {
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
  query GetTotalOrders($fromDate: DateTime!, $toDate: DateTime!) {
    totalOrdersBy(fromDate: $fromDate, toDate: $toDate) {
      text
      value
    }
  }
`;

export const GET_TOTAL_SALES_BY_CHANNEL = gql`
  query GetTotalSalesByChannel($fromDate: String!, $toDate: String!) {
    totalSaleByChannel(fromDate: $fromDate, toDate: $toDate) {
      percentage
      displayText
      value
    }
  }
`;

export const GET_PRODUCT_VARIANT_ITEMS_SOLD = gql`
  query GetProductVariantItemSold(
    $productCatalogId: Int!
    $fromDate: DateTime!
    $toDate: DateTime!
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
    $fromDate: DateTime!
    $toDate: DateTime!
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
