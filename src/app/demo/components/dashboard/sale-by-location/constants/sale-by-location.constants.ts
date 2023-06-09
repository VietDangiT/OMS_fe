import { gql } from 'apollo-angular';
import { TableHeader } from 'src/app/demo/interface/global.model';

export const saleByLocationTableHeader: TableHeader[] = [
  { field: 'location', col: 'Location' },
  { field: 'date', col: 'Date' },
  { field: 'numberOfOrder', col: 'Number Of Orders' },
  { field: 'totalSales', col: 'Total Sales' },
];

export const GET_SALE_LEADS = gql`
  query GetSaleLeads($countryName: String, $fromDate: String, $toDate: String) {
    saleLeads(countryName: $countryName, fromDate: $fromDate, toDate: $toDate) {
      displayText
      value
    }
  }
`;

export const GET_SALE_ANALYTIC = gql`
  query GetSaleAnalytic(
    $countryName: String
    $fromDate: String
    $toDate: String
  ) {
    saleAnalytic(
      countryName: $countryName
      fromDate: $fromDate
      toDate: $toDate
    ) {
      displayText
      date
      value
    }
  }
`;

export const GET_SALE_BY_COUNTRY = gql`
  query GetSaleByCountry(
    $countryName: String
    $fromDate: String
    $toDate: String
  ) {
    saleByCountry(
      countryName: $countryName
      fromDate: $fromDate
      toDate: $toDate
    ) {
      percentage
      extraValue
      displayText
      value
      date
    }
  }
`;

export const GET_ORDER_SALES_BY_COUNTRY = gql`
  query GetOrderSaleByCountry(
    $countryName: String
    $fromDate: String
    $toDate: String
    $limit: Int
    $page: Int
  ) {
    orderSaleByCountry(
      countryName: $countryName
      limit: $limit
      page: $page
      fromDate: $fromDate
      toDate: $toDate
    ) {
      page
      first
      rows
      pageCount
      totalRecord
      data {
        extraValue
        displayText
        value
      }
    }
  }
`;

export const GET_TOTAL_SALE_COMPARE = gql`
  query TotalSaleCompareApiResponse(
    $countryName: String
    $fromDate: String
    $toDate: String
  ) {
    totalSaleByCountryAtTimes(
      countryName: $countryName
      fromDate: $fromDate
      toDate: $toDate
    ) {
      previousData {
        displayText
        value
      }
      currentData {
        displayText
        value
      }
    }
  }
`;
