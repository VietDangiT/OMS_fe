import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_RETURN,
  GET_TOTAL_SALES,
  GET_TOTAL_SALES_TABLE,
} from '../constants/total-sales.constants';
import {
  ReturnApiResponse,
  TotalSalesApiResponse,
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

  getTotalSales(
    fromDate: Date,
    toDate: Date
  ): Observable<TotalSalesApiResponse> {
    return this.apollo
      .watchQuery<TotalSalesApiResponse>({
        query: GET_TOTAL_SALES,
        variables: {
          fromDate,
          toDate,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getReturn(fromDate: Date, toDate: Date): Observable<ReturnApiResponse> {
    return this.apollo
      .watchQuery<ReturnApiResponse>({
        query: GET_RETURN,
        variables: {
          fromDate,
          toDate,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
