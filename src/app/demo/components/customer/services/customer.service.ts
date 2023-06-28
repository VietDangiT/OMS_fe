import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_CUSTOMER_BY, GET_CUSTOMER_LOCATION, GET_FEEDBACK_BY, GET_LOYALTY_BY, GET_PRODUCT_CUSTOMER, GET_RATING_BY, HIGH_THRESHOLD, LOW_THRESHOLD } from '../constants/customer.constants';
import { CustomerByChannelResponse, FeedbackByCustomerResponse, LocationByCustomerResponse, LoyaltyByApiResponse, RatingByChannelResponse, TopProductByCustomerResponse } from '../interfaces/customer.models';
import { number } from 'echarts';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apollo:Apollo) { }
  getLoyalty(filter: string[]): Observable<LoyaltyByApiResponse> {
    return this.apollo
      .watchQuery<LoyaltyByApiResponse>({
        query: GET_LOYALTY_BY,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
          highThreshold: HIGH_THRESHOLD,
          lowThreshold: LOW_THRESHOLD,
          country: ''
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getCustomerByChannel(filter: string[]): Observable<CustomerByChannelResponse> {
    return this.apollo
      .watchQuery<CustomerByChannelResponse>({
        query: GET_CUSTOMER_BY,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }


  getRatingByChannel(filter: string[] ): Observable<RatingByChannelResponse> {
    return this.apollo
      .watchQuery<RatingByChannelResponse>({
        query: GET_RATING_BY,
        variables: {
          fromDate: filter[0],
          toDate: filter[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getFeedbackByCustomer(filter:string[]):Observable<FeedbackByCustomerResponse>{
    return this.apollo.watchQuery<FeedbackByCustomerResponse>({
          query:GET_FEEDBACK_BY,
          variables: {
            fromDate : filter[0],
            toDate : filter [1],
          },
    })
    .valueChanges.pipe(map(res =>res.data));
  };
  getCustomerByCountry(filter:string[]):Observable<LocationByCustomerResponse>{
    return this.apollo.watchQuery<LocationByCustomerResponse>({
          query:GET_CUSTOMER_LOCATION,
          variables: {
            fromDate : filter[0],
            toDate : filter [1],
          },
    })
    .valueChanges.pipe(map(res =>res.data));
  };

  getCustomerByTopProduct(filter:string[]):Observable<TopProductByCustomerResponse>{
    return this.apollo.watchQuery<TopProductByCustomerResponse>({
      query: GET_PRODUCT_CUSTOMER,
      variables : {
        fromDate: filter[0],
        toDate : filter [1],
      },
    })
    .valueChanges.pipe(map(res =>res.data));
  }
}
