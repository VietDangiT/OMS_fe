import { gql } from 'apollo-angular';
export const HIGH_THRESHOLD = 100;
export const LOW_THRESHOLD = 30;
export const GET_LOYALTY_BY = gql`
  query GetLoyalty($fromDate: String!, $toDate: String!, $highThreshold: Int!, $lowThreshold: Int!, $countryId: Int) {
    customerLoyalty(fDate: $fromDate, tDate: $toDate, highThreshold: $highThreshold, lowThreshold: $lowThreshold, countryId: $countryId ) {
      value
      displayText
      
    }
  }
`;

export const GET_CUSTOMER_BY = gql`
  query GetCustomerByChannel($fromDate: String!, $toDate: String!, $countryId: Int) {
    customerByChannel(fDate: $fromDate, tDate: $toDate, countryId: $countryId) {
      displayText
      value
      percentage

    }
  }
`;
export const GET_RATING_BY = gql`
  query GetRatingByChannel($fromDate: String!, $toDate: String!, $channelId: Int) {
    ratingByChannel(fDate: $fromDate, tDate: $toDate, channelId: $channelId) {
      displayText
      value
      percentage
    }
  }
`;

export const GET_FEEDBACK_BY = gql`
query GetFeedbackByCustomer($fromDate: String!, $toDate: String!, $countryId: Int) {
  feedback(fDate: $fromDate, tDate: $toDate, countryId: $countryId ) {
    displayText
    value
    date
  }
}
`;
export const GET_CUSTOMER_LOCATION = gql`
  query GetCustomerByCountry($fromDate: String!, $toDate: String!, $country: String)  {
    customerByCountry (fDate: $fromDate, tDate: $toDate, country: $country ) {
      value
      displayText
    }
  }
`;
export const GET_PRODUCT_CUSTOMER = gql `
query GetTopProductByCustomer($fromDate: String!, $toDate: String!, $countryId: Int)  {
  topSaleProductEachChannel(fDate: $fromDate, tDate: $toDate, countryId: $countryId ) {
    id
    displayText
    value
    extraValue
  }
}
`;
export const GET_CHANNEL_BY_RATING = gql `
query GetChannelsTableData  {
  channelsTableData{
  data {
    id
    channelName
  }
  }
}
`;
