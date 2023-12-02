import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { PagingParams } from 'src/app/demo/interface/global.model';
import {
  GET_CHANNEL_ORDER_TABLE,
  GET_CHANNEL_SALE_BY_DATE,
} from '../constants/total-sale-by-channel.constants';
import {
  ChannelOrderTableApiResponse,
  ChannelSaleApiResponse,
} from '../models/total-sale-by-channel.models';

@Injectable({
  providedIn: 'root',
})
export class TotalSaleByChannelService {
  constructor(private apollo: Apollo) {}

  getChannelOrderTable(
    params: Partial<PagingParams>
  ): Observable<ChannelOrderTableApiResponse> {
    const { fromDate: fDate, toDate: tDate, page, limit } = params;

    return this.apollo
      .watchQuery<ChannelOrderTableApiResponse>({
        query: GET_CHANNEL_ORDER_TABLE,
        variables: {
          fDate,
          tDate,
          page,
          limit,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getChannelSalesByDate(dates: Date[]): Observable<ChannelSaleApiResponse> {
    return this.apollo
      .watchQuery<ChannelSaleApiResponse>({
        query: GET_CHANNEL_SALE_BY_DATE,
        variables: {
          fDate: dates[0],
          tDate: dates[1],
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
