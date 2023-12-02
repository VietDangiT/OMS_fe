import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, filter, map } from 'rxjs';
import { GET_CHANNEL_BY_RATING, GET_CUSTOMER_BY, GET_CUSTOMER_LOCATION, GET_FEEDBACK_BY, GET_LIST_CUSTOMER, GET_LOYALTY_BY, GET_PRODUCT_CUSTOMER, GET_RATING_BY, HIGH_THRESHOLD, LOW_THRESHOLD } from '../constants/customer.constants';
import { ChannelByRatingCustomerResponse, CustomerByChannelResponse, FeedbackByCustomerResponse, ListCustomerParams, ListCustomerResponse, LocationByCustomerResponse, LoyaltyByApiResponse, RatingByChannelResponse, TopProductByCustomerResponse,  } from '../interfaces/customer.models';
import { number } from 'echarts';
import { PagingParams } from 'src/app/demo/interface/global.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apollo:Apollo) { }
  getLoyalty(filter: string[], countryId: Number | null): Observable<LoyaltyByApiResponse> {
    return this.apollo
      .watchQuery<LoyaltyByApiResponse>({
        query: GET_LOYALTY_BY,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
          highThreshold: HIGH_THRESHOLD,
          lowThreshold: LOW_THRESHOLD,
          countryId: countryId
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getCustomerByChannel(filter: string[], countryId: number | null): Observable<CustomerByChannelResponse> {
    return this.apollo
      .watchQuery<CustomerByChannelResponse>({
        query: GET_CUSTOMER_BY,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
          countryId: countryId
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }


  getRatingByChannel(filter: string[] , channelId: number | null): Observable<RatingByChannelResponse> {
    return this.apollo
      .watchQuery<RatingByChannelResponse>({
        query: GET_RATING_BY,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
          channelId: channelId
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getFeedbackByCustomer(filter:string[], countryId: number | null):Observable<FeedbackByCustomerResponse>{
    return this.apollo.watchQuery<FeedbackByCustomerResponse>({
          query:GET_FEEDBACK_BY,
          variables: {
            fromDate : filter[0],
            toDate : filter [1],
            countryId: countryId
          },
    })
    .valueChanges.pipe(map(res =>res.data));
  };
  getCustomerByCountry(filter:string[], countryName: string):Observable<LocationByCustomerResponse>{
    return this.apollo.watchQuery<LocationByCustomerResponse>({
          query:GET_CUSTOMER_LOCATION,
          variables: {
            fromDate : filter[0],
            toDate : filter [1],
            country: countryName
          },
    })
    .valueChanges.pipe(map(res =>res.data));
  };

  getTopProduct(filter:string[], countryId: number | null):Observable<TopProductByCustomerResponse>{
    return this.apollo.watchQuery<TopProductByCustomerResponse>({
      query: GET_PRODUCT_CUSTOMER,
      variables : {
        fromDate: filter[0],
        toDate : filter [1],
        countryId : countryId
      },
    })
    .valueChanges.pipe(map(res =>res.data));
  };
  getRatingCustomerByChannel():Observable<ChannelByRatingCustomerResponse>{
    return this.apollo.watchQuery<ChannelByRatingCustomerResponse>({
      query: GET_CHANNEL_BY_RATING,
      variables : {
      },
    })
    .valueChanges.pipe(map(res =>res.data));
  };

  getCustomerList(params : ListCustomerParams):Observable<ListCustomerResponse> {
    const { 
      channelId,
      fDate,
      tDate,
      limit,
      page,
      status,
      fromDate,
      toDate} = params;
    return this.apollo.watchQuery<ListCustomerResponse>({
      query: GET_LIST_CUSTOMER,
      variables : {
        limit,
        page,
        status,
        fromDate,
        toDate,
        channelId,
        fDate,
        tDate
      },
    })
    .valueChanges.pipe(map(res=>res.data));
  };

};
