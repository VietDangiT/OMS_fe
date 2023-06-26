import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  GET_CHANNELS_TABLE,
  GET_CHANNEL_STATUS,
  GET_COUNTRIES,
  GET_STORES,
} from '../constants/channel.constants';
import {
  ChannelParams,
  ChannelStatusApiResponse,
  ChannelTableApiResponse,
  CountryApiResponse,
  StoresApiResponse,
} from '../interface/channel.model';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor(private apollo: Apollo) {}

  getCountries(): Observable<CountryApiResponse> {
    return this.apollo
      .watchQuery<CountryApiResponse>({
        query: GET_COUNTRIES,
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getChannelsTableData(
    params: ChannelParams
  ): Observable<ChannelTableApiResponse> {
    return this.apollo
      .watchQuery<ChannelTableApiResponse>({
        query: GET_CHANNELS_TABLE,
        variables: {
          ...params,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getChannelStatus(channelId: number): Observable<ChannelStatusApiResponse> {
    return this.apollo
      .watchQuery<ChannelStatusApiResponse>({
        query: GET_CHANNEL_STATUS,
        variables: {
          channelId,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }

  getStores(
    channelId: number,
    page: number,
    limit: number
  ): Observable<StoresApiResponse> {
    return this.apollo
      .watchQuery<StoresApiResponse>({
        query: GET_STORES,
        variables: {
          channelId,
          page,
          limit,
        },
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
