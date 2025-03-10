import { PagingParams } from "src/app/demo/interface/global.model";

export interface BaseChart {
  id: number;
  text: string;
  value: number;
  date: string | number | Date;
  percentage: number;
  displayText: string;
}

export interface LoyaltyByApiResponse {
  customerLoyalty: BaseChart[];
}
export interface CustomerByChannelResponse {
  customerByChannel:BaseChart[];
}
export interface RatingByChannelResponse {
  ratingByChannel:BaseChart[];
}
export interface FeedbackByCustomerResponse {
  feedback: BaseChart[];
}

export interface CustomerTopProduct{
  displayText: string;
  value: number;
  extraValue: number;
}

export interface LocationByCustomerResponse {
  customerByCountry: BaseChart[];
}
export interface TopProductByCustomerResponse{
  topSaleProductEachChannel:CustomerTopProduct[];
}

export interface ChannelByRatingCustomer{
  channelName: String;
}
export interface ChannelByRatingCustomerResponse{
  channelsTableData : ChannelByRatingCustomer [];
}
export interface ListCustomer { 
  id: number;
  name : string; 
  totalOrder: number; 
  address: string;
  totalspend: number; 
  phoneNumber: number;
  lastorder: number;
}

export interface ListCustomerResponse {
  listCustomer: {
    data : ListCustomer[];
    first: number;
    page: number;
    pageCount: number;
    rows: number;
    totalRecord: number;

  }
}
export interface ListCustomerParams extends PagingParams {
  channelId: number | null;
  fDate : String | null  ; 
  tDate : String | null;
}
