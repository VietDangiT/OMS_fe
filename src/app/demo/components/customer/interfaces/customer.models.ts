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


export interface LocationByCustomerResponse {
  customerByCountry: BaseChart[];
}
export interface TopProductByCustomerResponse{
  topSaleProductEachChannel:BaseChart[];
}
