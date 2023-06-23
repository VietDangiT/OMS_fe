import { gql } from 'apollo-angular';
import { TableHeader } from 'src/app/demo/interface/global.model';

export const catalogueHeaderTable: TableHeader[] = [
  { field: 'img', col: 'Image' },
  { field: 'sku', col: 'SKU' },
  { field: 'productName', col: 'Product Name' },
  { field: 'channel', col: 'Channel' },
  { field: 'createdAt', col: 'Created At' },
  { field: 'availableStock', col: 'Available Stock' },
  { field: 'sellingPrice', col: 'Selling Price' },
  { field: 'status', col: 'Status' },
  { field: 'actions', col: 'Actions' },
];

export const GET_PRODUCT_CATALOGUES = gql`
  query GetProductCatalogue(
    $channelId: Int
    $fromDate: String
    $toDate: String
    $keyword: String
    $limit: Int
    $status: String
    $page: Int
  ) {
    products(
      channelId: $channelId
      fromDate: $fromDate
      toDate: $toDate
      keyword: $keyword
      limit: $limit
      status: $status
      page: $page
    ) {
      page
      first
      rows
      pageCount
      totalRecord
      data {
        id
        productName
        sku
        productVariantImage
        basePrice
        createdAt
        status
        channelName
        channelImage
        availableStock
      }
    }
  }
`;

export const GET_PRODUCT_STATUS = gql`
  query GetProductStatus($channelId: Int) {
    productStatus(channelId: $channelId) {
      displayText
      value
    }
  }
`;
