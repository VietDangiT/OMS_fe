import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_ORDER_SALES_BY_COUNTRY,
  GET_SALE_ANALYTIC,
  GET_SALE_BY_COUNTRY,
  GET_SALE_LEADS,
} from '../constants/sale-by-location.constants';
import {
  SaleAnalyticApiResponse,
  SaleByCountryApiResponse,
  SaleByLocationParams,
  SaleByLocationTableApiResponse,
  SaleLeadsApiResponse,
} from '../models/sale-by-location.models';

@Injectable({
  providedIn: 'root',
})
export class SaleByLocationService {
  constructor(private apollo: Apollo) {}

  getSaleLeads(
    name: string,
    dateRange: Date[]
  ): Observable<SaleLeadsApiResponse> {
    return this.apollo
      .watchQuery<SaleLeadsApiResponse>({
        query: GET_SALE_LEADS,
        variables: {
          countryName: name,
          fromDate: dateRange[0],
          toDate: dateRange[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getSaleAnalytic(
    name: string,
    dateRange: Date[]
  ): Observable<SaleAnalyticApiResponse> {
    return this.apollo
      .watchQuery<SaleAnalyticApiResponse>({
        query: GET_SALE_ANALYTIC,
        variables: {
          countryName: name,
          fromDate: dateRange[0],
          toDate: dateRange[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getSaleByCountry(
    name: string,
    dateRange: Date[]
  ): Observable<SaleByCountryApiResponse> {
    return this.apollo
      .watchQuery<SaleByCountryApiResponse>({
        query: GET_SALE_BY_COUNTRY,
        variables: {
          countryName: name,
          fromDate: dateRange[0],
          toDate: dateRange[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getOrderSalesByCountry(
    params: SaleByLocationParams
  ): Observable<SaleByLocationTableApiResponse> {
    const { countryName, fromDate, limit, page, toDate } = params;

    return this.apollo
      .watchQuery<SaleByLocationTableApiResponse>({
        query: GET_ORDER_SALES_BY_COUNTRY,
        variables: {
          countryName,
          fromDate,
          toDate,
          limit,
          page,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
