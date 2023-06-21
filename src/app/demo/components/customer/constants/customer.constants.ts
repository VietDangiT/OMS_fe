import { gql } from 'apollo-angular';
export const HIGH_THRESHOLD = 100;
export const LOW_THRESHOLD = 30;
export const GET_LOYALTY_BY = gql`
  query GetLoyalty($fromDate: String!, $toDate: String!, $highThreshold: Int!, $lowThreshold: Int!, $country: String!) {
    customerLoyalty(fDate: $fromDate, tDate: $toDate, highThreshold: $highThreshold, lowThreshold: $lowThreshold, country: $country ) {
      value
      displayText

    }
  }
`;

export const GET_CUSTOMER_BY = gql`
  query GetCustomerByChannel($fromDate: String!, $toDate: String!) {
    customerByChannel(fDate: $fromDate, tDate: $toDate ) {
      displayText
      value
    }
  }
`;
export const GET_RATING_BY = gql`
  query GetRatingByChannel($fromDate: String!, $toDate: String!) {
    ratingByChannel(fDate: $fromDate, tDate: $toDate ) {
      displayText
      value
    }
  }
`;

export const GET_FEEDBACK_BY = gql`
query GetFeedbackByCustomer($fromDate: String!, $toDate: String!) {
  feedback(fDate: $fromDate, tDate: $toDate ) {
    displayText
    value
  }
}
`;
export const GET_CUSTOMER_LOCATION = gql`
  query GetCustomerByCountry($fromDate: String!, $toDate: String!)  {
    customerByCountry (fDate: $fromDate, tDate: $toDate ) {
      value
      displayText
    }
  }
`;
export const GET_PRODUCT_CUSTOMER = gql `
query GetTopProductByCustomer($fromDate: String!, $toDate: String!)  {
  topSaleProductEachChannel(fDate: $fromDate, tDate: $toDate ) {
    displayText
    value
    percentage
  }
}
`;
