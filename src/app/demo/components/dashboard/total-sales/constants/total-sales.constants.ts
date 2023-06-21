import { gql } from 'apollo-angular';
import { TableHeader } from 'src/app/demo/interface/global.model';

export const totalSalesTableHeader: TableHeader[] = [
  { field: 'date', col: 'Date' },
  { field: 'numberOfOrders', col: 'Number of Orders' },
  { field: 'avgOrderSales', col: 'AVG Order Sales' },
  { field: 'numberOfReturn', col: 'Number of Return' },
  { field: 'totalSales', col: 'Total Sales' },
];

export const GET_TOTAL_SALES_TABLE = gql`
  query GetDetailTotalSales(
    $fromDate: String!
    $toDate: String!
    $itemsPerPage: Int!
    $page: Int!
  ) {
    detailTotalSales(
      fromDate: $fromDate
      toDate: $toDate
      paginationParam: { itemsPerPage: $itemsPerPage, page: $page }
    ) {
      paging {
        currentPage
        first
        totalCount
        totalPages
        hasPrevious
        hasNext
      }
      data {
        avgOrderSales
        numberOfReturn
        date
        totalSales
        numberOfOrders
      }
    }
  }
`;
export const GET_TOTAL_SALES = gql`
  query GetTotalSales($fromDate: String!, $toDate: String!) {
    totalSales(fromDate: $fromDate, toDate: $toDate) {
      compareData {
        date
        numberOfOrders
        text
        value
        percentage
      }
      selectedData {
        date
        numberOfOrders
        text
        value
        percentage
      }
    }
  }
`;

export const GET_RETURN = gql`
  query GetReturn($fromDate: String!, $toDate: String!) {
    return(fromDate: $fromDate, toDate: $toDate) {
      compareData {
        date
        numberOfOrders
        text
        value
        percentage
      }
      selectedData {
        date
        numberOfOrders
        text
        value
        percentage
      }
    }
  }
`;
