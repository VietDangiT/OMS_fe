import { gql } from 'apollo-angular';
export const CHANNEL_ID = 1;

export const GET_INVENTORY_TABLE = gql`
  query GetInventoryTableDate(
    $channelId: Int
  ) {
    products(
      channelId: $channelId
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



export const inventoryTableHeader = [
  { field: 'productVariantImage', col: 'Image' },
  { field: 'sku', col: 'SKU' },
  { field: 'productName', col: 'ProductName' },
  { field: 'availableStock', col: 'Available Stock' },
  { field: 'inProcess', col: 'In-process' },
  { field: 'sold', col: 'Sold' },
  { field: 'action', col: 'Action' },

];
export const inventoryLabelItems = [
  { label: '0', id: '1', badge: '10', title: 'All' },
  { label: '1', id: '2', badge: '20', title: 'Stock available' },
  { label: '1', id: '2', badge: '30', title: 'Low on stock' },
  { label: '1', id: '2', badge: '40', title: 'Out of stock' },


];

