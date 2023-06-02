import { gql } from 'apollo-angular';
import { MenuItem } from 'primeng/api';
import { TableHeader } from 'src/app/demo/interface/global.model';

export const catalogueLabelItems: MenuItem[] = [
  { label: '', id: '0', badge: '0', title: 'All' },
  { label: 'active', id: '1', badge: '0', title: 'Active' },
  { label: 'inactive', id: '2', badge: '0', title: 'Inactive' },
];

export const catalogueHeaderTable: TableHeader[] = [
  { field: 'img', col: 'Image' },
  { field: 'sku', col: 'SKU' },
  { field: 'productName', col: 'Product Name' },
  { field: 'createdAt', col: 'Created At' },
  { field: 'availableStock', col: 'Available Stock' },
  { field: 'sellingPrice', col: 'Selling Price' },
  { field: 'status', col: 'Status' },
  { field: 'actions', col: 'Actions' },
];

export const GET_PRODUCT_CATALOGUES = gql`
  query GetProductCatalogue(
    $channelId: Int!
    $fromDate: DateTime!
    $toDate: DateTime!
    $keyword: String!
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
        productChannelStatus
        availableStock
      }
    }
  }
`;
