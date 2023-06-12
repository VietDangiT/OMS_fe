import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { PagingParams } from 'src/app/demo/interface/global.model';
import {
  GET_ORDER_SUMMARY,
  GET_TOTAL_ORDER_TABLE,
} from '../constants/total-orders.constants';
import {
  TotalOrderByStatusApiResponse,
  TotalOrderSummaryApiResponse,
} from '../models/total-orders.models';

@Injectable({
  providedIn: 'root',
})
export class TotalOrdersService {
  constructor(private readonly apollo: Apollo) {}

  getOrderSummary(dates: Date[]): Observable<TotalOrderSummaryApiResponse> {
    return this.apollo
      .watchQuery<TotalOrderSummaryApiResponse>({
        query: GET_ORDER_SUMMARY,
        variables: {
          fDate: dates[0],
          tDate: dates[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getOrderTable(
    params: Partial<PagingParams>
  ): Observable<TotalOrderByStatusApiResponse> {
    const { fromDate: fDate, toDate: tDate, limit, page } = params;

    return this.apollo
      .watchQuery<TotalOrderByStatusApiResponse>({
        query: GET_TOTAL_ORDER_TABLE,
        variables: {
          fDate,
          tDate,
          limit,
          page,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
