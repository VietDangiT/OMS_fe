import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_REVENUE,
  GET_SALE_STATISTIC,
  GET_TOTAL_SALES_TABLE,
} from '../constants/total-sales.constants';
import {
  TotalSalesApiResponse as RevenueApiResponse,
  SaleStatisticApiResponse,
  TotalSalesTableApiResponse,
} from '../models/total-sales.models';

@Injectable({
  providedIn: 'root',
})
export class TotalSalesService {
  constructor(private apollo: Apollo) {}

  getTotalSalesTable(
    fromDate: Date,
    toDate: Date,
    page: number = 1,
    itemsPerPage: number = 20
  ): Observable<TotalSalesTableApiResponse> {
    return this.apollo
      .watchQuery<TotalSalesTableApiResponse>({
        query: GET_TOTAL_SALES_TABLE,
        variables: {
          fromDate,
          toDate,
          itemsPerPage,
          page,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getRevenue(fromDate: Date, toDate: Date): Observable<RevenueApiResponse> {
    return this.apollo
      .watchQuery<RevenueApiResponse>({
        query: GET_REVENUE,
        variables: {
          fromDate,
          toDate,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getSaleStatistic(
    fromDate: Date,
    toDate: Date
  ): Observable<SaleStatisticApiResponse> {
    return this.apollo
      .watchQuery<SaleStatisticApiResponse>({
        query: GET_SALE_STATISTIC,
        variables: {
          fromDate,
          toDate,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
