import { gql } from 'apollo-angular';
import { MenuItem } from 'primeng/api';
export const CHANNEL_ID = 1;

export const GET_INVENTORY_TABLE = gql`
  query GetInventoryTableDate(
    $fromDate: String
    $toDate: String
    $keyword: String
    $limit: Int
    $page: Int
    $stockStatusFilter: String
  ) {
    products(
      fromDate: $fromDate,
      toDate: $toDate,
      keyword: $keyword,
      limit: $limit,
      page: $page,
      stockStatusFilter: $stockStatusFilter
    ) {
      page
      first
      rows
      pageCount
      totalRecord
      data {
        productVariantImage
        sku
        productName
        availableStock
        basePrice
        inProcess
        sold
        id
      }
    }
  }
`;
export const GET_CARD_INVENTORY = gql`
  query GetInventoryTableDate(
    $channelId: Int
  ) {
    productStatistic(
      channelId: $channelId
    ) {
      live
      outOfStock
      lowOfStock
      delistedAndSuspended
      onDemand
      }
    }
`;
export const GET_CHANNEL_INVENTORY = gql`
  query GetChannelWithTotalProduct {
    channelWithTotalProduct{
      displayText
      value
      }
    }
`;

export const GET_LISTED_STOCK_ON_CHANNEL = gql`
  query GeListedProductOnChannelInfo(
    $productVariantId: Int!
  ) {
    listedProductOnChannelInfo(
      productVariantId: $productVariantId
    ) {
      image
      info
      displayText
      value
      }
    }
`;

export const GET_CHANNEL_BY_PRODUCT_VARIANT = gql`
  query GetChannelByProductVariant(
    $productVariantId: Int!
  ) {
    channelByProductVariant(
      productVariantId: $productVariantId
    ) {
      displayText
      id
      }
    }
`;

export const GET_CHANNEL_STOCK_INFO = gql`
  query GetChannelStockInfo(
    $channelId: Int!,
    $productVariantId: Int!
  ) {
    channelStockInfo(
      channelId: $channelId,
      productVariantId: $productVariantId
    ) {
      inProcess
      sold
      threshold
      inStock
      inhand
      onhold
      buffer
      unusable
      }
    }
`;

export const GET_PRODUCT_INVENTORY_INFO = gql`
  query GetProductInventoryInfo(
    $productVariantId: Int!
  ) {
    productInventoryInfo(
      productVariantId: $productVariantId
    )
    }
`;


export const inventoryTableHeader = [
  { field: 'productVariantImage', col: 'Image' },
  { field: 'sku', col: 'SKU' },
  { field: 'productName', col: 'Product Name' },
  { field: 'availableStock', col: 'Available Stock' },
  { field: 'inProcess', col: 'In-process' },
  { field: 'sold', col: 'Sold' },
  { field: 'action', col: 'Action' },

];
export const inventoryLabelItems = [
  { label: '', id: '0', badge: '0', title: 'All' },
  { label: '', id: '2', badge: '0', title: 'Stock available' },
  { label: '', id: '3', badge: '0', title: 'Low on stock' },
  { label: '', id: '4', badge: '0', title: 'Out of stock' },
];

